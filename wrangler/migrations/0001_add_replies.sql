-- Migration number: 0001 	 2023-07-20T13:22:43.844Z
CREATE TABLE replies (
  id VARCHAR(50) PRIMARY KEY,
  entryId VARCHAR(50),
  content VARCHAR(50),
  FOREIGN KEY (entryId) REFERENCES entries(id)
);
