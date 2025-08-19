---
title: Prisma
slug: prisma
lang: en
authors: Micheal Ndoh
tags: [database, orm, typesafe]
description: Learn how to model data with the Prisma Schema, run migrations, and build fast, type‑safe queries in Node.js apps.
date: '2025-08-16'
---

# Introduction to Prisma

![Prisma](https://raw.githubusercontent.com/prisma/presskit/master/Assets/Prisma-Light-PrismaLogo.svg)

Prisma is a next‑generation ORM that provides end‑to‑end type safety and a great developer experience for working with databases.

## Why Use Prisma?

1. **Type‑safe queries**
2. **Auto‑generated client**
3. **Schema‑first modeling**
4. **Migrations**

## Key Concepts

- Prisma Schema (`schema.prisma`)
- Migrate (history of schema changes)
- Prisma Client (typed queries)

### Diagram: Simple Data Model

```mermaid
graph TD
  U[User] --1..*--> P[Post]
```

## Conclusion

Prisma streamlines database access with modern tooling and great DX. 