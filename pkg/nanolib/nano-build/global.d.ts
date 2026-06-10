// Compile-time constants injected by nano-build (bun build --define).
// These tokens are replaced inline by the bundler at build time.
// They are NOT runtime globals — never access via globalThis.
// In unbundled contexts (tests, tsc), these resolve to their injected literal values.

declare const DEV_MODE: boolean;
declare const __package_name__: string;
declare const __package_version__: string;
