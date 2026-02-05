// 게임 상태 관리
class GameManager {
    constructor() {
        this.socket = null;
        this.playerName = '';
        this.opponentName = '';
        this.myChoice = null;
        this.opponentChoice = null;
        this.gameState = 'idle'; // idle, waiting, playing, result
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.connectWebSocket();
    }

    connectWebSocket() {
        // WebSocket 서버 연결
        // 프로덕션 환경에서는 실제 서버 주소로 변경하세요
        const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const wsHost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
            ? 'localhost:3001' 
            : window.location.hostname + ':3001';
        this.socket = new WebSocket(`${wsProtocol}//${wsHost}`);

        this.socket.onopen = () => {
            console.log('WebSocket 연결됨');
        };

        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            this.handleMessage(data);
        };

        this.socket.onerror = (error) => {
            console.error('WebSocket 오류:', error);
            this.showError('서버 연결 오류가 발생했습니다.');
        };

        this.socket.onclose = () => {
            console.log('WebSocket 연결 종료');
            // 재연결 시도
            setTimeout(() => this.connectWebSocket(), 3000);
        };
    }

    setupEventListeners() {
        const joinBtn = document.getElementById('joinBtn');
        const cancelBtn = document.getElementById('cancelBtn');
        const choiceBtns = document.querySelectorAll('.choice-btn');
        const playAgainBtn = document.getElementById('playAgainBtn');

        joinBtn.addEventListener('click', () => this.joinGame());
        cancelBtn.addEventListener('click', () => this.cancelWaiting());
        playAgainBtn.addEventListener('click', () => this.playAgain());

        choiceBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const choice = e.currentTarget.dataset.choice;
                this.makeChoice(choice);
            });
        });
    }

    joinGame() {
        const nameInput = document.getElementById('playerName');
        const playerName = nameInput.value.trim();

        if (!playerName) {
            alert('이름을 입력해주세요!');
            return;
        }

        this.playerName = playerName;
        
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify({
                type: 'join',
                playerName: playerName
            }));

            this.showWaitingRoom();
        } else {
            // WebSocket이 연결되지 않은 경우, 로컬 매칭 시뮬레이션
            this.simulateLocalMatching();
        }
    }

    simulateLocalMatching() {
        // 로컬 테스트를 위한 시뮬레이션
        // 실제로는 WebSocket 서버가 필요합니다
        this.showWaitingRoom();
        
        // 2초 후 매칭 성공 시뮬레이션
        setTimeout(() => {
            this.opponentName = '상대방';
            this.showGameRoom();
        }, 2000);
    }

    cancelWaiting() {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify({
                type: 'cancel'
            }));
        }
        this.showIdle();
    }

    makeChoice(choice) {
        if (this.gameState !== 'playing') return;
        if (this.myChoice !== null) return; // 이미 선택함

        this.myChoice = choice;
        
        // UI 업데이트
        document.querySelectorAll('.choice-btn').forEach(btn => {
            btn.classList.remove('selected');
            if (btn.dataset.choice === choice) {
                btn.classList.add('selected');
            }
            btn.disabled = true;
        });

        document.getElementById('gameStatusText').textContent = '상대방의 선택을 기다리는 중...';

        // 서버에 선택 전송
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify({
                type: 'choice',
                choice: choice
            }));
        } else {
            // 로컬 시뮬레이션: 1초 후 상대방 선택
            setTimeout(() => {
                const choices = ['rock', 'paper', 'scissors'];
                const randomChoice = choices[Math.floor(Math.random() * choices.length)];
                this.handleOpponentChoice(randomChoice);
            }, 1000);
        }
    }

    handleMessage(data) {
        switch (data.type) {
            case 'matched':
                this.opponentName = data.opponentName;
                this.showGameRoom();
                break;
            case 'opponentChoice':
                this.handleOpponentChoice(data.choice);
                break;
            case 'result':
                this.showResult(data.result, data.myChoice, data.opponentChoice);
                break;
            case 'error':
                this.showError(data.message);
                break;
        }
    }

    handleOpponentChoice(choice) {
        this.opponentChoice = choice;
        this.showResult();
    }

    showResult() {
        if (!this.myChoice || !this.opponentChoice) return;

        const result = this.calculateResult(this.myChoice, this.opponentChoice);
        
        // 결과 표시
        document.getElementById('myChoice').textContent = this.getChoiceEmoji(this.myChoice);
        document.getElementById('opponentChoice').textContent = this.getChoiceEmoji(this.opponentChoice);
        
        const resultText = document.getElementById('resultText');
        resultText.className = 'result-text';
        
        if (result === 'win') {
            resultText.textContent = '🎉 승리!';
            resultText.classList.add('win');
        } else if (result === 'lose') {
            resultText.textContent = '😢 패배...';
            resultText.classList.add('lose');
        } else {
            resultText.textContent = '🤝 무승부!';
            resultText.classList.add('draw');
        }

        document.getElementById('resultArea').classList.remove('hidden');
        this.gameState = 'result';
    }

    calculateResult(myChoice, opponentChoice) {
        if (myChoice === opponentChoice) {
            return 'draw';
        }

        const winConditions = {
            'rock': 'scissors',
            'paper': 'rock',
            'scissors': 'paper'
        };

        return winConditions[myChoice] === opponentChoice ? 'win' : 'lose';
    }

    getChoiceEmoji(choice) {
        const emojis = {
            'rock': '✊',
            'paper': '✋',
            'scissors': '✌️'
        };
        return emojis[choice] || '-';
    }

    playAgain() {
        this.myChoice = null;
        this.opponentChoice = null;
        this.gameState = 'playing';

        // UI 리셋
        document.querySelectorAll('.choice-btn').forEach(btn => {
            btn.classList.remove('selected');
            btn.disabled = false;
        });

        document.getElementById('gameStatusText').textContent = '가위, 바위, 보를 선택하세요!';
        document.getElementById('resultArea').classList.add('hidden');
    }

    showIdle() {
        this.gameState = 'idle';
        document.querySelector('.player-info').classList.remove('hidden');
        document.getElementById('waitingRoom').classList.add('hidden');
        document.getElementById('gameRoom').classList.add('hidden');
    }

    showWaitingRoom() {
        this.gameState = 'waiting';
        document.querySelector('.player-info').classList.add('hidden');
        document.getElementById('waitingRoom').classList.remove('hidden');
        document.getElementById('gameRoom').classList.add('hidden');
    }

    showGameRoom() {
        this.gameState = 'playing';
        document.querySelector('.player-info').classList.add('hidden');
        document.getElementById('waitingRoom').classList.add('hidden');
        document.getElementById('gameRoom').classList.remove('hidden');
        document.getElementById('opponentName').textContent = this.opponentName;
        
        // 게임 상태 리셋
        this.myChoice = null;
        this.opponentChoice = null;
        document.querySelectorAll('.choice-btn').forEach(btn => {
            btn.classList.remove('selected');
            btn.disabled = false;
        });
        document.getElementById('gameStatusText').textContent = '가위, 바위, 보를 선택하세요!';
        document.getElementById('resultArea').classList.add('hidden');
    }

    showError(message) {
        alert(message);
    }
}

// 게임 시작
document.addEventListener('DOMContentLoaded', () => {
    new GameManager();
});
