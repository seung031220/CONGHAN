# Supabase API 키 설명

## 키 종류

Supabase에는 두 가지 주요 API 키가 있습니다:

### 1. Publishable Key (Public Key / Anon Key) ✅
- **다른 이름**: 
  - "anon public"
  - "anon key"
  - "publishable key"
  - "public key"
- **용도**: 클라이언트 측 (브라우저)에서 사용
- **보안**: 공개해도 되는 키 (클라이언트 코드에 포함 가능)
- **사용 위치**: `destiny.html`, `matching.html` 등 프론트엔드 코드
- **형태**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (긴 문자열)

### 2. Service Role Key (Secret Key) ❌
- **다른 이름**: 
  - "service_role"
  - "secret key"
- **용도**: 서버 측에서만 사용
- **보안**: 절대 공개하면 안 되는 비밀 키
- **사용 위치**: 백엔드 서버 코드만
- **주의**: 이 키는 게임에서 사용하지 마세요!

## 게임에 사용할 키

✅ **Publishable Key (Public Key)** 사용하세요!

이 키는:
- 클라이언트 코드에 안전하게 포함 가능
- 브라우저에서 Supabase에 접근할 때 사용
- 실시간 통신에 필요

## 코드 예시

```javascript
// ✅ 올바른 사용 (Publishable Key)
const SUPABASE_URL = 'https://xxxxx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';  // Publishable Key

// ❌ 잘못된 사용 (Service Role Key - 절대 사용하지 마세요!)
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';  // Service Role Key (위험!)
```

## Settings > API 페이지에서

Supabase Settings > API 페이지에서:

- **"anon"** 또는 **"publishable"** 키 = ✅ 사용
- **"service_role"** 또는 **"secret"** 키 = ❌ 사용 금지

## 요약

**질문**: publishable key가 public key야?
**답변**: 네, 맞습니다! 
- Publishable Key = Public Key = Anon Key
- 모두 같은 의미입니다
- 게임 코드에 사용하세요!
