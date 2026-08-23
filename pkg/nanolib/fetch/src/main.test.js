import {describe, beforeEach, it, expect, jest} from 'bun:test';
import {fetch, fetchJson, FetchError} from '@alwatr/fetch';

// Mock global fetch
const mockFetch = jest.fn();
// @ts-expect-error type mismatch for global fetch
global.fetch = mockFetch;

// Mock global navigator for offline tests
Object.defineProperty(globalThis, 'navigator', {
  configurable: true,
  writable: true,
  value: {onLine: true},
});

/**
 * Helper to create mock Response
 * @param {unknown} data
 * @param {{status?: number; statusText?: string; headers?: Record<string, string>}} options
 */
function createMockResponse(data, options = {}) {
  const {status = 200, statusText = 'OK', headers = {}} = options;
  const bodyText = typeof data === 'string' ? data : JSON.stringify(data);
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText,
    headers: new Headers(headers),
    json: jest.fn().mockResolvedValue(data),
    text: jest.fn().mockResolvedValue(bodyText),
    clone: function () {
      return createMockResponse(data, options);
    },
  };
}

describe('@alwatr/fetch - Comprehensive Current Contract Suite', () => {
  beforeEach(() => {
    mockFetch.mockClear();
    // @ts-expect-error 'onLine' is a read-only property
    global.navigator.onLine = true;
  });

  describe('Basic HTTP Methods & Payload Handling', () => {
    it('should perform successful GET request and return [response, null]', async () => {
      const mockData = {message: 'success'};
      mockFetch.mockResolvedValueOnce(createMockResponse(mockData));

      const [response, error] = await fetch('https://api.example.com/data');

      expect(error).toBeNull();
      expect(response).toBeDefined();
      expect(response?.ok).toBe(true);
      expect(response?.status).toBe(200);
      expect(await response?.json()).toEqual(mockData);
    });

    it('should respect various HTTP methods (POST, PUT, DELETE, PATCH)', async () => {
      const methods = ['POST', 'PUT', 'DELETE', 'PATCH'];

      for (const method of methods) {
        mockFetch.mockResolvedValueOnce(createMockResponse({method}));

        const [response, error] = await fetch(`https://api.example.com/resource`, {
          method,
          bodyJson: {action: method.toLowerCase()},
        });

        expect(error).toBeNull();
        expect(response?.ok).toBe(true);
        const callArgs = mockFetch.mock.calls[mockFetch.mock.calls.length - 1];
        expect(callArgs[1].method).toBe(method);
        expect(callArgs[1].body).toBe(JSON.stringify({action: method.toLowerCase()}));
        expect(callArgs[1].headers['content-type']).toBe('application/json');
      }
    });

    it('should handle query parameters correctly with encoding and types', async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse({success: true}));

      const [response, error] = await fetch('https://api.example.com/search', {
        queryParams: {
          q: 'test query & special=true',
          page: 2,
          active: true,
        },
      });

      expect(error).toBeNull();
      expect(response?.ok).toBe(true);
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/search?q=test%20query%20%26%20special%3Dtrue&page=2&active=true',
        expect.any(Object),
      );
    });
  });

  describe('Authentication & Header Isolation', () => {
    it('should add Bearer token to Authorization header', async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse({authenticated: true}));

      await fetch('https://api.example.com/secure', {
        bearerToken: 'test-token-123',
      });

      const callArgs = mockFetch.mock.calls[0];
      expect(callArgs[1].headers.authorization).toBe('Bearer test-token-123');
    });

    it('should add Alwatr auth to Authorization header', async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse({authenticated: true}));

      await fetch('https://api.example.com/secure', {
        alwatrAuth: {
          userId: 'user123',
          userToken: 'token456',
        },
      });

      const callArgs = mockFetch.mock.calls[0];
      expect(callArgs[1].headers.authorization).toBe('Alwatr user123:token456');
    });

    it('should never leak authorization or headers into subsequent requests', async () => {
      mockFetch
        .mockResolvedValueOnce(createMockResponse({ok: true}))
        .mockResolvedValueOnce(createMockResponse({ok: true}));

      await fetch('https://api.example.com/first', {
        bearerToken: 'SUPER-SECRET',
      });

      await fetch('https://api.example.com/second');

      const firstCallArgs = mockFetch.mock.calls[0];
      const secondCallArgs = mockFetch.mock.calls[1];

      expect(firstCallArgs[1].headers.authorization).toBe('Bearer SUPER-SECRET');
      expect(secondCallArgs[1].headers.authorization).toBeUndefined();
    });

    it('should not mutate caller-supplied headers object', async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse({ok: true}));

      const callerHeaders = {'x-app-id': 'grand.market'};
      await fetch('https://api.example.com/secure', {
        headers: callerHeaders,
        bearerToken: 'SECRET-TOKEN',
        bodyJson: {test: 123},
      });

      expect(callerHeaders).toEqual({'x-app-id': 'grand.market'});
      expect(callerHeaders.authorization).toBeUndefined();
      expect(callerHeaders['content-type']).toBeUndefined();
    });
  });

  describe('Error Handling - HTTP Status Codes', () => {
    it('should return [null, FetchError] for 404 error and parse JSON error body', async () => {
      const errorData = {error: 'Not Found', code: 404};
      const mockResponse = createMockResponse(errorData, {status: 404, statusText: 'Not Found'});
      mockFetch.mockResolvedValueOnce(mockResponse);

      const [response, error] = await fetch('https://api.example.com/missing');

      expect(response).toBeNull();
      expect(error).toBeInstanceOf(FetchError);
      expect(error?.reason).toBe('http_error');
      expect(error?.response?.status).toBe(404);
      expect(error?.data).toEqual(errorData);
    });

    it('should return [null, FetchError] for 500 server error', async () => {
      const errorData = {error: 'Internal Server Error'};
      const mockResponse = createMockResponse(errorData, {status: 500, statusText: 'Internal Server Error'});
      mockFetch.mockResolvedValueOnce(mockResponse);

      const [response, error] = await fetch('https://api.example.com/error', {retry: 0});

      expect(response).toBeNull();
      expect(error).toBeInstanceOf(FetchError);
      expect(error?.reason).toBe('http_error');
      expect(error?.response?.status).toBe(500);
      expect(error?.data).toEqual(errorData);
    });

    it('should parse non-JSON error response as plain text', async () => {
      const plainText = 'Bad Request - Validation Error';
      const mockResponse = createMockResponse(plainText, {status: 400, statusText: 'Bad Request'});
      mockFetch.mockResolvedValueOnce(mockResponse);

      const [response, error] = await fetch('https://api.example.com/bad');

      expect(error).toBeInstanceOf(FetchError);
      expect(error?.data).toBe(plainText);
    });

    it('should handle empty error body gracefully', async () => {
      const mockResponse = createMockResponse('', {status: 404, statusText: 'Not Found'});
      mockFetch.mockResolvedValueOnce(mockResponse);

      const [response, error] = await fetch('https://api.example.com/empty', {retry: 0});

      expect(error).toBeInstanceOf(FetchError);
      expect(error?.data).toBeUndefined();
    });

    it('should handle malformed JSON in error body as string', async () => {
      const rawText = '{invalid-json';
      const mockResponse = createMockResponse(rawText, {status: 500, statusText: 'Error'});
      mockFetch.mockResolvedValueOnce(mockResponse);

      const [response, error] = await fetch('https://api.example.com/malformed', {retry: 0});

      expect(error).toBeInstanceOf(FetchError);
      expect(error?.data).toBe(rawText);
    });
  });

  describe('Error Handling - Network & Abort', () => {
    it('should return [null, FetchError] for network failures', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network request failed'));

      const [response, error] = await fetch('https://api.example.com/data', {retry: 0});

      expect(response).toBeNull();
      expect(error).toBeInstanceOf(FetchError);
      expect(error?.reason).toBe('network_error');
      expect(error?.message).toBe('Network request failed');
    });

    it('should return [null, FetchError] with reason "aborted" on AbortError', async () => {
      const abortError = new Error('The user aborted a request');
      abortError.name = 'AbortError';
      mockFetch.mockRejectedValueOnce(abortError);

      const [response, error] = await fetch('https://api.example.com/data', {retry: 0});

      expect(response).toBeNull();
      expect(error).toBeInstanceOf(FetchError);
      expect(error?.reason).toBe('aborted');
    });

    it('should handle unknown non-Error rejections', async () => {
      mockFetch.mockRejectedValueOnce('Unexpected string rejection');

      const [response, error] = await fetch('https://api.example.com/data', {retry: 0});

      expect(response).toBeNull();
      expect(error).toBeInstanceOf(FetchError);
      expect(error?.reason).toBe('unknown_error');
    });
  });

  describe('Timeout Handling', () => {
    it('should timeout and return FetchError with reason "timeout"', async () => {
      let timeoutId;
      mockFetch.mockImplementation(
        () =>
          new Promise((resolve) => {
            timeoutId = setTimeout(() => resolve(createMockResponse({data: 'late'})), 1000);
          }),
      );

      const [response, error] = await fetch('https://api.example.com/slow', {
        timeout: 10,
        retry: 1,
      });

      expect(response).toBeNull();
      expect(error).toBeInstanceOf(FetchError);
      expect(error?.reason).toBe('timeout');
      clearTimeout(timeoutId);
    });

    it('should not timeout when timeout is set to 0', async () => {
      mockFetch.mockImplementation(
        () =>
          new Promise((resolve) => {
            setTimeout(() => resolve(createMockResponse({data: 'success'})), 20);
          }),
      );

      const [response, error] = await fetch('https://api.example.com/data', {
        timeout: 0,
      });

      expect(error).toBeNull();
      expect(response?.ok).toBe(true);
    });
  });

  describe('Retry Pattern', () => {
    it('should retry on 500 error and eventually succeed', async () => {
      const error500 = createMockResponse({}, {status: 500});
      mockFetch
        .mockResolvedValueOnce(error500)
        .mockResolvedValueOnce(error500)
        .mockResolvedValueOnce(createMockResponse({success: true}));

      const [response, error] = await fetch('https://api.example.com/flaky', {
        retry: 3,
        retryDelay: 10,
      });

      expect(error).toBeNull();
      expect(response?.ok).toBe(true);
      expect(mockFetch).toHaveBeenCalledTimes(3);
    });

    it('should retry on network error and succeed', async () => {
      mockFetch
        .mockRejectedValueOnce(new Error('Connection reset'))
        .mockResolvedValueOnce(createMockResponse({success: true}));

      const [response, error] = await fetch('https://api.example.com/flaky', {
        retry: 2,
        retryDelay: 10,
      });

      expect(error).toBeNull();
      expect(mockFetch).toHaveBeenCalledTimes(2);
    });

    it('should NOT retry on 4xx client errors', async () => {
      const error400 = createMockResponse({error: 'Bad Request'}, {status: 400});
      mockFetch.mockResolvedValueOnce(error400);

      const [response, error] = await fetch('https://api.example.com/bad', {
        retry: 3,
        retryDelay: 10,
      });

      expect(error).toBeInstanceOf(FetchError);
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    it('should fail after all retries are exhausted', async () => {
      const error500 = createMockResponse({}, {status: 500});
      mockFetch.mockResolvedValue(error500);

      const [response, error] = await fetch('https://api.example.com/always-fails', {
        retry: 2,
        retryDelay: 10,
      });

      expect(response).toBeNull();
      expect(error).toBeInstanceOf(FetchError);
      expect(mockFetch).toHaveBeenCalledTimes(2);
    });

    it('should skip retries when offline', async () => {
      // @ts-expect-error 'onLine' is a read-only property
      global.navigator.onLine = false;
      const error500 = createMockResponse({}, {status: 500});
      mockFetch.mockResolvedValue(error500);

      const [response, error] = await fetch('https://api.example.com/fails', {
        retry: 3,
        retryDelay: 10,
      });

      expect(error).toBeInstanceOf(FetchError);
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });
  });

  describe('Duplicate Request Handling', () => {
    it('should deduplicate parallel requests with "until_load"', async () => {
      mockFetch.mockResolvedValue(createMockResponse({data: 'shared'}));

      const results = await Promise.all([
        fetch('https://api.example.com/data', {removeDuplicate: 'until_load'}),
        fetch('https://api.example.com/data', {removeDuplicate: 'until_load'}),
        fetch('https://api.example.com/data', {removeDuplicate: 'until_load'}),
      ]);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(results).toHaveLength(3);
      results.forEach(([response, error]) => {
        expect(error).toBeNull();
        expect(response?.ok).toBe(true);
      });
    });

    it('should NOT deduplicate when "never" is specified', async () => {
      mockFetch.mockResolvedValue(createMockResponse({data: 'individual'}));

      const results = await Promise.all([
        fetch('https://api.example.com/data', {removeDuplicate: 'never'}),
        fetch('https://api.example.com/data', {removeDuplicate: 'never'}),
      ]);

      expect(mockFetch).toHaveBeenCalledTimes(2);
    });

    it('should differentiate requests by method, URL, and body', async () => {
      mockFetch.mockResolvedValue(createMockResponse({data: 'result'}));

      await Promise.all([
        fetch('https://api.example.com/data', {
          method: 'POST',
          bodyJson: {id: 1},
          removeDuplicate: 'until_load',
        }),
        fetch('https://api.example.com/data', {
          method: 'POST',
          bodyJson: {id: 1},
          removeDuplicate: 'until_load',
        }),
        fetch('https://api.example.com/data', {
          method: 'POST',
          bodyJson: {id: 2},
          removeDuplicate: 'until_load',
        }),
      ]);

      expect(mockFetch).toHaveBeenCalledTimes(2);
    });
  });

  describe('fetchJson Functionality', () => {
    it('should parse JSON response and return [data, null]', async () => {
      const testData = {id: 42, name: 'Alice', active: true};
      mockFetch.mockResolvedValueOnce(createMockResponse(testData));

      const [data, error] = await fetchJson('https://api.example.com/users/42');

      expect(error).toBeNull();
      expect(data).toEqual(testData);
    });

    it('should return json_parse_error on empty response body', async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse(''));

      const [data, error] = await fetchJson('https://api.example.com/empty');

      expect(data).toBeNull();
      expect(error).toBeInstanceOf(FetchError);
      expect(error?.reason).toBe('json_parse_error');
    });

    it('should return json_parse_error on invalid JSON response body', async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse('{not-json-at-all'));

      const [data, error] = await fetchJson('https://api.example.com/invalid');

      expect(data).toBeNull();
      expect(error).toBeInstanceOf(FetchError);
      expect(error?.reason).toBe('json_parse_error');
    });

    it('should pass requireJsonResponseWithOkTrue when ok is true', async () => {
      const validPayload = {ok: true, result: 'all good'};
      mockFetch.mockResolvedValueOnce(createMockResponse(validPayload));

      const [data, error] = await fetchJson('https://api.example.com/command', {
        requireJsonResponseWithOkTrue: true,
      });

      expect(error).toBeNull();
      expect(data).toEqual(validPayload);
    });

    it('should return json_response_error when requireJsonResponseWithOkTrue is true but ok is false', async () => {
      const failPayload = {ok: false, error: 'invalid_credentials'};
      mockFetch.mockResolvedValueOnce(createMockResponse(failPayload));

      const [data, error] = await fetchJson('https://api.example.com/command', {
        requireJsonResponseWithOkTrue: true,
      });

      expect(data).toBeNull();
      expect(error).toBeInstanceOf(FetchError);
      expect(error?.reason).toBe('json_response_error');
      expect(error?.data).toEqual(failPayload);
    });

    it('should forward HTTP error in fetchJson', async () => {
      const errorPayload = {error: 'Unauthorized'};
      mockFetch.mockResolvedValueOnce(createMockResponse(errorPayload, {status: 401, statusText: 'Unauthorized'}));

      const [data, error] = await fetchJson('https://api.example.com/protected');

      expect(data).toBeNull();
      expect(error).toBeInstanceOf(FetchError);
      expect(error?.data).toEqual(errorPayload);
    });
  });
});
