import {describe, beforeEach, afterEach, it, expect, jest} from 'bun:test';
import {fetch, fetchJson, FetchError, httpStatusToErrorReason} from '@alwatr/fetch';

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

describe('@alwatr/fetch - Comprehensive Modern Suite', () => {
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

    it('should respect various HTTP methods (POST, PUT, DELETE, PATCH, HEAD)', async () => {
      const methods = ['POST', 'PUT', 'DELETE', 'PATCH', 'HEAD'];

      for (const method of methods) {
        mockFetch.mockResolvedValueOnce(createMockResponse({method}));

        const [response, error] = await fetch(`https://api.example.com/resource`, {
          method,
          bodyJson: method !== 'HEAD' ? {action: method.toLowerCase()} : undefined,
        });

        expect(error).toBeNull();
        expect(response?.ok).toBe(true);
        const callArgs = mockFetch.mock.calls[mockFetch.mock.calls.length - 1];
        expect(callArgs[1].method).toBe(method);
      }
    });

    it('should respect custom method and send JSON body with correct headers', async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse({deleted: true}));

      const [response, error] = await fetch('https://api.example.com/resource/123', {
        method: 'DELETE',
        bodyJson: {force: true},
      });

      expect(error).toBeNull();
      expect(response?.ok).toBe(true);
      const callArgs = mockFetch.mock.calls[0];
      expect(callArgs[1].method).toBe('DELETE');
      expect(callArgs[1].body).toBe(JSON.stringify({force: true}));
      expect(callArgs[1].headers['content-type']).toBe('application/json');
    });

    it('should merge custom headers with default headers', async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse({success: true}));

      await fetch('https://api.example.com/data', {
        headers: {
          'X-Custom-Header': 'custom-value',
        },
        bodyJson: {test: true},
      });

      const callArgs = mockFetch.mock.calls[0];
      expect(callArgs[1].headers['x-custom-header']).toBe('custom-value');
      expect(callArgs[1].headers['content-type']).toBe('application/json');
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

    it('should append query parameters to URL that ALREADY contains query parameters and hash', async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse({success: true}));

      const [response, error] = await fetch('https://api.example.com/items?sort=desc#results', {
        queryParams: {
          limit: 10,
          tag: ['tech', 'news'],
        },
      });

      expect(error).toBeNull();
      expect(response?.ok).toBe(true);
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/items?sort=desc&limit=10&tag=tech&tag=news#results',
        expect.any(Object),
      );
    });

    it('should force cacheStrategy to network_only when method is not GET or HEAD', async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse({created: true}));

      const [response, error] = await fetch('https://api.example.com/items', {
        method: 'POST',
        cacheStrategy: 'cache_first',
        bodyJson: {name: 'item1'},
      });

      expect(error).toBeNull();
      expect(response?.ok).toBe(true);
    });
  });

  describe('Authentication & Header Normalization & Isolation', () => {
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

    it('should support Web Standard Headers instance in options', async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse({ok: true}));

      const customHeaders = new Headers();
      customHeaders.set('X-Api-Key', 'my-secret-key');
      customHeaders.set('Accept-Language', 'fa-IR');

      await fetch('https://api.example.com/data', {
        headers: customHeaders,
      });

      const callArgs = mockFetch.mock.calls[0];
      expect(callArgs[1].headers['x-api-key']).toBe('my-secret-key');
      expect(callArgs[1].headers['accept-language']).toBe('fa-IR');
    });

    it('should support entries array in headers', async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse({ok: true}));

      await fetch('https://api.example.com/data', {
        headers: [['X-Trace-Id', 'trace-999']],
      });

      const callArgs = mockFetch.mock.calls[0];
      expect(callArgs[1].headers['x-trace-id']).toBe('trace-999');
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
      expect(callerHeaders['authorization']).toBeUndefined();
      expect(callerHeaders['content-type']).toBeUndefined();
    });

    it('should prevent header pollution across multiple requests with reused caller headers', async () => {
      mockFetch
        .mockResolvedValueOnce(createMockResponse({ok: true}))
        .mockResolvedValueOnce(createMockResponse({ok: true}));

      const callerHeaders = {'x-app-id': 'wesun'};

      await fetch('https://api.example.com/authed', {
        headers: callerHeaders,
        bearerToken: 'PRIVATE-TOKEN',
      });

      await fetch('https://api.thirdparty.com/public', {
        headers: callerHeaders,
      });

      const secondCallArgs = mockFetch.mock.calls[1];
      expect(secondCallArgs[1].headers.authorization).toBeUndefined();
      expect(secondCallArgs[1].headers['x-app-id']).toBe('wesun');
    });
  });

  describe('Granular Error Handling - Semantic HTTP Reasons', () => {
    const statusMap = [
      {status: 400, expectedReason: 'bad_request'},
      {status: 401, expectedReason: 'unauthorized'},
      {status: 403, expectedReason: 'forbidden'},
      {status: 404, expectedReason: 'not_found'},
      {status: 408, expectedReason: 'request_timeout'},
      {status: 409, expectedReason: 'conflict'},
      {status: 413, expectedReason: 'payload_too_large'},
      {status: 422, expectedReason: 'unprocessable_content'},
      {status: 429, expectedReason: 'rate_limited'},
      {status: 418, expectedReason: 'http_error'},
      {status: 500, expectedReason: 'server_error'},
      {status: 502, expectedReason: 'server_error'},
      {status: 503, expectedReason: 'server_error'},
      {status: 504, expectedReason: 'server_error'},
    ];

    for (const {status, expectedReason} of statusMap) {
      it(`should return [null, FetchError] with reason "${expectedReason}" for HTTP ${status}`, async () => {
        const errorData = {error: `Error ${status}`};
        const mockResponse = createMockResponse(errorData, {status, statusText: `Status ${status}`});
        mockFetch.mockResolvedValueOnce(mockResponse);

        const [response, error] = await fetch(`https://api.example.com/status/${status}`, {retry: 0});

        expect(response).toBeNull();
        expect(error).toBeInstanceOf(FetchError);
        expect(error?.reason).toBe(expectedReason);
        expect(error?.status).toBe(status);
        expect(error?.response?.status).toBe(status);
        expect(error?.data).toEqual(errorData);
        expect(error?.ok).toBe(false);
      });
    }

    it('should test httpStatusToErrorReason helper directly', () => {
      expect(httpStatusToErrorReason(400)).toBe('bad_request');
      expect(httpStatusToErrorReason(401)).toBe('unauthorized');
      expect(httpStatusToErrorReason(403)).toBe('forbidden');
      expect(httpStatusToErrorReason(404)).toBe('not_found');
      expect(httpStatusToErrorReason(408)).toBe('request_timeout');
      expect(httpStatusToErrorReason(409)).toBe('conflict');
      expect(httpStatusToErrorReason(413)).toBe('payload_too_large');
      expect(httpStatusToErrorReason(422)).toBe('unprocessable_content');
      expect(httpStatusToErrorReason(429)).toBe('rate_limited');
      expect(httpStatusToErrorReason(500)).toBe('server_error');
      expect(httpStatusToErrorReason(502)).toBe('server_error');
      expect(httpStatusToErrorReason(503)).toBe('server_error');
      expect(httpStatusToErrorReason(504)).toBe('server_error');
      expect(httpStatusToErrorReason(418)).toBe('http_error');
    });

    it('should parse non-JSON error response as plain text', async () => {
      const plainText = 'Bad Request - Validation Error';
      const mockResponse = createMockResponse(plainText, {status: 400, statusText: 'Bad Request'});
      mockFetch.mockResolvedValueOnce(mockResponse);

      const [response, error] = await fetch('https://api.example.com/bad', {retry: 0});

      expect(error).toBeInstanceOf(FetchError);
      expect(error?.reason).toBe('bad_request');
      expect(error?.data).toBe(plainText);
    });

    it('should handle empty error response body gracefully', async () => {
      const mockResponse = {
        ok: false,
        status: 404,
        statusText: 'Not Found',
        headers: new Headers(),
        text: jest.fn().mockResolvedValue(''),
        clone: function () {
          return this;
        },
      };
      mockFetch.mockResolvedValueOnce(mockResponse);

      const [response, error] = await fetch('https://api.example.com/empty', {retry: 0});

      expect(response).toBeNull();
      expect(error).toBeInstanceOf(FetchError);
      expect(error?.reason).toBe('not_found');
      expect(error?.data).toBeUndefined();
    });

    it('should handle malformed JSON in error response as raw string', async () => {
      const mockResponse = {
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        headers: new Headers(),
        text: jest.fn().mockResolvedValue('{invalid json'),
        clone: function () {
          return this;
        },
      };
      mockFetch.mockResolvedValueOnce(mockResponse);

      const [response, error] = await fetch('https://api.example.com/malformed', {retry: 0});

      expect(response).toBeNull();
      expect(error).toBeInstanceOf(FetchError);
      expect(error?.reason).toBe('server_error');
      expect(error?.data).toBe('{invalid json');
    });
  });

  describe('Error Handling - Network, Timeout & Abort', () => {
    it('should reject immediately if external signal is ALREADY aborted', async () => {
      const controller = new AbortController();
      controller.abort();

      const [response, error] = await fetch('https://api.example.com/data', {
        signal: controller.signal,
      });

      expect(response).toBeNull();
      expect(error).toBeInstanceOf(FetchError);
      expect(error?.reason).toBe('aborted');
      // Native fetch must not even be called when signal was pre-aborted
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('should return [null, FetchError] with reason "aborted" on mid-flight abort', async () => {
      const abortError = new Error('The user aborted a request');
      abortError.name = 'AbortError';
      mockFetch.mockRejectedValueOnce(abortError);

      const [response, error] = await fetch('https://api.example.com/data', {retry: 0});

      expect(response).toBeNull();
      expect(error).toBeInstanceOf(FetchError);
      expect(error?.reason).toBe('aborted');
    });

    it('should return [null, FetchError] for network failures', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network request failed'));

      const [response, error] = await fetch('https://api.example.com/data', {retry: 0});

      expect(response).toBeNull();
      expect(error).toBeInstanceOf(FetchError);
      expect(error?.reason).toBe('network_error');
      expect(error?.message).toBe('Network request failed');
    });

    it('should handle unknown non-Error string rejections', async () => {
      mockFetch.mockRejectedValueOnce('Unexpected string rejection');

      const [response, error] = await fetch('https://api.example.com/data', {retry: 0});

      expect(response).toBeNull();
      expect(error).toBeInstanceOf(FetchError);
      expect(error?.reason).toBe('unknown_error');
    });

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

  describe('Retry Engine', () => {
    it('should retry on 500 server error and eventually succeed', async () => {
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

    it('should retry on network error and eventually succeed', async () => {
      mockFetch
        .mockRejectedValueOnce(new Error('Network connection reset'))
        .mockResolvedValueOnce(createMockResponse({success: true}));

      const [response, error] = await fetch('https://api.example.com/flaky', {
        retry: 2,
        retryDelay: 10,
      });

      expect(error).toBeNull();
      expect(mockFetch).toHaveBeenCalledTimes(2);
    });

    it('should retry on 429 rate limited status and succeed', async () => {
      const error429 = createMockResponse({}, {status: 429});
      mockFetch.mockResolvedValueOnce(error429).mockResolvedValueOnce(createMockResponse({success: true}));

      const [response, error] = await fetch('https://api.example.com/limited', {
        retry: 2,
        retryDelay: 10,
      });

      expect(error).toBeNull();
      expect(response?.ok).toBe(true);
      expect(mockFetch).toHaveBeenCalledTimes(2);
    });

    it('should NOT retry on 401 or 404 client errors', async () => {
      const error404 = createMockResponse({error: 'Not Found'}, {status: 404});
      mockFetch.mockResolvedValueOnce(error404);

      const [response, error] = await fetch('https://api.example.com/missing', {
        retry: 3,
        retryDelay: 10,
      });

      expect(error).toBeInstanceOf(FetchError);
      expect(error?.reason).toBe('not_found');
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
      expect(error?.reason).toBe('server_error');
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

    it('should sanitize retry <= 0 to 1 attempt (no retries)', async () => {
      const error500 = createMockResponse({}, {status: 500});
      mockFetch.mockResolvedValue(error500);

      const [response, error] = await fetch('https://api.example.com/single-attempt', {
        retry: 0,
        retryDelay: 10,
      });

      expect(response).toBeNull();
      expect(error).toBeInstanceOf(FetchError);
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    it('should floor floating-point retry values (e.g. 2.9 to 2 attempts)', async () => {
      const error500 = createMockResponse({}, {status: 500});
      mockFetch.mockResolvedValue(error500);

      const [response, error] = await fetch('https://api.example.com/fractional-retry', {
        retry: 2.9,
        retryDelay: 10,
      });

      expect(response).toBeNull();
      expect(error).toBeInstanceOf(FetchError);
      expect(mockFetch).toHaveBeenCalledTimes(2);
    });

    it('should respect Retry-After header on 429 rate limited response', async () => {
      const error429 = createMockResponse({}, {
        status: 429,
        headers: {'retry-after': '0.01'},
      });
      mockFetch.mockResolvedValueOnce(error429).mockResolvedValueOnce(createMockResponse({success: true}));

      const startTime = Date.now();
      const [response, error] = await fetch('https://api.example.com/retry-after-test', {
        retry: 2,
        retryDelay: 500, // Should be overridden by Retry-After (10ms)
      });
      const elapsed = Date.now() - startTime;

      expect(error).toBeNull();
      expect(response?.ok).toBe(true);
      expect(mockFetch).toHaveBeenCalledTimes(2);
      expect(elapsed).toBeLessThan(400); // Confirms it used ~10ms from Retry-After, not 500ms
    });
  });

  describe('Duplicate Request Handling & Multi-Tenant Security', () => {
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

    it('should deduplicate based on method + URL + body', async () => {
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

      // Should be called 2 times: once for {id: 1}, once for {id: 2}
      expect(mockFetch).toHaveBeenCalledTimes(2);
    });

    it('should NOT merge requests if Authorization tokens differ (tenant isolation)', async () => {
      mockFetch
        .mockResolvedValueOnce(createMockResponse({user: 'alice'}))
        .mockResolvedValueOnce(createMockResponse({user: 'bob'}));

      const [res1, res2] = await Promise.all([
        fetch('https://api.example.com/profile', {
          bearerToken: 'token-alice',
          removeDuplicate: 'until_load',
        }),
        fetch('https://api.example.com/profile', {
          bearerToken: 'token-bob',
          removeDuplicate: 'until_load',
        }),
      ]);

      expect(mockFetch).toHaveBeenCalledTimes(2);
      expect(res1[0]?.ok).toBe(true);
      expect(res2[0]?.ok).toBe(true);
    });
  });

  describe('fetchJson Functionality & Generic Typing', () => {
    it('should parse JSON response and return [data, null]', async () => {
      const testData = {id: 42, name: 'Alice'};
      mockFetch.mockResolvedValueOnce(createMockResponse(testData));

      const [data, error] = await fetchJson('https://api.example.com/users/42');

      expect(error).toBeNull();
      expect(data).toEqual(testData);
    });

    it('should support array JSON responses with fetchJson', async () => {
      const list = [{id: '1'}, {id: '2'}];
      mockFetch.mockResolvedValueOnce(createMockResponse(list));

      const [data, error] = await fetchJson('https://api.example.com/items');

      expect(error).toBeNull();
      expect(data).toEqual(list);
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

    it('should forward semantic HTTP error in fetchJson', async () => {
      const errorPayload = {error: 'Unauthorized'};
      mockFetch.mockResolvedValueOnce(createMockResponse(errorPayload, {status: 401, statusText: 'Unauthorized'}));

      const [data, error] = await fetchJson('https://api.example.com/protected');

      expect(data).toBeNull();
      expect(error).toBeInstanceOf(FetchError);
      expect(error?.reason).toBe('unauthorized');
      expect(error?.data).toEqual(errorPayload);
    });
  });

  describe('Cache Strategies & Cache API Integration', () => {
    let mockCache;
    let mockCacheStorage;

    beforeEach(() => {
      mockCache = {
        match: jest.fn(),
        put: jest.fn().mockResolvedValue(undefined),
      };
      mockCacheStorage = {
        open: jest.fn().mockResolvedValue(mockCache),
      };
      // @ts-expect-error Mock global caches
      globalThis.caches = mockCacheStorage;
    });

    afterEach(() => {
      // @ts-expect-error Cleanup global caches
      delete globalThis.caches;
    });

    it('should serve from cache and avoid network call with cache_first when cached', async () => {
      const cachedData = {source: 'cache'};
      const cachedResponse = createMockResponse(cachedData);
      mockCache.match.mockResolvedValueOnce(cachedResponse);

      const [response, error] = await fetch('https://api.example.com/item', {
        cacheStrategy: 'cache_first',
      });

      expect(error).toBeNull();
      expect(response).toBe(cachedResponse);
      expect(mockCacheStorage.open).toHaveBeenCalledWith('fetch_cache');
      expect(mockCache.match).toHaveBeenCalled();
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('should fetch from network and populate cache with cache_first when cache misses', async () => {
      const networkData = {source: 'network'};
      const networkResponse = createMockResponse(networkData);
      mockCache.match.mockResolvedValueOnce(undefined);
      mockFetch.mockResolvedValueOnce(networkResponse);

      const [response, error] = await fetch('https://api.example.com/item', {
        cacheStrategy: 'cache_first',
      });

      expect(error).toBeNull();
      expect(response?.ok).toBe(true);
      expect(mockCache.match).toHaveBeenCalled();
      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockCache.put).toHaveBeenCalled();
    });

    it('should return cached response with cache_only when found', async () => {
      const cachedData = {source: 'cache_only_found'};
      const cachedResponse = createMockResponse(cachedData);
      mockCache.match.mockResolvedValueOnce(cachedResponse);

      const [response, error] = await fetch('https://api.example.com/offline-data', {
        cacheStrategy: 'cache_only',
      });

      expect(error).toBeNull();
      expect(response).toBe(cachedResponse);
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('should return cache_not_found error with cache_only when missing in cache', async () => {
      mockCache.match.mockResolvedValueOnce(undefined);

      const [response, error] = await fetch('https://api.example.com/missing-offline', {
        cacheStrategy: 'cache_only',
      });

      expect(response).toBeNull();
      expect(error).toBeInstanceOf(FetchError);
      expect(error?.reason).toBe('cache_not_found');
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('should fetch from network and update cache with network_first when network succeeds', async () => {
      const networkData = {source: 'fresh_network'};
      const networkResponse = createMockResponse(networkData);
      mockFetch.mockResolvedValueOnce(networkResponse);

      const [response, error] = await fetch('https://api.example.com/latest', {
        cacheStrategy: 'network_first',
      });

      expect(error).toBeNull();
      expect(response?.ok).toBe(true);
      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockCache.put).toHaveBeenCalled();
    });

    it('should fallback to cache with network_first when network request fails', async () => {
      const cachedData = {source: 'fallback_cache'};
      const cachedResponse = createMockResponse(cachedData);
      mockFetch.mockRejectedValueOnce(new Error('Network offline'));
      mockCache.match.mockResolvedValueOnce(cachedResponse);

      const [response, error] = await fetch('https://api.example.com/latest', {
        cacheStrategy: 'network_first',
        retry: 1,
      });

      expect(error).toBeNull();
      expect(response).toBe(cachedResponse);
    });

    it('should update cache and return fresh response with update_cache', async () => {
      const freshData = {updated: true};
      const freshResponse = createMockResponse(freshData);
      mockFetch.mockResolvedValueOnce(freshResponse);

      const [response, error] = await fetch('https://api.example.com/sync', {
        cacheStrategy: 'update_cache',
      });

      expect(error).toBeNull();
      expect(response?.ok).toBe(true);
      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockCache.put).toHaveBeenCalled();
    });

    it('should serve cached data immediately and revalidate in background with stale_while_revalidate', async () => {
      const cachedData = {version: 'v1_cached'};
      const cachedResponse = createMockResponse(cachedData);
      const freshData = {version: 'v2_fresh'};
      const freshResponse = createMockResponse(freshData);

      mockCache.match.mockResolvedValueOnce(cachedResponse);
      mockFetch.mockResolvedValueOnce(freshResponse);

      const revalidateCallback = jest.fn();

      const [response, error] = await fetch('https://api.example.com/feed', {
        cacheStrategy: 'stale_while_revalidate',
        revalidateCallback,
      });

      expect(error).toBeNull();
      expect(response).toBe(cachedResponse);
      expect(mockFetch).toHaveBeenCalledTimes(1);

      // Wait for revalidate microtask/timer to execute
      await new Promise((resolve) => setTimeout(resolve, 50));
      expect(revalidateCallback).toHaveBeenCalled();
      expect(mockCache.put).toHaveBeenCalled();
    });

    it('should safely fallback to network if caches.open throws', async () => {
      mockCacheStorage.open.mockRejectedValueOnce(new Error('Storage quota exceeded'));
      mockFetch.mockResolvedValueOnce(createMockResponse({fallback: true}));

      const [response, error] = await fetch('https://api.example.com/safe', {
        cacheStrategy: 'cache_first',
      });

      expect(error).toBeNull();
      expect(response?.ok).toBe(true);
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });
  });
});


