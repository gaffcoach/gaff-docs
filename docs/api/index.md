# API Reference

> ⚠️ **Internal API**  
> This API is currently private and intended for internal GAFF services only.

The GAFF API allows internal services and applications to interact with the GAFF platform programmatically.

## Format

- All requests use JSON

- All responses are JSON

- HTTPS only

## Authentication

All requests must be authenticated using an API token.

```txt
Authorization: Bearer YOUR_API_TOKEN
```

## Versioning

The API is versioned via the URL:

```txt
/v1/
```

Example:

```txt
GET /v1/players/{id}
```

## Base URL

```txt
https://api.gaff.coach

```
