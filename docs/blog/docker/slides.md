---
title: Docker Slides
---

# Images and Containers

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm i --frozen-lockfile
COPY . .
CMD ["pnpm","dev"]
```

## Compose

```yaml
services:
  web:
    build: .
    ports: ["3000:3000"]
``` 