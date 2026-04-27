## What does this PR do?

<!-- One paragraph: what changed and why it was needed. Link the issue if one exists (Fixes #123). -->

## Type of change

- [ ] Compound lexicon entry / entries (add words to `lexicon-data.ts`)
- [ ] Bug fix (a function returned wrong output)
- [ ] New function or module
- [ ] Performance improvement
- [ ] Documentation update
- [ ] Test improvement
- [ ] .NET / C# parity fix

## Checklist

- [ ] `pnpm --filter @iamahsanmehmood/urdu-tools test` passes (392+ tests green)
- [ ] `dotnet test` passes (if C# was changed)
- [ ] `pnpm --filter @iamahsanmehmood/urdu-tools build` succeeds with 0 TypeScript errors
- [ ] Tests added / updated for all new or changed behaviour
- [ ] Tests use real Urdu words (not placeholder text like "word1")
- [ ] Both JS and C# packages updated together (if applicable)
- [ ] Docs updated if public API surface changed

## For compound lexicon PRs

- [ ] New entries added to `packages/urdu-js/src/compound/lexicon-data.ts` in alphabetical order by root
- [ ] Test added in `packages/urdu-js/tests/compound/detect-lexicon.test.ts`
- [ ] Entries are verified Urdu compounds (not guesses)

## Test cases

| Input | Expected output |
|-------|----------------|
| | |

## Breaking changes?

- [ ] No breaking changes
- [ ] Breaking change — describe what changes and the migration path
