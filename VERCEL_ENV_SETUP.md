# Vercel에 환경 변수 추가하기

## 방법 1: Vercel 대시보드에서 추가 (권장)

### 1단계: Vercel 프로젝트 설정 열기
1. [Vercel 대시보드](https://vercel.com) 접속
2. 배포된 프로젝트 클릭
3. 상단 메뉴에서 **"Settings"** 클릭
4. 왼쪽 사이드바에서 **"Environment Variables"** 클릭

### 2단계: 환경 변수 추가
1. **"Add New"** 버튼 클릭
2. 다음 변수들을 하나씩 추가:

#### 첫 번째 변수
- **Name**: `NEXT_PUBLIC_SUPABASE_URL`
- **Value**: `https://xxxxx.supabase.co` (Supabase Project URL)
- **Environment**: 
  - ✅ Production
  - ✅ Preview
  - ✅ Development
- **"Save"** 클릭

#### 두 번째 변수
- **Name**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value**: `eyJhbGci...` (Supabase Publishable Key)
- **Environment**: 
  - ✅ Production
  - ✅ Preview
  - ✅ Development
- **"Save"** 클릭

### 3단계: 재배포
1. 환경 변수 추가 후 **"Redeploy"** 버튼 클릭
2. 또는 새로운 커밋을 푸시하면 자동 재배포됨

## 방법 2: Vercel CLI 사용

터미널에서:

```bash
# Vercel CLI 설치 (처음 한 번만)
npm i -g vercel

# 프로젝트 디렉토리에서
vercel login
vercel link

# 환경 변수 추가
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
```

## 방법 3: 코드에 직접 입력 (간단하지만 보안 주의)

환경 변수 대신 코드에 직접 입력할 수도 있습니다:

`destiny.html`과 `matching.html`에서:

```javascript
const SUPABASE_URL = 'https://your-project-id.supabase.co';
const SUPABASE_ANON_KEY = 'your-publishable-key-here';
```

⚠️ **주의**: 이 방법은 키가 코드에 노출되지만, publishable key는 공개해도 안전합니다.

## 코드 수정 (환경 변수 사용)

환경 변수를 사용하려면 코드를 다음과 같이 수정:

```javascript
// 환경 변수가 있으면 사용, 없으면 기본값 사용
const SUPABASE_URL = 
  typeof window !== 'undefined' && window.__SUPABASE_URL__ 
    ? window.__SUPABASE_URL__
    : 'YOUR_SUPABASE_URL';

const SUPABASE_ANON_KEY = 
  typeof window !== 'undefined' && window.__SUPABASE_ANON_KEY__
    ? window.__SUPABASE_ANON_KEY__
    : 'YOUR_SUPABASE_ANON_KEY';
```

또는 더 간단하게 (Vercel은 정적 HTML이므로 환경 변수 직접 사용 불가):

```javascript
// Vercel에서 빌드 시 환경 변수로 대체되도록 설정
// 또는 그냥 코드에 직접 입력 (publishable key는 공개해도 안전)
const SUPABASE_URL = 'https://your-project-id.supabase.co';
const SUPABASE_ANON_KEY = 'your-publishable-key-here';
```

## 추천 방법

**정적 HTML 파일**이므로:
1. **코드에 직접 입력** (가장 간단)
   - Publishable key는 공개해도 안전하므로 괜찮습니다
   - `destiny.html`과 `matching.html`에 직접 입력

2. **환경 변수 사용** (더 깔끔하지만 복잡)
   - Vercel에서 빌드 시점에 환경 변수를 코드에 주입하도록 설정 필요
   - 또는 빌드 스크립트 필요

## 실제 적용 예시

### 간단한 방법 (권장)
`destiny.html` 파일에서:

```javascript
// Supabase 설정
const SUPABASE_URL = 'https://abcdefghijklmnop.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODk2NzI5NywiZXhwIjoxOTU0NTQzMjk3fQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
```

## 체크리스트

- [ ] Supabase Project URL 복사
- [ ] Supabase Publishable Key 복사
- [ ] `destiny.html`에 URL과 키 입력
- [ ] `matching.html`에 URL과 키 입력
- [ ] GitHub에 푸시
- [ ] Vercel 자동 배포 확인
- [ ] 배포된 사이트에서 테스트
