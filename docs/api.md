# API Reference

Technical details and payload structures for internal systems.

## Endpoints

### `GET /api/v1/status`
Retrieves the current health status of the application.

!!! note "Authentication"
    This endpoint does not require any authorization token.

**Response:**
```json
{
  "status": "online",
  "environment": "production",
  "version": "1.0.0"
}
