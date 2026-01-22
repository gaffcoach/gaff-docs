# Players

Endpoints related to football players within the GAFF ecosystem.

## Get Player

Retrieve a single player by ID.

```http
GET /v1/players/{playerId}
```

## Parameters

| Name     | Type   | Description              |
| -------- | ------ | ------------------------ |
| playerId | string | Unique player identifier |

## Example Request

```http
GET /v1/players/player_123
Authorization: Bearer YOUR_API_TOKEN
```

## Response

```json
{
  "id": "player_123",
  "tokenId": 1010000,
  "name": "Cristiano Messi",
  "country": "USA",
  "position": "Midfielder",
  "age": 19,
  "preferred foot": "Left",
  "height": "6 ft 4",
  "shirt": 10,
  "market value": "$100M",
  "rating": 82,
  "club": "GAFF United"
}
```
