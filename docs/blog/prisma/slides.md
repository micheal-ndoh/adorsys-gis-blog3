---
title: Prisma
slug: prisma
tags:
  - database
  - orm
  - typesafe
background-color: 'rgba(20, 184, 166, 1)'
date: '2025-08-16'
lang: en
---

## Introduction to Prisma

Prisma brings type safety and a delightful developer experience to databases.

---

![Prisma](https://raw.githubusercontent.com/prisma/presskit/master/Assets/Prisma-Light-PrismaLogo.svg)

---

## Why Prisma?

- Type‑safe queries
- Migrations
- Prisma Client

---

## Modeling

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  createdAt DateTime @default(now())
}
```

---

## Querying

```ts
const users = await db.user.findMany();
``` 