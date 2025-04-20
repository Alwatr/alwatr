import {packageTracer} from '@alwatr/package-tracer';

__dev_mode__: packageTracer.add(__package_name__, __package_version__);

export function resolveUrl(...parts: string[]): string {
  parts = parts.filter((part: string): part is string => typeof part === 'string' && part.length > 0);

  if (parts.length === 0) {
    return '';
  }

  const leadingSlashes = /^\/+/;
  const trailingSlashes = /\/+$/;
  const multipleSlashes = /\/{2,}/g;

  const prefix = parts[0].indexOf('/') === 0 ? '/' : ''; // Add leading slash if the first part has it

  return (
    prefix +
    parts
      .map((part) => part.replace(leadingSlashes, '').replace(trailingSlashes, '')) // Remove leading and trailing slashes
      .filter((part) => part) // Remove empty parts
      .join('/')
      // Replace multiple slashes with a single slash, except for protocol
      .replace('://', '{{PROTOCOL_SLASH}}')
      .replace(multipleSlashes, '/')
      .replace('{{PROTOCOL_SLASH}}', '://')
  );
}

