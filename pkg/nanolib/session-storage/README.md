# Alwatr Session Storage Provider

A modern, simple, and robust solution for managing JSON objects in the browser's `sessionStorage`. This package provides a clean, class-based API with a factory function to ensure your application's data persistence is safe and maintainable within a single browser tab or window.

[](https://www.npmjs.com/package/@alwatr/session-storage)

## Core Concepts

This library is built upon a few simple but powerful concepts:

1. **Provider Pattern**: Instead of using static functions, you create an _instance_ of a `SessionStorageProvider` for each unique data item you want to manage. This instance is configured once with a name and then used to interact with that specific item.

2. **Static Existence Check**: The static method `SessionStorageProvider.has()` allows you to check if data exists _before_ creating a provider instance. This is highly efficient for scenarios where you only need to know if the data is present, without needing the data itself.

3. **Facade Factory Function**: The `createSessionStorageProvider` function acts as a clean entry point (Facade) to the library. This simplifies the API and decouples your code from the internal class implementation.

## Installation

```bash
# Using yarn
yarn add @alwatr/session-storage

# Using npm
npm install @alwatr/session-storage
