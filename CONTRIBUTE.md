# Commit Message Format

```txt
<type>(<scope>): <short summary>
  │       │          │
  │       │          └─⫸ Summary in present tense. Not capitalized. No period at the end.
  │       │
  │       └─⫸ Commit Scope: PackageName|Concept (optional)
  │
  └─⫸ Commit Type: fix|feat|refactor|perf|docs|lint|chore|merge|release
```

Example: `feat(button): [30min] new theme style`

## Type

Must be one of the following:

- **fix**: A bug fix
- **feat**: A new feature
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **docs**: Documentation only changes
- **lint**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, lint rules, etc)
- **chore**: Other changes that don't modify `src`
- **merge**: Merge branches, solve conflict, etc
- **release**: Release new version
