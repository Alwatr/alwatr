import {describe, beforeEach, it, expect, jest} from '@jest/globals';
import {fetch, FetchError} from '@alwatr/fetch';

// Mock global fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Helper to create mock Response
function createMockResponse(data, options = {}) {
  const {status = 200, statusText = 'OK', headers = {}} = options;
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText,
    headers: new Headers(headers),
    json: async () => data,
    text: async () => JSON.stringify(data),
    clone: function () {
      return this;
    },
  };
}

describe('@alwatr/fetch', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  describe('Successful requests', () => {
    it('should return [response, null] on successful GET request', async () => {
      const mockData = {message: 'success'};
      mockFetch.mockResolvedValueOnce(createMockResponse(mockData));

      const [response, error] = await fetch('https://api.example.com/data');

      expect(error).toBeNull();
      expect(response).toBeDefined();
      expect(response.ok).toBe(true);
      expect(response.status).toBe(200);
      expect(await response.json()).toEqual(mockData);
    });

    it('should handle query parameters correctly', async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse({success: true}));

      const [response, error] = await fetch('https://api.example.com/search', {
        queryParams: {
          q: 'test query',
          page: 2,
          active: true,
        },
      });

      expect(error).toBeNull();
      expect(mockFetch).toHaveBeenCalledWith('https://api.example.com/search?q=test%20query&page=2&active=true', expect.any(Object));
    });

    it('should send JSON body with correct headers', async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse({received: true}));

      const bodyData = {name: 'test', value: 123};
      const [response, error] = await fetch('https://api.example.com/data', {
        method: 'POST',
        bodyJson: bodyData,
      });

      expect(error).toBeNull();
      const callArgs = mockFetch.mock.calls[0];
      expect(callArgs[1].body).toBe(JSON.stringify(bodyData));
      expect(callArgs[1].headers['content-type']).toBe('application/json');
    });

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
  });

  describe('Error handling - HTTP errors', () => {
    it('should return [null, FetchError] for 404 error', async () => {
      const errorData = {error: 'Not Found'};
      mockFetch.mockResolvedValueOnce(createMockResponse(errorData, {status: 404, statusText: 'Not Found'}));

      const [response, error] = await fetch('https://api.example.com/missing');

      expect(response).toBeNull();
      expect(error).toBeInstanceOf(FetchError);
      expect(error.reason).toBe('http_error');
      expect(error.response.status).toBe(404);
      expect(error.data).toEqual(errorData);
    });

    it('should return [null, FetchError] for 500 server error', async () => {
      mockFetch.mockResolvedValueOnce(
        createMockResponse({error: 'Internal Server Error'}, {status: 500, statusText: 'Internal Server Error'}),
      );

      const [response, error] = await fetch('https://api.example.com/error');

      expect(response).toBeNull();
      expect(error).toBeInstanceOf(FetchError);
      expect(error.reason).toBe('http_error');
      expect(error.response.status).toBe(500);
    });

    it('should parse non-JSON error response as text', async () => {
      const mockResponse = {
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        headers: new Headers(),
        text: async () => 'Plain text error message',
        clone: function () {
          return this;
        },
      };
      mockFetch.mockResolvedValueOnce(mockResponse);

      const [response, error] = await fetch('https://api.example.com/bad');

      expect(error).toBeInstanceOf(FetchError);
      expect(error.data).toBe('Plain text error message');
    });
  });

  describe('Error handling - Network errors', () => {
    it('should return [null, FetchError] for network failure', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network request failed'));

      const [response, error] = await fetch('https://api.example.com/data');

      expect(response).toBeNull();
      expect(error).toBeInstanceOf(FetchError);
      expect(error.reason).toBe('network_error');
      expect(error.message).toBe('Network request failed');
    });

    it('should return [null, FetchError] for aborted request', async () => {
      const abortError = new Error('The operation was aborted');
      abortError.name = 'AbortError';
      mockFetch.mockRejectedValueOnce(abortError);

      const [response, error] = await fetch('https://api.example.com/data');

      expect(response).toBeNull();
      expect(error).toBeInstanceOf(FetchError);
      expect(error.reason).toBe('aborted');
    });

    it('should handle unknown errors', async () => {
      mockFetch.mockRejectedValueOnce('Unknown error type');

      const [response, error] = await fetch('https://api.example.com/data');

      expect(response).toBeNull();
      expect(error).toBeInstanceOf(FetchError);
      expect(error.reason).toBe('unknown_error');
    });
  });

  describe('Timeout handling', () => {
    it('should timeout and return FetchError with reason "timeout"', async () => {
      mockFetch.mockImplementationOnce(
        () =>
          new Promise((resolve) => {
            setTimeout(() => resolve(createMockResponse({data: 'too late'})), 2000);
          }),
      );

      const [response, error] = await fetch('https://api.example.com/slow', {
        timeout: 100,
        retry: 0,
      });

      expect(response).toBeNull();
      expect(error).toBeInstanceOf(FetchError);
      expect(error.reason).toBe('timeout');
    });

    it('should not timeout when timeout is 0', async () => {
      mockFetch.mockImplementationOnce(
        () =>
          new Promise((resolve) => {
            setTimeout(() => resolve(createMockResponse({data: 'success'})), 100);
          }),
      );

      const [response, error] = await fetch('https://api.example.com/data', {
        timeout: 0,
      });

      expect(error).toBeNull();
      expect(response).toBeDefined();
    });
  });

  describe('Retry pattern', () => {
    it('should retry on 500 error and eventually succeed', async () => {
      mockFetch
        .mockResolvedValueOnce(createMockResponse({}, {status: 500}))
        .mockResolvedValueOnce(createMockResponse({}, {status: 500}))
        .mockResolvedValueOnce(createMockResponse({success: true}));

      const [response, error] = await fetch('https://api.example.com/flaky', {
        retry: 3,
        retryDelay: 10,
      });

      expect(error).toBeNull();
      expect(response.ok).toBe(true);
      expect(mockFetch).toHaveBeenCalledTimes(3);
    });

    it('should retry on network error', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error')).mockResolvedValueOnce(createMockResponse({success: true}));

      const [response, error] = await fetch('https://api.example.com/flaky', {
        retry: 2,
        retryDelay: 10,
      });

      expect(error).toBeNull();
      expect(mockFetch).toHaveBeenCalledTimes(2);
    });

    it('should not retry 4xx errors', async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse({error: 'Bad Request'}, {status: 400}));

      const [response, error] = await fetch('https://api.example.com/bad', {
        retry: 3,
        retryDelay: 10,
      });

      expect(error).toBeInstanceOf(FetchError);
      expect(error.reason).toBe('http_error');
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    it('should fail after all retries exhausted', async () => {
      mockFetch.mockResolvedValue(createMockResponse({}, {status: 500}));

      const [response, error] = await fetch('https://api.example.com/always-fails', {
        retry: 2,
        retryDelay: 10,
      });

      expect(response).toBeNull();
      expect(error).toBeInstanceOf(FetchError);
      expect(error.reason).toBe('http_error');
      expect(mockFetch).toHaveBeenCalledTimes(2);
    });
  });

  describe('Duplicate request handling', () => {
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
        expect(response.ok).toBe(true);
      });
    });

    it('should NOT deduplicate when "never" is used', async () => {
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
  });

  describe('Edge cases', () => {
    it('should handle empty response body', async () => {
      const mockResponse = {
        ok: false,
        status: 404,
        statusText: 'Not Found',
        headers: new Headers(),
        text: async () => '',
        clone: function () {
          return this;
        },
      };
      mockFetch.mockResolvedValueOnce(mockResponse);

      const [response, error] = await fetch('https://api.example.com/empty');

      expect(error).toBeInstanceOf(FetchError);
      expect(error.data).toBeUndefined();
    });

    it('should handle malformed JSON in error response', async () => {
      const mockResponse = {
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        headers: new Headers(),
        text: async () => '{invalid json',
        clone: function () {
          return this;
        },
      };
      mockFetch.mockResolvedValueOnce(mockResponse);

      const [response, error] = await fetch('https://api.example.com/malformed');

      expect(error).toBeInstanceOf(FetchError);
      expect(error.data).toBe('{invalid json');
    });

    it('should respect custom method', async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse({deleted: true}));

      await fetch('https://api.example.com/resource/123', {
        method: 'DELETE',
      });

      const callArgs = mockFetch.mock.calls[0];
      expect(callArgs[1].method).toBe('DELETE');
    });

    it('should merge custom headers with defaults', async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse({success: true}));

      await fetch('https://api.example.com/data', {
        headers: {
          'X-Custom-Header': 'custom-value',
        },
        bodyJson: {test: true},
      });

      const callArgs = mockFetch.mock.calls[0];
      expect(callArgs[1].headers['X-Custom-Header']).toBe('custom-value');
      expect(callArgs[1].headers['content-type']).toBe('application/json');
    });
  });
});
