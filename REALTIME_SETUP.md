# Supabase Realtime 활성화 가이드

## ⚠️ 중요: 올바른 화면 찾기

현재 보고 계신 "Replication" 화면은 **외부 데이터 웨어하우스 복제** 설정입니다.
게임에 필요한 **테이블 Realtime**은 다른 곳에 있습니다.

## 올바른 경로

### 방법 1: Database 메뉴에서 직접 접근 (권장)

1. 왼쪽 사이드바에서 **"Database"** 클릭
2. **"Tables"** 메뉴 클릭 (또는 Database 하위 메뉴에서 Tables 선택)
3. 테이블 목록이 보이면:
   - `matchmaking` 테이블 찾기
   - `rooms` 테이블 찾기
4. 각 테이블을 클릭하면 상세 페이지가 열립니다
5. 상세 페이지에서 **"Realtime"** 또는 **"Enable Realtime"** 버튼/토글 찾기

### 방법 2: Database > Replication (새 버전)

1. 왼쪽 사이드바에서 **"Database"** 클릭
2. **"Replication"** 메뉴 클릭
3. 화면 상단에 **"Tables"** 또는 **"Realtime"** 탭이 있는지 확인
4. 테이블 목록이 보이면:
   - `matchmaking` 테이블 옆의 **Realtime 토글** 찾기
   - `rooms` 테이블 옆의 **Realtime 토글** 찾기
5. 두 테이블 모두 **ON**으로 변경

### 방법 3: SQL로 직접 활성화

SQL Editor에서 다음 쿼리를 실행:

```sql
-- Realtime 활성화
ALTER PUBLICATION supabase_realtime ADD TABLE matchmaking;
ALTER PUBLICATION supabase_realtime ADD TABLE rooms;
```

## 확인 방법

Realtime이 활성화되었는지 확인:

1. **Database > Replication** 메뉴로 이동
2. 테이블 목록에서 `matchmaking`과 `rooms` 확인
3. Realtime 상태가 **"Enabled"** 또는 **"ON"**으로 표시되어야 함

또는 SQL Editor에서:

```sql
SELECT * FROM pg_publication_tables WHERE pubname = 'supabase_realtime';
```

결과에 `matchmaking`과 `rooms`가 보이면 성공입니다.

## 문제 해결

### Realtime 옵션이 보이지 않는 경우

1. **Supabase 프로젝트가 최신 버전인지 확인**
   - 오래된 프로젝트는 Realtime이 기본 활성화되어 있을 수 있습니다

2. **SQL로 직접 활성화 시도** (위의 방법 3)

3. **Supabase 지원팀에 문의**
   - 프로젝트 설정에서 Realtime 기능이 비활성화되어 있을 수 있습니다

### Realtime이 작동하지 않는 경우

1. 테이블에 RLS (Row Level Security) 정책이 올바르게 설정되어 있는지 확인
2. 브라우저 콘솔에서 WebSocket 연결 오류 확인
3. Supabase 프로젝트 상태 확인 (일시 중지되지 않았는지)

## 체크리스트

- [ ] `matchmaking` 테이블 Realtime 활성화
- [ ] `rooms` 테이블 Realtime 활성화
- [ ] SQL 쿼리로 확인 완료
- [ ] 게임에서 실시간 통신 테스트 완료
