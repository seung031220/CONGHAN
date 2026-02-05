# Supabase 키 설정 가이드

## ⚠️ 중요: 실제 값 입력 필요

`destiny.html`과 `matching.html` 파일에서 다음 부분을 찾아 실제 Supabase 값으로 변경해야 합니다:

## 수정할 위치

### 1. `destiny.html` 파일 (208-209줄)

```javascript
const SUPABASE_URL = 'YOUR_SUPABASE_URL';  // 여기를 변경
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';  // 여기를 변경
```

### 2. `matching.html` 파일 (314-315줄)

```javascript
const SUPABASE_URL = 'YOUR_SUPABASE_URL';  // 여기를 변경
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';  // 여기를 변경
```

## 실제 값으로 변경하는 방법

### 1단계: Supabase에서 값 복사
1. Supabase 대시보드 > Settings > API
2. **Project URL** 복사 (예: `https://abcdefghijklmnop.supabase.co`)
3. **Publishable Key** 복사 (예: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

### 2단계: 코드에 붙여넣기

`destiny.html`에서:
```javascript
const SUPABASE_URL = 'https://abcdefghijklmnop.supabase.co';  // 실제 Project URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';  // 실제 Publishable Key
```

`matching.html`에서도 동일하게 변경:
```javascript
const SUPABASE_URL = 'https://abcdefghijklmnop.supabase.co';  // 실제 Project URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';  // 실제 Publishable Key
```

### 3단계: 저장 및 푸시
1. 파일 저장
2. GitHub에 커밋 및 푸시
3. Vercel 자동 배포 확인

## 예시

올바른 형식:
```javascript
const SUPABASE_URL = 'https://abcdefghijklmnop.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODk2NzI5NywiZXhwIjoxOTU0NTQzMjk3fQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
```

잘못된 형식:
```javascript
const SUPABASE_URL = 'YOUR_SUPABASE_URL';  // ❌ 변경 안 함
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';  // ❌ 변경 안 함
```

## 확인 방법

변경 후 브라우저 콘솔(F12)에서:
- 오류가 없어야 함
- "실시간 매칭 시작..." 로그가 보여야 함
- Supabase 연결 오류가 없어야 함
