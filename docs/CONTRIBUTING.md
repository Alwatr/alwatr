# Contributing to Alwatr projects

We would love for you to contribute to Alwatr projects and help make it even better than it is today!
As a contributor, here are the guidelines we would like you to follow:

## Code of Conduct

Help us keep Alwatr projects open and inclusive.
Please read and follow our [Code of Conduct](./CODE_OF_CONDUCT.md).

## Found a Bug?

If you find a bug in the source code, you can help us by _submitting an issue_ to our GitHub Repository.
Even better, you can _submit a Pull Request_ with a fix.

## Missing a Feature?

You can _request_ a new feature by _submitting an issue_ to our GitHub Repository.
After accepted issue, if you would like to _implement_ the feature, you can _submit a Pull Request_.

## Commit Message Format

[Follow The Conventional Commits specification](https://www.conventionalcommits.org/en/v1.0.0/)

```txt
<type>(<scope>): <short summary>
  │      │         │
  │      │         └─⫸ Summary in present tense. Not capitalized. No period at the end.
  │      │
  │      └─⫸ Commit Scope: PackageName|Concept (optional)
  │
  └─⫸ Commit Type: fix|feat|refactor|perf|docs|lint|chore|merge|release
```

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

## Example

```
feat(signal): support signal providers
```

### Commit message with description and breaking change footer

```
feat(api): allow provided config object to extend other configs

BREAKING CHANGE: `extends` key in config file is now used for extending other config files
```

### Commit message with ! to draw attention to breaking change

```
feat(api)!: send an email to the customer when a product is shipped
```
