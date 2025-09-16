---
title: Direct Access Grant Demo
slug: direct-access-grant-slides
lang: en
authors: Nathan
tags: [oauth2, authentication, security, keycloak, presentation]
description: Slide presentation demonstrating Direct Access Grant (Resource Owner Password Credentials) flow implementation.
date: '2025-09-16'
---

# The Direct Grant Flow: A Direct Path to Authentication

---

## Slide 1: Title & Overview

### The Direct Grant Flow: A Direct Path to Authentication

The Direct Grant Flow, also known as the Resource Owner Password Credentials Grant, is an OAuth 2.0 grant type designed for highly trusted, first-party applications. This flow allows a trusted client to obtain an access token by directly using a user's username and password, bypassing the need for browser redirects.

**Primary Benefit:** Simplicity - direct, back-channel communication between client and authorization server

**Main Drawback:** Security risk - the client application handles and transmits the user's credentials

This flow is specifically designed for scenarios where the user has complete trust in the application with their credentials.

---

## Slide 2: The Core Components

### Key Players in the Flow

**Resource Owner:** The user who owns the data and provides their credentials to the trusted application.

**Client:** The trusted application (e.g., first-party mobile app or desktop application) that collects user credentials and requests the access token on behalf of the user.

**Authorization Server (Keycloak):** The identity provider that authenticates the user credentials, validates the client identity, and issues access tokens upon successful authentication.

**Resource Server:** The API server that hosts the protected resources and validates access tokens before granting access to protected data.

---

## Slide 3: How It Works (High-Level Diagram)

### High-Level Diagram of the Flow

```
[User] ──credentials──> [Client Application]
                              │
                              │ POST /token
                              │ (username, password, client_id, client_secret)
                              ▼
                        [Authorization Server]
                              │
                              │ access_token + refresh_token
                              ▼
                        [Client Application]
                              │
                              │ Authorization: Bearer <token>
                              ▼
                        [Resource Server] ──protected data──> [Client Application]
```

The flow demonstrates a direct path from credential collection to resource access, with the authorization server acting as the central authentication authority.

---

## Slide 4: Step 1 - Credential Collection

### Step 1: The Client Collects Credentials

The authentication process begins when the user interacts directly with the trusted client application. The user enters their username and password into a form within the client application interface.

**Key Characteristics:**
- No browser redirection required
- Credentials are entered directly into the application
- The client application temporarily handles the sensitive credentials
- This step requires absolute trust between the user and the application

**Security Note:** The client must implement secure credential handling practices, including secure transmission and avoiding credential storage.

---

## Slide 5: Step 2 - The Direct Token Request

### Step 2: The Client Requests a Token

The client makes a direct POST request to the authorization server's token endpoint. This request contains all necessary information for authentication and authorization.

**API Call Details:**
```http
POST /auth/realms/{realm}/protocol/openid-connect/token
Content-Type: application/x-www-form-urlencoded

grant_type=password
username={user_username}
password={user_password}
client_id={client_identifier}
client_secret={client_secret}
scope={requested_scopes}
```

**Key Parameters:**
- `grant_type=password` - Specifies the Direct Grant flow
- `username` & `password` - User credentials
- `client_id` & `client_secret` - Client authentication
- `scope` - Requested permissions

---

## Slide 6: Step 3 - Validation and Token Issuance

### Step 3: Validation & Issuing Tokens

Keycloak performs a two-step validation process upon receiving the token request:

**Client Validation:** Keycloak first validates the client's identity using the provided client_id and client_secret, ensuring the client is authorized to use the Direct Grant flow.

**User Authentication:** Keycloak then authenticates the user by validating the provided username and password against the configured user store or identity provider.

**Successful Response:** Upon successful validation, Keycloak responds with a JSON object containing:
```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIs...",
  "token_type": "Bearer",
  "expires_in": 300,
  "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
  "scope": "openid profile email"
}
```

---

## Slide 7: Step 4 - Accessing Protected Resources

### Step 4: Accessing Protected Data

With the access token obtained, the client can now access protected resources on behalf of the user.

**Token Usage:** The client includes the access token in the Authorization header of requests to the Resource Server:
```http
GET /api/protected-resource
Authorization: Bearer eyJhbGciOiJSUzI1NiIs...
Content-Type: application/json
```

**Resource Server Validation:** The Resource Server validates the token (either locally or by calling the authorization server) to verify:
- Token authenticity and integrity
- Token expiration status
- Required scopes for the requested resource

**Access Granted:** Upon successful token validation, the Resource Server returns the requested protected data to the client application.

---

## Slide 8: Complete Sequence Diagram

### The Complete Flow (Sequence Diagram)

```
User                Client App           Authorization Server      Resource Server
  │                      │                        │                      │
  │   Enter credentials  │                        │                      │
  │─────────────────────>│                        │                      │
  │                      │                        │                      │
  │                      │  POST /token           │                      │
  │                      │  grant_type=password   │                      │
  │                      │  username=user         │                      │
  │                      │  password=pass         │                      │
  │                      │  client_id=app         │                      │
  │                      │  client_secret=secret  │                      │
  │                      │───────────────────────>│                      │
  │                      │                        │                      │
  │                      │                        │ Validate client      │
  │                      │                        │ Authenticate user    │
  │                      │                        │                      │
  │                      │  access_token +        │                      │
  │                      │  refresh_token         │                      │
  │                      │<───────────────────────│                      │
  │                      │                        │                      │
  │                      │  GET /api/resource     │                      │
  │                      │  Authorization: Bearer │                      │
  │                      │  <access_token>        │                      │
  │                      │─────────────────────────────────────────────>│
  │                      │                        │                      │
  │                      │                        │                      │ Validate token
  │                      │                        │                      │
  │                      │  Protected resource    │                      │
  │                      │<─────────────────────────────────────────────│
  │                      │                        │                      │
  │   Display data       │                        │                      │
  │<─────────────────────│                        │                      │
```

This sequence diagram illustrates the complete interaction flow between all four components, showing the direct communication path that characterizes the Direct Grant Flow.

---
