## Post

- id (string; uuid)
- user_id (string; uuid)
- title (varchar; 60 chars)
- body (varchar; 280 chars)
- posted (datetime; YYYY-MM-DD hh:mm:ss)
- last_saved (datetime; YYYY-MM-DD hh:mm:ss)

## User

- id (string; uuid)
- username (string)
- email (string)
- password (string; somehow encryted)
- profilepic (string; path to image)