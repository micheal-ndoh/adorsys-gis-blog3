---
title: Prisma Slides
---

# Prisma Overview

- ORM and type-safety
- Prisma schema and migrations
- Query examples

## Modeling

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  createdAt DateTime @default(now())
}
```

## Queries

```ts
const users = await db.user.findMany();
``` 