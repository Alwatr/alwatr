import {packageTracer} from '@alwatr/package-tracer';

__dev_mode__: packageTracer.add(__package_name__, __package_version__);

/**
 * Simple hash string for fast hashing (like md5).
 * This function is not very secure and should not be used for security purposes.
 * But it cannot ve reversed easily and brute force can take up to years for very fast computers.
 */
export function hashString(str: string | number, prefix: string, repeat = 3): string {
  let hash1 = 0xdeadbeef;
  let hash2 = 0x41c6ce57;

  if (typeof str === 'number') {
    str = str.toString();
  }

  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash1 = Math.imul(hash1 ^ char, 2654435761);
    hash2 = Math.imul(hash2 ^ char, 1597334677);
  }

  hash1 = Math.imul(hash1 ^ (hash1 >>> 16), 2246822507) ^ Math.imul(hash2 ^ (hash2 >>> 13), 3266489909);
  hash2 = Math.imul(hash2 ^ (hash2 >>> 16), 2246822507) ^ Math.imul(hash1 ^ (hash1 >>> 13), 3266489909);

  const result = prefix + (hash1 >>> 0).toString(36) + (hash2 >>> 0).toString(36);
  if (repeat === 1) {
    return result;
  }
  else {
    return hashString(result, prefix, repeat - 1);
  }
}

