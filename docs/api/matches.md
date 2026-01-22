# 6️⃣ Matches Endpoint

### 📄 `docs/api/matches.md`

```md
# Matches

Endpoints for match data and results.
```

## Get Match

```http
GET /v1/matches/{matchId}
```

## Response

```json
{
  "id": "match_456",
  "homeTeam": "GAFF United",
  "awayTeam": "GAFF City",
  "status": "completed",
  "score": "2-1"
}
```
