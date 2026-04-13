---
name: Bug report
about: Report a normalization failure, incorrect output, or unexpected behaviour
title: '[BUG] '
labels: bug
assignees: ''
---

## Describe the bug

<!-- A clear description of what went wrong -->

## Input

<!-- The exact Urdu string. Use Unicode escapes if needed, e.g. '\u0647\u064A' -->

```
(paste input here)
```

**Source of text**: <!-- keyboard / TinyMCE / Word / database / copy-paste from website / other -->

## Expected output

```
(what you expected)
```

## Actual output

```
(what you actually got)
```

## Code to reproduce

```typescript
import { normalize } from '@urdu-tools/core'
normalize('your input here')
```

## Package and version

- Package: `@urdu-tools/core` / `UrduTools.Core`
- Version: <!-- e.g. 1.0.0 -->
- Runtime: <!-- Node 22 / .NET 9 / Browser -->
