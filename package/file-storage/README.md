# @file-storage

Enhanced file storage API written in tiny TypeScript, ES module.

## Example usage

```typescript
import {writeJsonFile, readJsonFile} from '@alwatr/storage/json.js';
await writeJsonFile(jsonAdders, { test: 'Every thing is ok' });
const json = await readJsonFile(jsonAdders);
console.log(json);
```
