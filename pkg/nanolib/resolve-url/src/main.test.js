import {describe, it, expect} from 'bun:test';
import {resolveUrl} from '@alwatr/resolve-url';

describe('@alwatr/resolve-url - resolveUrl', () => {
  it('should handle basic URL parts', () => {
    expect(resolveUrl('http://example.com', 'path', 'to', 'resource')).toBe('http://example.com/path/to/resource');
  });

  it('should handle multiple slashes in URL parts', () => {
    expect(resolveUrl('http://example.com', 'path//to///resource')).toBe('http://example.com/path/to/resource');
  });

  it('should handle leading slashes in URL parts', () => {
    expect(resolveUrl('/path/', '/to/', '/resource')).toBe('/path/to/resource');
  });

  it('should handle trailing slashes in URL parts', () => {
    expect(resolveUrl('path/', '/to/', '/resource/')).toBe('path/to/resource/');
  });

  it('should handle multiple slashes at the beginning and end of URL parts', () => {
    expect(resolveUrl('http://example.com', '///path', 'to', 'resource///')).toBe(
      'http://example.com/path/to/resource/',
    );
  });

  it('should preserve the protocol (http)', () => {
    expect(resolveUrl('http://example.com', 'path')).toBe('http://example.com/path');
  });

  it('should preserve the protocol (https)', () => {
    expect(resolveUrl('https://example.com', 'path')).toBe('https://example.com/path');
  });

  it('should handle URLs without a protocol', () => {
    expect(resolveUrl('example.com', 'path', 'to', 'resource')).toBe('example.com/path/to/resource');
  });
  it('should handle URLs without a protocol and with multiple slashes', () => {
    expect(resolveUrl('example.com//', '//path///', 'to', 'resource')).toBe('example.com/path/to/resource');
  });

  it('should handle an empty first part', () => {
    expect(resolveUrl('', 'path', 'to', 'resource')).toBe('path/to/resource');
  });
  it('should handle all empty parts', () => {
    expect(resolveUrl('', '', '')).toBe('');
  });

  it('should handle multiple empty parts', () => {
    expect(resolveUrl('http://example.com', '', 'path', '', 'resource')).toBe('http://example.com/path/resource');
  });

  it('should handle a single part URL', () => {
    expect(resolveUrl('http://example.com')).toBe('http://example.com');
  });
  it('should handle a single part URL with trailing slash', () => {
    expect(resolveUrl('http://example.com/')).toBe('http://example.com/');
  });

  it('should handle a single part without protocol', () => {
    expect(resolveUrl('example.com')).toBe('example.com');
  });

  it('should handle only slashes as input', () => {
    expect(resolveUrl('/', null, '/')).toBe('/');
  });

  it('should handle empty input', () => {
    expect(resolveUrl()).toBe('');
  });

  it('should handle a leading slash in the first part', () => {
    expect(resolveUrl('/root', 'sub', 'item')).toBe('/root/sub/item');
  });

  it('should handle relative paths', () => {
    expect(resolveUrl('path', 'to', 'resource')).toBe('path/to/resource');
  });

  it('should handle dot in relative paths', () => {
    expect(resolveUrl('path', '.', 'resource')).toBe('path/./resource');
  });

  it('should handle parts with special characters', () => {
    expect(resolveUrl('http://example.com', 'path with spaces', 'another-part')).toBe(
      'http://example.com/path with spaces/another-part',
    );
  });

  it('should handle parts with encoded characters', () => {
    //resolveURL should *not* decode.
    expect(resolveUrl('http://example.com', 'path%20with%20encoded')).toBe('http://example.com/path%20with%20encoded');
  });

  it('should handle parts with plus sign +', () => {
    //resolveURL should *not* decode.
    expect(resolveUrl('http://example.com', 'path+with+plus')).toBe('http://example.com/path+with+plus');
  });

  it('should handle already clean URL', () => {
    expect(resolveUrl('http://example.com/path/to/resource')).toBe('http://example.com/path/to/resource');
  });

  it('should handle complex url 2', () => {
    expect(resolveUrl('//no-protocol/', '/path////test/')).toBe('/no-protocol/path/test/');
  });

  // Tests moved from main.test.ts
  it('should resolve parts correctly', () => {
    expect(resolveUrl('a', 'b', 'c')).toBe('a/b/c');
    expect(resolveUrl('/a/', '/b/', '/c/')).toBe('/a/b/c/');
    expect(resolveUrl('a//b', '//c')).toBe('a/b/c');
    expect(resolveUrl('http://example.com', 'a')).toBe('http://example.com/a');
    expect(resolveUrl('http://example.com/', '/a/')).toBe('http://example.com/a/');
  });

  it('should handle empty parts', () => {
    expect(resolveUrl('a', '', 'c')).toBe('a/c');
    expect(resolveUrl('', 'b', 'c')).toBe('b/c');
    expect(resolveUrl('a', 'b', '')).toBe('a/b');
    expect(resolveUrl('', '', '')).toBe('');
  });

  it('should handle single part', () => {
    expect(resolveUrl('a')).toBe('a');
    expect(resolveUrl('/a/')).toBe('/a/');
    expect(resolveUrl('')).toBe('');
  });

  it('should handle no parts', () => {
    expect(resolveUrl()).toBe('');
  });

  it('should handle leading/trailing slashes correctly', () => {
    expect(resolveUrl('/a', 'b')).toBe('/a/b');
    expect(resolveUrl('a', '/b')).toBe('a/b');
    expect(resolveUrl('//a', 'b//')).toBe('/a/b/');
  });

  it('should handle protocol correctly', () => {
    expect(resolveUrl('https://example.com//', '//api/', '/v1')).toBe('https://example.com/api/v1');
    expect(resolveUrl('ftp://test.com', 'path')).toBe('ftp://test.com/path');
  });

  // Test case for the original error
  it('should handle null or undefined parts', () => {
    expect(resolveUrl('a', undefined, 'c')).toBe('a/c');
    expect(resolveUrl(null, 'b', 'c')).toBe('b/c');
    expect(resolveUrl('a', 'b', null)).toBe('a/b');
    expect(resolveUrl(undefined, undefined, undefined)).toBe('');
    expect(resolveUrl('/a', null, 'b', undefined, '/c/')).toBe('/a/b/c/');
  });
});
