# Bash commands for project

## Remove all generated frontend files

```bash
find ./resources/customer/ts -type f \( -name '*.d.ts' -or -name '*.js' -or -name '*.map' \)
```
