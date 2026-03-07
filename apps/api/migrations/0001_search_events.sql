CREATE TABLE search_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  player_tag TEXT NOT NULL,
  player_name TEXT,
  icon_id INTEGER,
  country TEXT,
  created_at INTEGER NOT NULL
);

CREATE INDEX idx_created_at
ON search_events(created_at);
