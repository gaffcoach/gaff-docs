Clean. Professional. No noise.

---

### 📄 `docs/api/authentication.md`

````md
# Authentication

> ⚠️ Internal use only

The GAFF API uses **Bearer token authentication**.

## Header

```http
Authorization: Bearer YOUR_API_TOKEN
```
````

## Notes

- Tokens are issued internally

- Do not expose tokens in frontend applications

- Rotate tokens if compromised

## Unauthorized Response

```json
{
  "error": "Unauthorized",
  "status": 401
}
```
