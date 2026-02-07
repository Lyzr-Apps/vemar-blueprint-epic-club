# API Security Documentation

## Overview

All APIs in this application are now protected with comprehensive security measures including authentication, authorization, rate limiting, encryption, and request validation.

## Security Features

### 1. API Key Authentication
- **Format**: Bearer token with `vemar_` prefix
- **Storage**: SHA-256 hashed keys in secure storage
- **Transmission**: Authorization header: `Authorization: Bearer vemar_...`

### 2. Permission-Based Access Control
Available permissions:
- `read:requests` - View client requests
- `write:requests` - Create and update requests
- `read:clients` - View client information
- `write:clients` - Create and update clients
- `read:analytics` - View analytics data
- `admin:api-keys` - Manage API keys (admin only)
- `send:notifications` - Send notifications

### 3. Rate Limiting
- **Per-Key Limit**: Configurable per API key (default: 100 requests/minute)
- **IP-Based Limit**: 1000 requests/hour per IP address
- **Window**: Sliding window with automatic reset

### 4. Encryption
- **Key Hashing**: SHA-256 for API key storage
- **Data Encryption**: AES-256-CBC for sensitive data
- **Signature Validation**: HMAC-SHA256 for request integrity

### 5. Request Validation
- Schema-based request body validation
- Type checking and constraint enforcement
- Input sanitization

## Creating API Keys

### Via Dashboard
1. Navigate to `/api-security`
2. Click "Create API Key"
3. Configure:
   - Name
   - Permissions (select from available permissions)
   - Rate limit (requests per minute)
   - Expiration (optional, in days)
4. Copy the generated API key (shown only once!)

### Via API (requires admin permission)
```bash
POST /api/admin/api-keys
Authorization: Bearer vemar_your_admin_api_key
Content-Type: application/json

{
  "name": "Production API Key",
  "permissions": ["read:requests", "write:requests"],
  "rateLimit": 100,
  "expiresInDays": 365
}
```

Response:
```json
{
  "success": true,
  "message": "API key created successfully",
  "apiKey": "vemar_abc123...",
  "keyData": {
    "id": "...",
    "name": "Production API Key",
    "permissions": ["read:requests", "write:requests"],
    "rateLimit": 100,
    "createdAt": "2026-02-07T...",
    "expiresAt": "2027-02-07T..."
  }
}
```

## Using API Keys

### Basic Usage
```bash
curl -X GET https://api.example.com/api/requests \
  -H "Authorization: Bearer vemar_your_api_key_here"
```

### With Request Body
```bash
curl -X POST https://api.example.com/api/requests \
  -H "Authorization: Bearer vemar_your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Request",
    "description": "Request details",
    "category": "SUPPORT",
    "priority": "HIGH",
    "clientId": "client_id_here"
  }'
```

### With HMAC Signature (Optional, for Enhanced Security)
```javascript
const crypto = require('crypto')

const timestamp = Date.now()
const payload = `${timestamp}:POST:https://api.example.com/api/requests`
const signature = crypto
  .createHmac('sha256', apiKey)
  .update(payload)
  .digest('hex')

fetch('https://api.example.com/api/requests', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
    'X-Signature': signature,
    'X-Timestamp': timestamp.toString()
  },
  body: JSON.stringify(requestData)
})
```

## Protected Endpoints

### Requests API
| Endpoint | Method | Required Permission | Description |
|----------|--------|---------------------|-------------|
| `/api/requests` | GET | `read:requests` | List all requests |
| `/api/requests` | POST | `write:requests` | Create new request |
| `/api/requests/[id]` | GET | `read:requests` | Get single request |
| `/api/requests/[id]` | PATCH | `write:requests` | Update request |
| `/api/requests/[id]` | DELETE | `write:requests` | Delete request |

### Clients API
| Endpoint | Method | Required Permission | Description |
|----------|--------|---------------------|-------------|
| `/api/clients` | GET | `read:clients` | List all clients |
| `/api/clients` | POST | `write:clients` | Create new client |

### Admin API
| Endpoint | Method | Required Permission | Description |
|----------|--------|---------------------|-------------|
| `/api/admin/api-keys` | GET | `admin:api-keys` | List all API keys |
| `/api/admin/api-keys` | POST | `admin:api-keys` | Create new API key |
| `/api/admin/api-keys?key=...` | DELETE | `admin:api-keys` | Revoke API key |

## Error Responses

### 401 Unauthorized
```json
{
  "success": false,
  "error": "Missing authorization header",
  "code": "MISSING_AUTH"
}
```

```json
{
  "success": false,
  "error": "Invalid API key",
  "code": "INVALID_KEY"
}
```

```json
{
  "success": false,
  "error": "API key has expired",
  "code": "EXPIRED_KEY"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "error": "Insufficient permissions",
  "code": "INSUFFICIENT_PERMISSIONS",
  "required": ["admin:api-keys"],
  "current": ["read:requests"]
}
```

### 429 Rate Limit Exceeded
```json
{
  "success": false,
  "error": "Rate limit exceeded",
  "code": "RATE_LIMIT_EXCEEDED",
  "limit": 100
}
```

## Development Mode

In development (`NODE_ENV=development`), internal frontend requests are automatically allowed without API keys. This enables the UI to function without authentication during local development.

To test with API key authentication in development, add the header:
```javascript
headers: {
  'Authorization': 'Bearer vemar_your_test_key'
}
```

## Production Deployment

1. **Generate Admin API Key**:
   - Create your first API key with all permissions manually
   - Use this to bootstrap your API key management

2. **Secure Environment**:
   - Set `NODE_ENV=production`
   - Use HTTPS only
   - Store API keys securely (environment variables, secrets manager)

3. **Database Migration**:
   - Replace in-memory storage with database (PostgreSQL, Redis)
   - Update `apiKeysStore` and `rateLimitStore` in `lib/apiSecurity.ts`

4. **Monitoring**:
   - Log all API key usage
   - Monitor rate limit violations
   - Set up alerts for suspicious activity

## Best Practices

1. **Key Rotation**: Regularly rotate API keys
2. **Least Privilege**: Grant minimum required permissions
3. **Key Storage**: Never commit API keys to version control
4. **Expiration**: Use expiration dates for temporary access
5. **Monitoring**: Track and audit API key usage
6. **Revocation**: Immediately revoke compromised keys

## Example Integration

### JavaScript/TypeScript
```typescript
class ApiClient {
  private apiKey: string
  private baseUrl: string

  constructor(apiKey: string, baseUrl: string) {
    this.apiKey = apiKey
    this.baseUrl = baseUrl
  }

  async get(endpoint: string) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`
      }
    })
    return response.json()
  }

  async post(endpoint: string, data: any) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    return response.json()
  }
}

// Usage
const client = new ApiClient('vemar_...', 'https://api.example.com')
const requests = await client.get('/api/requests')
```

### Python
```python
import requests

class ApiClient:
    def __init__(self, api_key, base_url):
        self.api_key = api_key
        self.base_url = base_url
        self.headers = {
            'Authorization': f'Bearer {api_key}'
        }

    def get(self, endpoint):
        response = requests.get(
            f'{self.base_url}{endpoint}',
            headers=self.headers
        )
        return response.json()

    def post(self, endpoint, data):
        response = requests.post(
            f'{self.base_url}{endpoint}',
            headers={**self.headers, 'Content-Type': 'application/json'},
            json=data
        )
        return response.json()

# Usage
client = ApiClient('vemar_...', 'https://api.example.com')
requests_list = client.get('/api/requests')
```

## Support

For issues or questions regarding API security, please contact your system administrator or refer to the API Security dashboard at `/api-security`.
