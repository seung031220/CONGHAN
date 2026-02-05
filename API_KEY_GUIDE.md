# Supabase API 키 찾기 가이드

## 단계별 가이드

### 1. Settings 메뉴 접근
1. Supabase 대시보드 왼쪽 사이드바에서 **"Settings"** 클릭
   - 톱니바퀴 아이콘 (⚙️) 또는 맨 아래 "Settings" 텍스트
2. **"API"** 메뉴 클릭
   - Settings 하위 메뉴 중 하나

### 2. API 키 위치

Settings > API 페이지에서 다음 정보를 찾으세요:

#### Project URL
- **위치**: 페이지 상단 "Project URL" 섹션
- **형태**: `https://xxxxx.supabase.co`
- **예시**: `https://abcdefghijklmnop.supabase.co`
- **복사 방법**: URL 옆의 복사 버튼 클릭 또는 직접 선택해서 복사

#### API Keys 섹션
페이지 중간에 **"API Keys"** 또는 **"Project API keys"** 섹션이 있습니다.

여기서 다음 키들을 찾을 수 있습니다:

1. **anon public** (익명 공개 키)
   - **레이블**: "anon" 또는 "anon public"
   - **역할**: "anon" 또는 "public"
   - **형태**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6...` (매우 긴 문자열)
   - **용도**: 클라이언트 측에서 사용 (우리가 필요한 키)
   - **복사 방법**: 키 옆의 눈 아이콘 클릭 → 표시된 키 복사 버튼 클릭

2. **service_role** (서비스 역할 키)
   - **레이블**: "service_role"
   - **역할**: "service_role"
   - **주의**: 이 키는 사용하지 마세요! (서버 측 전용, 보안 위험)

### 3. 키가 보이지 않는 경우

#### 키가 숨겨져 있는 경우
- 키 옆에 **눈 아이콘** (👁️) 또는 **"Reveal"** 버튼이 있습니다
- 클릭하면 키가 표시됩니다
- 표시된 후 **복사 버튼** 클릭

#### 페이지를 찾을 수 없는 경우
1. 왼쪽 사이드바 맨 아래 **"Settings"** 클릭
2. **"API"** 메뉴 클릭
3. 또는 URL에 직접 접근: `https://app.supabase.com/project/[프로젝트ID]/settings/api`

## 필요한 정보

게임에 필요한 것은:

✅ **Project URL**: `https://xxxxx.supabase.co` 형태
✅ **anon public key**: `eyJhbGci...` 형태의 긴 문자열

❌ **service_role key**: 사용하지 마세요!

## 코드에 적용

`destiny.html`과 `matching.html`에서:

```javascript
const SUPABASE_URL = 'https://your-project-id.supabase.co';  // Project URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';  // anon public key
```

## 스크린샷 가이드

Settings > API 페이지 구조:

```
┌─────────────────────────────────────┐
│ Settings > API                      │
├─────────────────────────────────────┤
│                                     │
│ Project URL                         │
│ https://xxxxx.supabase.co  [복사]  │
│                                     │
│ ─────────────────────────────────  │
│                                     │
│ Project API keys                    │
│                                     │
│ anon public                         │
│ [👁️ Reveal] [복사]                 │
│ eyJhbGciOiJIUzI1NiIsInR5cCI6...    │
│                                     │
│ service_role (secret)               │
│ [👁️ Reveal] [복사]                 │
│ (이건 사용하지 마세요!)             │
│                                     │
└─────────────────────────────────────┘
```

## 문제 해결

### 키가 보이지 않아요
- 페이지를 새로고침 (F5)
- 다른 브라우저에서 시도
- Supabase 계정에 로그인되어 있는지 확인

### 키를 복사했는데 작동하지 않아요
- 키 전체를 복사했는지 확인 (매우 긴 문자열)
- 공백이나 줄바꿈이 포함되지 않았는지 확인
- 따옴표 없이 복사했는지 확인

### 어떤 키를 사용해야 하나요?
- ✅ **anon public** 키만 사용하세요
- ❌ service_role 키는 절대 사용하지 마세요 (보안 위험)
