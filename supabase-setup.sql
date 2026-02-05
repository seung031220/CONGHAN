-- 콩한쪽 실시간 대전용 테이블 (Supabase SQL Editor에서 실행)

-- 매칭 대기열 (한 줄만 사용)
CREATE TABLE IF NOT EXISTS matchmaking (
 id INT PRIMARY KEY DEFAULT 1,
 player1_key TEXT,
 player2_key TEXT,
 updated_at TIMESTAMPTZ DEFAULT NOW(),
 CONSTRAINT single_row CHECK (id = 1)
);

-- 기존 행이 없으면 삽입
INSERT INTO matchmaking (id, player1_key, player2_key)
VALUES (1, NULL, NULL)
ON CONFLICT (id) DO NOTHING;

-- 게임 방
CREATE TABLE IF NOT EXISTS rooms (
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 player1_key TEXT NOT NULL,
 player2_key TEXT NOT NULL,
 round INT NOT NULL DEFAULT 1,
 p1_choice TEXT,
 p2_choice TEXT,
 p1_score INT NOT NULL DEFAULT 0,
 p2_score INT NOT NULL DEFAULT 0,
 status TEXT NOT NULL DEFAULT 'playing',
 created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Realtime: Supabase 대시보드 > Database > Replication 에서 rooms, matchmaking 테이블 체크

-- RLS: 익명 읽기/쓰기 허용 (데모용)
ALTER TABLE matchmaking ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "matchmaking_all" ON matchmaking;
CREATE POLICY "matchmaking_all" ON matchmaking FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "rooms_all" ON rooms;
CREATE POLICY "rooms_all" ON rooms FOR ALL USING (true) WITH CHECK (true);
