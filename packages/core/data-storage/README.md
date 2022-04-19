# @data-storage

Enhanced file storage API written in tiny TypeScript, ES module.

## Example usage

```typescript
import {writeJsonFile, readJsonFile} from '@alwatr/storage/json.js';
await writeJsonFile('./file.json', { test: 'Every thing is ok' });
const json = await readJsonFile('./file.json');
console.log(json);
```
