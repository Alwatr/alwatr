import type {L18eContext} from '@alwatr/type';

const i18r = (await import('../content/l18e-fa.json', {assert: {type: 'json'}}) as unknown as L18eContext).data;
export function message(key: Lowercase<string>): string {
  return i18r[key] ?? '...';
}
