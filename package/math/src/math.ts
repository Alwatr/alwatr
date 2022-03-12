if (typeof Number.isFinite !== 'function') {
  Number.isFinite = isFinite;
}

export function isNumber(value: unknown): boolean {
  if (typeof value === 'number') {
    return value - value === 0;
  }
  if (typeof value === 'string' && value.trim() !== '') {
    return Number.isFinite(+value);
  }
  return false;
}
