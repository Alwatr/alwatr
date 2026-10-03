# Alwatr Developer Kit (archived)

> [!IMPORTANT]
> This repository is archived and frozen at `v10.4.0`. Development continues as **Alwatr 11**.
> For documentation and the latest news, visit **[alwatr.dev](https://alwatr.dev)**.

## What was here

The `@alwatr/*` packages, 2019–2026: signals, actions, directives, a client FSM, the Loom/Weaver static
site toolchain, and a set of small ESM utilities. The published `10.x` versions stay on npm.

## Moving to Alwatr 11

Several packages were renamed or merged in Alwatr 11:

| 10.x                                      | Alwatr 11                                              |
| ----------------------------------------- | ------------------------------------------------------ |
| `@alwatr/flux`                            | `@alwatr/client`                                       |
| `@alwatr/core`, `@alwatr/node`            | `@alwatr/nanolib`, `@alwatr/nanolib/node`              |
| `@alwatr/has-own`, `@alwatr/deep-clone`   | removed — use `Object.hasOwn` and `structuredClone`    |
| `@alwatr/dedupe`                          | removed                                                |

Every other package keeps its name. See [alwatr.dev](https://alwatr.dev) for the current docs.

## License

[MIT](./LICENSE) © Ali Mihandoost
