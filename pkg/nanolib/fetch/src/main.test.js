import {describe, beforeEach, it, expect, jest} from 'bun:test';
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

describe('@alwatr/fetch - Modernized Architecture Suite', () => {
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
});
