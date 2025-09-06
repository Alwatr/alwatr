import {fetch} from '@alwatr/fetch';

describe('fetch with search params', () => {
  it('should make a GET request to the specified URL', async () => {
    const response = await fetch('http://httpbin.org/get', {
      queryParams: {
        a: 2,
      },
    });
    const responseJson = await response.json();

    expect(response.status).toBe(200);
    expect(responseJson.args.a).toBe('2');
  });
});
