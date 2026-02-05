// WebSocket 서버 (Node.js)
const WebSocket = require('ws');
const http = require('http');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

// 대기 중인 플레이어 큐
const waitingQueue = [];
// 매칭된 게임 세션
const gameSessions = new Map();

wss.on('connection', (ws) => {
    console.log('새 클라이언트 연결');

    let playerId = null;
    let currentSession = null;

    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            handleMessage(ws, data);
        } catch (error) {
            console.error('메시지 파싱 오류:', error);
            ws.send(JSON.stringify({
                type: 'error',
                message: '잘못된 메시지 형식입니다.'
            }));
        }
    });

    ws.on('close', () => {
        console.log('클라이언트 연결 종료');
        if (playerId) {
            removeFromQueue(playerId);
            if (currentSession) {
                endSession(currentSession, playerId);
            }
        }
    });

    function handleMessage(ws, data) {
        switch (data.type) {
            case 'join':
                handleJoin(ws, data.playerName);
                break;
            case 'cancel':
                handleCancel(ws);
                break;
            case 'choice':
                handleChoice(ws, data.choice);
                break;
            default:
                ws.send(JSON.stringify({
                    type: 'error',
                    message: '알 수 없는 메시지 타입입니다.'
                }));
        }
    }

    function handleJoin(ws, playerName) {
        playerId = generatePlayerId();
        
        // 대기 큐에 추가
        waitingQueue.push({
            id: playerId,
            ws: ws,
            name: playerName
        });

        console.log(`플레이어 ${playerName} (${playerId}) 대기 큐에 추가됨`);

        // 매칭 시도
        tryMatch();
    }

    function handleCancel(ws) {
        removeFromQueue(playerId);
        playerId = null;
    }

    function handleChoice(ws, choice) {
        if (!currentSession) {
            ws.send(JSON.stringify({
                type: 'error',
                message: '활성 게임 세션이 없습니다.'
            }));
            return;
        }

        const session = gameSessions.get(currentSession);
        if (!session) return;

        // 플레이어의 선택 저장
        if (session.player1.ws === ws) {
            session.player1.choice = choice;
        } else if (session.player2.ws === ws) {
            session.player2.choice = choice;
        }

        // 두 플레이어 모두 선택했는지 확인
        if (session.player1.choice && session.player2.choice) {
            sendResult(session);
        } else {
            // 상대방에게 선택 완료 알림
            const opponent = session.player1.ws === ws ? session.player2 : session.player1;
            opponent.ws.send(JSON.stringify({
                type: 'opponentChoice',
                choice: null // 아직 선택 중
            }));
        }
    }

    function tryMatch() {
        if (waitingQueue.length < 2) return;

        // 큐에서 두 명 매칭
        const player1 = waitingQueue.shift();
        const player2 = waitingQueue.shift();

        const sessionId = generateSessionId();
        currentSession = sessionId;

        const session = {
            id: sessionId,
            player1: {
                id: player1.id,
                ws: player1.ws,
                name: player1.name,
                choice: null
            },
            player2: {
                id: player2.id,
                ws: player2.ws,
                name: player2.name,
                choice: null
            }
        };

        gameSessions.set(sessionId, session);

        // 두 플레이어에게 매칭 성공 알림
        player1.ws.send(JSON.stringify({
            type: 'matched',
            opponentName: player2.name
        }));

        player2.ws.send(JSON.stringify({
            type: 'matched',
            opponentName: player1.name
        }));

        console.log(`플레이어 ${player1.name}와 ${player2.name} 매칭됨 (세션: ${sessionId})`);
    }

    function sendResult(session) {
        const result1 = calculateResult(session.player1.choice, session.player2.choice);
        const result2 = calculateResult(session.player2.choice, session.player1.choice);

        session.player1.ws.send(JSON.stringify({
            type: 'result',
            result: result1,
            myChoice: session.player1.choice,
            opponentChoice: session.player2.choice
        }));

        session.player2.ws.send(JSON.stringify({
            type: 'result',
            result: result2,
            myChoice: session.player2.choice,
            opponentChoice: session.player1.choice
        }));

        // 세션 종료 (5초 후 삭제)
        setTimeout(() => {
            gameSessions.delete(session.id);
        }, 5000);
    }

    function removeFromQueue(id) {
        const index = waitingQueue.findIndex(p => p.id === id);
        if (index !== -1) {
            waitingQueue.splice(index, 1);
            console.log(`플레이어 ${id} 대기 큐에서 제거됨`);
        }
    }

    function endSession(sessionId, playerId) {
        const session = gameSessions.get(sessionId);
        if (!session) return;

        const opponent = session.player1.id === playerId ? session.player2 : session.player1;
        opponent.ws.send(JSON.stringify({
            type: 'error',
            message: '상대방이 게임을 떠났습니다.'
        }));

        gameSessions.delete(sessionId);
    }
});

function calculateResult(choice1, choice2) {
    if (choice1 === choice2) {
        return 'draw';
    }

    const winConditions = {
        'rock': 'scissors',
        'paper': 'rock',
        'scissors': 'paper'
    };

    return winConditions[choice1] === choice2 ? 'win' : 'lose';
}

function generatePlayerId() {
    return Math.random().toString(36).substring(2, 15);
}

function generateSessionId() {
    return Math.random().toString(36).substring(2, 15);
}

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`WebSocket 서버가 포트 ${PORT}에서 실행 중입니다.`);
});
