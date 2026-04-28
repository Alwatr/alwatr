import {describe, expect, test, beforeEach, afterEach} from 'bun:test';
import {EmbeddedDataCollector} from '@alwatr/embedded-data';
import {GlobalRegistrator} from '@happy-dom/global-registrator';

if (typeof document === 'undefined') {
  GlobalRegistrator.register();
}

describe('EmbeddedDataCollector', () => {
  beforeEach(() => {
    // Clean up any existing test script tags
    document.querySelectorAll('script[data-test]').forEach((el) => el.remove());
  });

  afterEach(() => {
    // Clean up after each test
    document.querySelectorAll('script[data-test]').forEach((el) => el.remove());
  });

  test('extracts and parses valid JSON from script tag', () => {
    const script = document.createElement('script');
    script.type = 'application/json';
    script.setAttribute('data-test', '');
    script.textContent = '{"userId": 42, "name": "Ali"}';
    document.body.appendChild(script);

    const collector = new EmbeddedDataCollector('data-test');
    const data = collector.collect();

    expect(data).toEqual({userId: 42, name: 'Ali'});
  });

  test('returns null when script tag is missing', () => {
    const collector = new EmbeddedDataCollector('data-missing');
    const data = collector.collect();

    expect(data).toBeNull();
  });

  test('returns null when script tag is empty', () => {
    const script = document.createElement('script');
    script.type = 'application/json';
    script.setAttribute('data-test', '');
    script.textContent = '';
    document.body.appendChild(script);

    const collector = new EmbeddedDataCollector('data-test');
    const data = collector.collect();

    expect(data).toBeNull();
  });

  test('returns null when JSON is invalid', () => {
    const script = document.createElement('script');
    script.type = 'application/json';
    script.setAttribute('data-test', '');
    script.textContent = '{invalid json}';
    document.body.appendChild(script);

    const collector = new EmbeddedDataCollector('data-test');
    const data = collector.collect();

    expect(data).toBeNull();
  });

  test('clears script tag content after extraction', () => {
    const script = document.createElement('script');
    script.type = 'application/json';
    script.setAttribute('data-test', '');
    script.textContent = '{"value": 123}';
    document.body.appendChild(script);

    const collector = new EmbeddedDataCollector('data-test');
    collector.collect();

    expect(script.textContent).toBe('');
  });

  test('validates data with type-guard', () => {
    const script = document.createElement('script');
    script.type = 'application/json';
    script.setAttribute('data-test', '');
    script.textContent = '{"userId": 42, "name": "Ali"}';
    document.body.appendChild(script);

    function isUser(data) {
      return (
        typeof data === 'object'
        && data !== null
        && 'userId' in data
        && typeof data.userId === 'number'
        && 'name' in data
        && typeof data.name === 'string'
      );
    }

    const collector = new EmbeddedDataCollector('data-test', isUser);
    const data = collector.collect();

    expect(data).toEqual({userId: 42, name: 'Ali'});
  });

  test('returns null when validation fails', () => {
    const script = document.createElement('script');
    script.type = 'application/json';
    script.setAttribute('data-test', '');
    script.textContent = '{"userId": "not-a-number"}';
    document.body.appendChild(script);

    function isUser(data) {
      return typeof data === 'object' && data !== null && 'userId' in data && typeof data.userId === 'number';
    }

    const collector = new EmbeddedDataCollector('data-test', isUser);
    const data = collector.collect();

    expect(data).toBeNull();
  });

  test('handles null as valid data', () => {
    const script = document.createElement('script');
    script.type = 'application/json';
    script.setAttribute('data-test', '');
    script.textContent = 'null';
    document.body.appendChild(script);

    const collector = new EmbeddedDataCollector('data-test');
    const data = collector.collect();

    expect(data).toBeNull();
  });

  test('handles arrays as valid data', () => {
    const script = document.createElement('script');
    script.type = 'application/json';
    script.setAttribute('data-test', '');
    script.textContent = '[1, 2, 3]';
    document.body.appendChild(script);

    const collector = new EmbeddedDataCollector('data-test');
    const data = collector.collect();

    expect(data).toEqual([1, 2, 3]);
  });
});
