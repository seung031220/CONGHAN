# Supabase 설정 가이드

## 1단계: Supabase 프로젝트 생성

1. https://supabase.com 접속
2. 로그인 또는 회원가입
3. "New Project" 버튼 클릭
4. 프로젝트 정보 입력:
   - **Name**: 프로젝트 이름 (예: konghan)
   - **Database Password**: 데이터베이스 비밀번호 (잘 기억해두세요!)
   - **Region**: 가장 가까운 리전 선택 (예: Northeast Asia (Seoul))
5. "Create new project" 클릭
6. 프로젝트 생성 완료 대기 (약 2-3분)

## 2단계: SQL Editor에서 스크립트 실행

### 방법 1: SQL Editor 사용 (권장)

1. Supabase 대시보드 왼쪽 메뉴에서 **"SQL Editor"** 클릭
2. **"New query"** 버튼 클릭 (또는 빈 에디터 영역 클릭)
3. `supabase-setup.sql` 파일의 **전체 내용을 복사**
4. SQL Editor에 **붙여넣기**
5. 우측 상단의 **"Run"** 버튼 클릭 (또는 `Ctrl+Enter`)
6. 성공 메시지 확인:
   - "Success. No rows returned" 또는
   - "Success" 메시지가 표시되면 완료

### 방법 2: 파일 업로드 (선택사항)

1. SQL Editor에서 **"Upload SQL file"** 버튼 클릭
2. `supabase-setup.sql` 파일 선택
3. 자동으로 실행됨

## 3단계: 테이블 확인

1. 왼쪽 메뉴에서 **"Table Editor"** 클릭
2. 다음 테이블들이 생성되었는지 확인:
   - `matchmaking` 테이블
   - `rooms` 테이블

## 4단계: Realtime 활성화

1. 왼쪽 메뉴에서 **"Database"** 클릭
2. **"Replication"** 탭 클릭
3. 다음 테이블들의 **Realtime 토글을 ON**으로 변경:
   - ✅ `matchmaking` 테이블
   - ✅ `rooms` 테이블

## 5단계: API 키 확인

1. 왼쪽 메뉴에서 **"Settings"** (톱니바퀴 아이콘) 클릭
2. **"API"** 메뉴 클릭
3. 다음 정보를 복사해두세요:
   - **Project URL**: `https://xxxxx.supabase.co` 형태
   - **anon public** 키: `eyJhbGci...` 형태의 긴 문자열

## 6단계: 코드에 적용

`destiny.html`과 `matching.html` 파일에서:

```javascript
const SUPABASE_URL = '여기에_Project_URL_붙여넣기';
const SUPABASE_ANON_KEY = '여기에_anon_public_키_붙여넣기';
```

## 문제 해결

### SQL 실행 오류가 발생하는 경우

**오류: "relation already exists"**
- 이미 테이블이 생성되어 있다는 의미입니다
- 정상적으로 작동하는지 확인하세요

**오류: "permission denied"**
- RLS (Row Level Security) 정책이 제대로 생성되지 않았을 수 있습니다
- SQL 스크립트를 다시 실행해보세요

**오류: "syntax error"**
- SQL 스크립트를 전체 복사했는지 확인
- 따옴표나 세미콜론이 빠지지 않았는지 확인

### 테이블이 보이지 않는 경우

1. Table Editor에서 새로고침 (F5)
2. 왼쪽 상단의 데이터베이스 선택이 올바른지 확인
3. SQL Editor에서 다음 쿼리 실행:
   ```sql
   SELECT * FROM matchmaking;
   SELECT * FROM rooms;
   ```

## 완료 확인 체크리스트

- [ ] Supabase 프로젝트 생성 완료
- [ ] SQL 스크립트 실행 완료
- [ ] `matchmaking` 테이블 확인
- [ ] `rooms` 테이블 확인
- [ ] Realtime 활성화 완료 (두 테이블 모두)
- [ ] API 키 복사 완료
- [ ] 코드에 Supabase URL/키 설정 완료
