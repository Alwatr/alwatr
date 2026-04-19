# AI Agent Instructions and Developer Guidelines

## ⚠️ 1. CRITICAL: Read Kiro Steering Documents First

This repository uses Kiro IDE Steering Documents located in the `.kiro/steering/` directory. These files contain the source of truth for our architecture, API usage, and coding standards.

**Your mandatory workflow:**

1. **Global Standards:** Before starting any task, you must read the core foundation files:
   - `.kiro/steering/product.md` (for product vision and user needs)
   - `.kiro/steering/tech.md` (for tech stack rules)
   - `.kiro/steering/structure.md` (for architectural patterns)
   - `.kiro/steering/styling.md` (for UI/UX guidelines)
   - `.kiro/steering/patterns.md` (for design patterns and best practices)
2. **Contextual Standards:** If the user asks you to modify a specific package within the monorepo (e.g., `packages/alwatr-fetch`), you MUST search for and read its corresponding steering document (e.g., `.kiro/steering/alwatr-fetch.md`) before generating code.

## Primary Directives

### 1. Code Quality & Scalability

- Write clean, modular, and exceptionally performant code.
- Anticipate cloud-native deployment environments. Code must be stateless where appropriate, optimized for high concurrency, and designed for minimal overhead.
- Avoid legacy patterns. When executing refactors, proactively upgrade legacy class structures and procedural logic to modern, idiomatic TypeScript.
- Ensure cross-platform compatibility (e.g., handle path resolutions and file system checks robustly across macOS, Linux, and Windows).

### 2. "Commenting for AI" & Developer Experience (DX)

- Strictly implement the "Commenting for AI" methodology. Leave clear, context-rich inline comments explaining the _intent_, _business logic_, and _why_ a specific approach was chosen.
- Design these comments as navigational anchors. They must help future AI agents instantly grasp the context and architecture without needing to scan the entire monorepo or file history.
- Ensure all technical documentation, PR descriptions, and inline comments are well-structured, fluent, and easy for LLMs to parse.

### 3. Output & Formatting Rules

- **Language:** ALL generated code, documentation, inline comments, markdown files, and commit messages MUST be written in fluent, clear English.
- **Chat responses:** All explanations, summaries, and conversational replies to the developer MUST be written in **Persian (Farsi)**.
- **Tone:** Assume a high level of senior technical expertise. Provide direct solutions and architectural insights. Do not over-explain basic programming concepts.
- **Completeness:** Output fully functional code blocks. Avoid skipping critical logic with generic placeholders unless explicitly instructed to draft a high-level structure.

### 4. Design Principles

Apply these principles to every implementation decision — in TypeScript, Nunjucks templates, CSS, and architecture alike:

- **DRY (Don't Repeat Yourself):** Never duplicate logic or markup. Extract shared behavior into utilities, partials, base classes, or signals. If the same pattern appears twice, it belongs in a shared abstraction.

- **KISS (Keep It Simple, Stupid):** Prefer the simplest solution that correctly solves the problem. Avoid clever abstractions, over-engineering, or premature optimization. Simple code is easier to debug, review, and extend.

- **YAGNI (You Aren't Gonna Need It):** Only implement what is explicitly required right now. Do not add configuration options, extension points, or features "just in case." Remove speculative code.

- **Separation of Concerns:** Keep distinct responsibilities in distinct places — business logic in services, state in signals, presentation in templates/directives, styles in `_windstyle`. Never mix these layers.

- **Single Responsibility Principle:** Each class, directive, service, template, or function should do exactly one thing. If a unit needs an "and" to describe what it does, split it.

- **Open/Closed Principle:** Design components and services to be extended through composition (new directives, new signals, new modifiers) rather than modified. Existing, working code should rarely need to change to accommodate new features.
