import type {L18eContext} from '@alwatr/type';

export const i18r = (await import('../l18r/fa.json', {assert: {type: 'json'}}) as unknown as L18eContext).data;

export function message(key: Lowercase<string>): string {
  return i18r[key] ?? '...';
}

