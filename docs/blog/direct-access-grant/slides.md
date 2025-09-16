---
title: Direct Access Grant Demo
slug: direct-access-grant-slides
lang: en
authors: Nathan
tags: [oauth2, authentication, security, keycloak, presentation]
description: Slide presentation demonstrating Direct Access Grant (Resource Owner Password Credentials) flow implementation.
date: '2025-09-16'
---

# Direct Access Grant Flow
## Resource Owner Password Credentials

---

## What is Direct Access Grant?

OAuth 2.0 grant type for **trusted applications**

- Client uses user's username/password directly
- No browser redirects needed
- Simple but requires high trust

```mermaid
graph LR
    A[User] --> B[Trusted App]
    B --> C[Get Token]
    C --> D[Access API]
```

---

## Step 1: User Login

User enters credentials in the trusted application

```
┌─────────────────┐
│   Login Form    │
│                 │
│ Username: [___] │
│ Password: [___] │
│                 │
│    [Login]      │
└─────────────────┘
```

---

## Step 2: Token Request

Client sends credentials to authorization server

```http
POST /auth/realms/demo/protocol/openid-connect/token

grant_type=password
username=john@example.com
password=secret123
client_id=my-app
client_secret=app-secret
```

```mermaid
graph LR
    A[Client App] -->|POST /token| B[Keycloak]
```

---

## Step 3: Token Response

Keycloak validates and returns tokens

```json
{
  "access_token": "eyJhbGc...",
  "token_type": "Bearer",
  "expires_in": 300,
  "refresh_token": "eyJhbGc..."
}
```

```mermaid
graph LR
    A[Keycloak] -->|access_token| B[Client App]
```

---

## Step 4: API Access

Client uses token to access protected resources

```http
GET /api/user-data
Authorization: Bearer eyJhbGc...
```

```mermaid
graph LR
    A[Client App] -->|Bearer Token| B[API Server]
    B -->|Protected Data| A
```

---

## Complete Flow

```mermaid
sequenceDiagram
    participant U as User
    participant C as Client
    participant K as Keycloak
    participant A as API

    U->>C: username/password
    C->>K: POST /token
    K->>C: access_token
    C->>A: GET /api (Bearer token)
    A->>C: protected data
    C->>U: display data
```

---

## When to Use

✅ **Good for:**
- First-party mobile apps
- Command-line tools
- Legacy system migration

❌ **Avoid for:**
- Third-party applications
- Web applications
- Untrusted clients

---
