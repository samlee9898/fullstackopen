```mermaid
sequenceDiagram
  participant browser
  participant server

  browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
  server activated
  server->>browser: status code 201(Created)
  server deactivated
```
