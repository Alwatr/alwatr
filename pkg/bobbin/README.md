# `@alwatr/bobbin`

A declarative, zero-dependency, build-time data pipeline for fetching, validating, and caching external APIs into JSON files.

Part of the Alwatr framework, originally extracted from `@alwatr/loom` to provide a standalone caching mechanism for static assets and page content during build-time.

## Installation

This is a private monorepo package. In client workspaces:

```json
"devDependencies": {
  "@alwatr/bobbin": "workspace:*"
}
```

## API Usage

### 1. Defining a Source

A `Source` represents an external data endpoint (e.g. an API, Google Sheet, local file). It contains a name, a loader function, and an optional schema validator.

```typescript
import { defineSource } from "@alwatr/bobbin";

export interface Post {
  id: number;
  title: string;
}

export const postsSource = defineSource<Post>({
  name: "posts",
  load: async () => {
    const res = await fetch("https://api.example.com/posts");
    return res.json();
  },
  schema: (data): data is Post => {
    return Array.isArray(data) && data.every((item) => typeof item.id === "number");
  },
});
```

### 2. Defining a Configuration

A configuration groups one or more data sources and defines where to write the results.

```typescript
import { defineData } from "@alwatr/bobbin";
import { postsSource } from "./posts.source.js";

export const config = defineData({
  outDir: "src/data/.generated",
  sources: [postsSource],
  /**
   * Optional: minify the JSON files written to disk (removes whitespace/newlines).
   * By default, this is false and JSON outputs are pretty-printed with 2 spaces.
   */
  minify: true,
});
```

### 3. Building the Data

Trigger the data compilation script. Typically run once on checkout or when data updates.

```typescript
import { buildData } from "@alwatr/bobbin";
import { config } from "./config.js";

await buildData(config);
console.log("Data successfully fetched and written to disk!");
```

## License

MPL-2.0
