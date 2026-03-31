# @alwatr/yarn-upgrade

A zero-dependency CLI tool to automate common Yarn maintenance tasks. This utility streamlines the process of upgrading dependencies, fixing version inconsistencies, and ensuring your project is up-to-date with a single command.

It is designed to be run in any Yarn project without requiring any pre-installed dependencies like `syncpack`, as they are bundled with this tool.

## Features

- Updates Yarn to the latest version.
- Provides an interactive interface to upgrade main dependencies.
- Recursively upgrades all packages, including scoped ones.
- Lints and fixes package version inconsistencies using its internal `syncpack` dependency.
- Deduplicates entries in the `yarn.lock` file.
- Updates Yarn's SDKs for IDEs like VS Code.
- Organize package.json files according to a conventional format.

## Usage

Navigate to the root directory of your Yarn project and run the following command:

```bash
yarn dlx @alwatr/yarn-upgrade
```

Alternatively, you can use `npx`:

```bash
npx @alwatr/yarn-upgrade
```

### Local Installation

```bash
yarn add -D @alwatr/yarn-upgrade
```

Now you can run the tool using:

```bash
yarn upd
```

## Execution Steps

The script will execute the following sequence of commands on your project:

- `yarn set version latest`
- `yarn upgrade-interactive`
- `yarn up "@*/*" "*" --recursive`
- `yarn dlx @yarnpkg/sdks vscode`
- `yarn dedupe`
- `yarn syncpack format`
- `yarn syncpack fix`
- `yarn syncpack lint --sort count`

## Contributing

We welcome contributions to improve this package\! Feel free to open bug reports, suggest new features, or submit pull requests following our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md).

## Sponsors

The following companies, organizations, and individuals support Nanolib ongoing maintenance and development. Become a Sponsor to get your logo on our README and website.
