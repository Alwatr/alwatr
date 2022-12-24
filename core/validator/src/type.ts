export type schema = {
  [key: string]: schema | 'string' | 'number' | 'boolean';
}
