-- Migration number: 0002 	 2023-07-22T20:50:31.713Z
ALTER TABLE entries
ADD COLUMN files JSON;
