# API Design

Design a RESTful API for a given resource, following consistent patterns and best practices.

## Usage

Invoke with `/api-design <resource or entity>` where the argument is the resource to design endpoints for (e.g., "users", "orders", "blog posts").

## Workflow

When this skill is invoked, follow these steps to produce a complete API design.

### 1. Parse the Resource

- Read `$ARGUMENTS` to identify the resource/entity
- Determine relationships to other resources if mentioned (e.g., "user orders" implies nesting)
- Identify the key fields and their types based on context

### 2. Design Endpoints

Follow these conventions strictly:

**Resource Naming**
- Use plural nouns: `/users`, `/orders`, `/products`
- Nest for direct relationships: `/users/:id/orders`
- Use kebab-case for multi-word resources: `/order-items`
- Prefix all routes: `/api/v1/...`

**Standard CRUD Endpoints**

| Method | Path | Description | Status |
|--------|------|-------------|--------|
| GET | `/api/v1/{resources}` | List all (paginated) | 200 |
| GET | `/api/v1/{resources}/:id` | Get single by ID | 200 / 404 |
| POST | `/api/v1/{resources}` | Create new | 201 |
| PUT | `/api/v1/{resources}/:id` | Full replace | 200 / 404 |
| PATCH | `/api/v1/{resources}/:id` | Partial update | 200 / 404 |
| DELETE | `/api/v1/{resources}/:id` | Delete | 204 / 404 |

**Response Envelope**

Success (single):
```json
{
  "data": { "id": "...", "type": "resource", ... }
}
```

Success (list):
```json
{
  "data": [ ... ],
  "meta": {
    "page": { "cursor": "abc123", "limit": 20, "has_more": true },
    "total": 142
  }
}
```

Error:
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Human-readable description",
    "details": [
      { "field": "email", "message": "must be a valid email address" }
    ]
  }
}
```

**Pagination, Filtering, Sorting**
- Cursor-based pagination: `?cursor=abc&limit=20`
- Filtering by field: `?status=active&created_after=2024-01-01`
- Sorting: `?sort=created_at&order=desc`
- Default limit: 20, max limit: 100

**Status Codes**
- 200: Success
- 201: Created (include `Location` header)
- 204: Deleted (no body)
- 400: Bad request / malformed input
- 401: Unauthenticated
- 403: Forbidden / insufficient permissions
- 404: Resource not found
- 409: Conflict (duplicate, state conflict)
- 422: Unprocessable entity (validation failure)
- 500: Internal server error

### 3. Output

Produce these deliverables:

1. **Endpoint Table**: All endpoints with method, path, description, request body, and response status
2. **Request/Response Examples**: Show a concrete curl or HTTP example for each endpoint with sample JSON bodies
3. **OpenAPI Schema Snippet**: A YAML snippet defining the resource schema, compatible with OpenAPI 3.0, including:
   - The resource schema under `components.schemas`
   - Path definitions for at least the list and create endpoints
   - Request body and response schemas

### 4. Design Notes

End with brief notes on:
- **Auth**: Which endpoints require authentication and what scopes/roles
- **Rate limiting**: Suggested limits (e.g., 100 req/min for list, 30 req/min for create)
- **Caching**: Which GET endpoints are cacheable and suggested TTL
