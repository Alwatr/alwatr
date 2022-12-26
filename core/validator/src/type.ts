export type Schema = {
  [key: string]: Schema | 'string' | 'number' | 'boolean';
}
