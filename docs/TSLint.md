# TSLint Configuration Details

## Table of Contents
- [Strict Return Type](#strict-return-type)

## Strict Return Type
Requires a return type definition and allows static analysis to ensure return type is fulfilled.

- https://stackoverflow.com/questions/42793701/is-there-a-way-to-enforce-method-return-types-on-typescript-classes-via-a-tslint
- https://palantir.github.io/tslint/rules/typedef/

```
"typedef": [
  true,
  "call-signature",
  "property-declaration"
]
```