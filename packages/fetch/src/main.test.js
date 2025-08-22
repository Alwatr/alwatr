import {fetch, fetchJson} from '@alwatr/fetch';

describe('fetch with search params', () => {
  it('should make a GET request to the specified URL', async () => {
    /**
     * @type {import('@alwatr/fetch').FetchOptions}
     */
    const options = {
      url: 'http://httpbin.org/get',
      queryParams: {
        a: 2,
      },
      cacheStrategy: 'network_only',
      removeDuplicate: 'auto',
    };

    fetch(options);
    const response = await fetch(options);
    const responseJson = await response.json();

    expect(response.status).toBe(200);
    expect(responseJson.args.a).toBe('2');
  });
});

describe('fetch json', () => {
  it('should make a GET request to the specified URL with json body and parse valid json', async () => {
    /**
     * @type {import('@alwatr/fetch').FetchOptions}}
     */
    const options = {
      url: 'http://httpbin.org/post',
      method: 'POST',
      bodyJson: {
        a: 2,
      },
      cacheStrategy: 'network_only',
    };

    const responseJson = await fetchJson(options);

    expect(responseJson.ok).toBe(undefined);
    expect(responseJson.json.a).toBe(2);
  });

  it('should make a GET request to the specified URL and parse json and handle 404 status code', async () => {
    /**
     * @type {import('@alwatr/fetch').FetchOptions}}
     */
    const options = {
      url: 'https://httpbin.org/status/404',
      cacheStrategy: 'network_only',
    };

    const responseJson = await fetchJson(options);

    expect(responseJson.ok).toBe(false);
    expect(responseJson.statusCode).toBe(404);
  });
});
