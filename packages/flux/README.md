# Flux - Elegant State Management and Event System

## Introduction

Flux empowers your applications with elegant and powerful state management and event handling capabilities. Built on the observable design pattern, Flux provides a lightweight yet robust foundation for managing global signals and states.

**Key Features:**

- **Intuitive State Management:** Embrace Flux as an advanced alternative to Redux or Recoil, minus the complexities and unnecessary overhead. Each signal maintains its own value, offering seamless state control.
- **Finite-State Machines (FSM):** Leverage observables to gracefully manage invocations and state transitions within your finite-state machines.
- **Server Context Management:** Effortlessly handle server-side context with Flux's elegant context manager, ensuring optimal organization and control.
- **Remote Context Management:** Manage remote context data with offline-first support and automatic revalidation.
- **Fetch State Machine:** Simplify state management for server requests with built-in support for fetch operations.

## Packages

### Core Packages

- **Observable:** Provides the core observable pattern implementation used throughout the Flux ecosystem. See [packages/observable](packages/observable) for more details.
- **Context:** A simple yet powerful TypeScript library for managing application context and facilitating efficient communication between components. See [packages/context](packages/context) for more details.
- **Signal:** A lightweight library for managing global signals and state changes. See [packages/signal](packages/signal) for more details.

### State Machines

- **FSM:** Core finite-state machine implementation. See [packages/fsm](packages/fsm) for more details.
- **FetchStateMachine:** Simplifies state management for server requests with built-in support for fetch operations. See [packages/fetch-state-machine](packages/fetch-state-machine) for more details.
- **RemoteContext:** Manages remote context data with offline-first support and automatic revalidation. See [packages/remote-context](packages/remote-context) for more details.

## Usage

Refer to the individual package READMEs for comprehensive usage instructions and examples.

## Sponsors

The following companies, organizations, and individuals support flux ongoing maintenance and development. Become a Sponsor to get your logo on our README and website.

[![Exir Studio](https://avatars.githubusercontent.com/u/181194967?s=200&v=4)](https://exirstudio.com)

### Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.

