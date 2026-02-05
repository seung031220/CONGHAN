# 콩한쪽 — 잃어버린 에어팟을 건 운명의 게임

실시간 가위바위보로 에어팟 짝을 찾는 게임입니다.

## 프로젝트 구조

```
├── index.html          메인 페이지
├── match.html          AI 매칭 페이지 (실시간 매칭으로 연결)
├── matching.html       매칭 중 화면
├── destiny.html        실시간 가위바위보 게임
├── supabase-setup.sql Supabase 데이터베이스 설정
└── README.md
```

## 실행 방법

`index.html`을 브라우저에서 열면 됩니다.

## 실시간 대전 설정 (Supabase)

1. **Supabase**에서 무료 프로젝트 생성 (https://supabase.com)
2. **SQL Editor**에서 `supabase-setup.sql` 내용 복사 후 실행
3. **Database > Replication**에서 `rooms`, `matchmaking` 테이블 Realtime **ON**
4. **Settings > API**에서 Project URL, anon public key 복사
5. `matching.html`과 `destiny.html` 상단의 `SUPABASE_URL`, `SUPABASE_ANON_KEY`에 붙여넣기
6. 메인에서 **AI 매칭하기** 클릭 → 매칭 완료 후 게임 입장

## 게임 플레이 방법

1. 메인 페이지에서 "AI 매칭하기" 클릭
2. 에어팟 정보 입력 (모델, 방향, 컨디션, 사용기간)
3. "AI 매칭 돌리기" 클릭
4. 매칭 완료 후 "게임 입장하기" 클릭
5. 상대방이 매칭될 때까지 대기
6. 가위, 바위, 보 중 하나를 선택
7. 결과 확인

## 기술 스택

- HTML/CSS/JavaScript (프론트엔드)
- Supabase (실시간 데이터베이스 및 실시간 통신)
- WebSocket (Supabase Realtime)

## 디자인

원본 디자인: [nerosonge/konghanjok](https://github.com/nerosonge/konghanjok)
게임 로직: [PotatoKimJ/airpod2](https://github.com/PotatoKimJ/airpod2)
