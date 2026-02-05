# Vercel + Supabase 배포 가이드

## 1. Supabase 설정

### 1.1 Supabase 프로젝트 생성
1. [Supabase](https://supabase.com) 접속
2. "New Project" 클릭
3. 프로젝트 이름, 데이터베이스 비밀번호 설정
4. 리전 선택 (가장 가까운 리전 권장)
5. 프로젝트 생성 완료 대기 (약 2분)

### 1.2 데이터베이스 설정
1. Supabase 대시보드에서 **SQL Editor** 클릭
2. `supabase-setup.sql` 파일의 내용을 복사하여 실행
3. **Database > Replication** 메뉴로 이동
4. `rooms` 테이블의 **Realtime** 토글 **ON**
5. `matchmaking` 테이블의 **Realtime** 토글 **ON**

### 1.3 API 키 확인
1. **Settings > API** 메뉴로 이동
2. 다음 정보 복사:
   - **Project URL** (예: `https://xxxxx.supabase.co`)
   - **anon public** 키 (예: `eyJhbGci...`)

## 2. 코드에 Supabase 설정 추가

### 2.1 `destiny.html` 수정
파일 상단의 다음 부분을 찾아서 수정:

```javascript
// Supabase 설정 (사용자가 설정해야 함)
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
```

위 부분을 다음과 같이 변경:

```javascript
// Supabase 설정
const SUPABASE_URL = 'https://your-project-id.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key-here';
```

### 2.2 `matching.html` 수정
동일하게 Supabase URL과 키를 설정합니다.

## 3. Vercel 배포

### 3.1 GitHub에 푸시
```bash
git add .
git commit -m "Add Supabase configuration"
git push origin main
```

### 3.2 Vercel 배포
1. [Vercel](https://vercel.com) 접속
2. "Add New Project" 클릭
3. GitHub 저장소 선택 (`seung031220/CONGHAN`)
4. 프로젝트 설정:
   - **Framework Preset**: Other
   - **Root Directory**: `./`
   - **Build Command**: (비워두기)
   - **Output Directory**: `./`
5. "Deploy" 클릭

### 3.3 환경 변수 설정 (선택사항)
Supabase 키를 환경 변수로 관리하려면:

1. Vercel 프로젝트 설정 > **Environment Variables**
2. 다음 변수 추가:
   - `NEXT_PUBLIC_SUPABASE_URL`: Supabase Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anon key

그리고 코드에서 다음과 같이 사용:
```javascript
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';
```

## 4. CORS 설정 (필요시)

Supabase에서 CORS 설정이 필요할 수 있습니다:

1. Supabase 대시보드 > **Settings > API**
2. **CORS** 섹션에서 Vercel 도메인 추가:
   - `https://your-project.vercel.app`
   - `https://*.vercel.app` (와일드카드)

## 5. 테스트

1. Vercel 배포 완료 후 도메인 확인
2. 브라우저에서 `destiny.html` 접속
3. 개발자 도구(F12) > Console 탭에서 오류 확인
4. 두 개의 브라우저 창에서 동시 접속하여 매칭 테스트

## 문제 해결

### Supabase 연결 오류
- Supabase URL과 키가 정확한지 확인
- 브라우저 콘솔에서 오류 메시지 확인
- Supabase 프로젝트가 활성화되어 있는지 확인

### Realtime이 작동하지 않음
- Database > Replication에서 Realtime이 켜져 있는지 확인
- 테이블 이름이 정확한지 확인 (`rooms`, `matchmaking`)

### CORS 오류
- Supabase Settings > API에서 CORS 설정 확인
- Vercel 도메인이 허용 목록에 있는지 확인
