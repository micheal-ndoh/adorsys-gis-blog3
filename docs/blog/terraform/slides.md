---
title: Terraform Slides
---

# Terraform Basics

- Providers and resources
- Plan and apply
- State backends

## Module Example

```hcl
module "vpc" {
  source = "./modules/vpc"
  cidr_block = "10.0.0.0/16"
}
``` 