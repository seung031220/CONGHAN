# 에어팟 짝 찾아주기 - 실시간 가위바위보

2명의 플레이어가 실시간으로 가위바위보를 할 수 있는 웹 게임입니다.

## 기능

- 실시간 플레이어 매칭
- WebSocket을 통한 실시간 통신
- 가위바위보 게임 로직
- 결과 표시 및 재게임

## 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 서버 실행

```bash
npm start
```

개발 모드 (자동 재시작):

```bash
npm run dev
```

### 3. 브라우저에서 접속

서버가 실행되면 `index.html` 파일을 브라우저에서 열거나, 정적 파일 서버를 사용하세요.

예시 (Python):

```bash
python -m http.server 8000
```

그 다음 `http://localhost:8000`에서 접속하세요.

## 사용 방법

1. 이름을 입력하고 "게임 참여하기" 버튼을 클릭합니다.
2. 상대방이 매칭될 때까지 기다립니다.
3. 가위, 바위, 보 중 하나를 선택합니다.
4. 결과를 확인하고 "다시 하기"로 재게임할 수 있습니다.

## 파일 구조

- `index.html` - 메인 게임 페이지
- `style.css` - 스타일시트
- `game.js` - 클라이언트 측 게임 로직
- `server.js` - WebSocket 서버
- `package.json` - 프로젝트 설정

## 기술 스택

- HTML/CSS/JavaScript (프론트엔드)
- Node.js + WebSocket (백엔드)
- WebSocket API (실시간 통신)
