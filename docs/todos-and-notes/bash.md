# Bash commands for project

## Remove all generated frontend files

```bash
find ./resources/customer/ts -type f \( -name '*.d.ts' -or -name '*.js' -or -name '*.map' \)
```

### Remove auto generated files
```bash
cd ./resources/customer/ts && find . -type f \( -name '*.d.ts' -or -name '*.js' -or -name '*.map' \) -exec rm {} +
```


