CREATE TABLE artists (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    bio TEXT,
    genre TEXT NOT NULL
);

CREATE TABLE releases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    release_date TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('unreleased', 'released', 'trending')),
    genre TEXT NOT NULL,
    artist_id TEXT NOT NULL,
    FOREIGN KEY (artist_id) REFERENCES artists(id) ON DELETE CASCADE
);
