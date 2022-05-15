# Build Lib

build-lib is a template for creating a build library.

## Dev Dependencies

```json
{
  "@aliuq/eslint-config": "^0.0.3",
  "eslint": "^8.15.0",
  "tsup": "^5.12.7",
  "typescript": "^4.6.4",
  "unbuild": "^0.7.4"
}
```

## Scripts

```json
{
  "dev": "tsup --watch src",
  "build": "unbuild",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```
