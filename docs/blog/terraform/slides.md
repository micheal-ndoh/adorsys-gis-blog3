---
title: Terraform Slides
---

![Terraform](https://cdn.prod.website-files.com/67f9776b8553224cbb897cd7/680fb932e0ea656c1a28e844_f607894a26f94bcc32aa94578acafd2c863efb31-1055x514.png)

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