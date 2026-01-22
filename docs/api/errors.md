# 7️⃣ Errors Page (Very Professional Touch)

### 📄 `docs/api/errors.md`

```md
# Errors

The GAFF API uses standard HTTP status codes.
```

## Error Format

```json
{
  "error": "Error message",
  "status": 400
}
```

## Common Errors

| Status | Meaning               |
| ------ | --------------------- |
| 400    | Bad Request           |
| 401    | Unauthorized          |
| 403    | Forbidden             |
| 404    | Not Found             |
| 500    | Internal Server Error |
