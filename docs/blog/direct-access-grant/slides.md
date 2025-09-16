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
flowchart LR
    A[👤 User] --> B[📱 Trusted App]
    B --> C[🔑 Get Token]
    C --> D[🌐 Access API]
    
    style A fill:#e1f5fe
    style B fill:#f3e5f5
    style C fill:#e8f5e8
    style D fill:#fff3e0
```

---

## Step 1: User Login

User enters credentials in the trusted application

```
┌─────────────────────────┐
│      🔐 Login Form      │
│                         │
│  Username: [john@ex...] │
│  Password: [••••••••••] │
│                         │
│      [ 🚀 Login ]       │
└─────────────────────────┘
```

**What happens:** User trusts the app with their credentials

---

## Step 2: Token Request

Client sends credentials to authorization server

```http
POST /auth/realms/demo/protocol/openid-connect/token
Content-Type: application/x-www-form-urlencoded

grant_type=password
username=john@example.com
password=secret123
client_id=my-app
client_secret=app-secret
scope=openid profile
```

```mermaid
flowchart LR
    A[📱 Client App] -->|"🔐 POST /token<br/>credentials"| B[🏛️ Keycloak]
    
    style A fill:#f3e5f5
    style B fill:#e3f2fd
```

---

## Step 3: Token Response

Keycloak validates and returns tokens

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIs...",
  "token_type": "Bearer",
  "expires_in": 300,
  "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
  "scope": "openid profile"
}
```

```mermaid
flowchart LR
    A[🏛️ Keycloak] -->|"✅ access_token<br/>+ refresh_token"| B[📱 Client App]
    
    style A fill:#e3f2fd
    style B fill:#f3e5f5
```

---

## Step 4: API Access

Client uses token to access protected resources

```http
GET /api/user-data
Authorization: Bearer eyJhbGciOiJSUzI1NiIs...
Content-Type: application/json
```

```mermaid
flowchart LR
    A[📱 Client App] -->|"🎫 Bearer Token"| B[🌐 API Server]
    B -->|"📊 Protected Data"| A
    
    style A fill:#f3e5f5
    style B fill:#fff3e0
```

---

## Complete Flow Diagram

```mermaid
sequenceDiagram
    participant U as 👤 User
    participant C as 📱 Client
    participant K as 🏛️ Keycloak
    participant A as 🌐 API Server

    Note over U,A: Direct Access Grant Flow

    U->>C: 🔐 Enter username/password
    
    rect rgb(240, 248, 255)
        Note over C,K: Authentication Phase
        C->>K: 📤 POST /token<br/>(credentials + client_id)
        K->>K: ✅ Validate client & user
        K->>C: 🎫 access_token + refresh_token
    end
    
    rect rgb(248, 255, 240)
        Note over C,A: Resource Access Phase
        C->>A: 🌐 GET /api/resource<br/>(Bearer token)
        A->>A: 🔍 Validate token
        A->>C: 📊 Protected resource data
    end
    
    C->>U: 📱 Display user data
```

---

## When to Use This Flow

### ✅ **Recommended For:**
- 📱 **First-party mobile apps** - Your own company's apps
- 💻 **Command-line tools** - Developer utilities
- 🔄 **Legacy system migration** - Transitioning old systems
- 🏢 **Internal enterprise apps** - High-trust environments

### ❌ **Not Recommended For:**
- 🌐 **Third-party applications** - External developers
- 🖥️ **Web applications** - Use Authorization Code instead
- 🔓 **Public clients** - Cannot securely store secrets
- 📱 **Untrusted mobile apps** - Downloaded from app stores

---

## Security Considerations

### 🔴 **Risks**
- Credentials exposed to client application
- No user consent screen
- Vulnerable to credential theft

### 🛡️ **Mitigations**
- Use only with **highly trusted** clients
- Implement **HTTPS everywhere**
- **Short token lifetimes** (5-15 minutes)
- **Strong client authentication**
- **Regular security audits**

---
