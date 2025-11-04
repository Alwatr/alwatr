import {fetch} from '@alwatr/fetch';

describe('fetch with search params', () => {
  it('should make a GET request to the specified URL', async () => {
    const response = await fetch('http://httpbin.org/get', {
      queryParams: {
        a: 'b&c=2',
      },
    });
    const responseJson = await response.json();

    expect(response.status).toBe(200);
    expect(responseJson.args.a).toBe('b&c=2');
  });
});

// describe('fetch with bodyJson', () => {
//   it('should send JSON body and receive it back', async () => {
//     const response = await fetch('http://httpbin.org/post', {
//       method: 'POST',
//       bodyJson: {foo: 'bar', baz: 42},
//     });
//     const responseJson = await response.json();

//     expect(response.status).toBe(200);
//     expect(responseJson.json).toEqual({foo: 'bar', baz: 42});
//     expect(responseJson.headers['Content-Type']).toMatch(/application\/json/);
//   });
// });

// describe('fetch with timeout', () => {
//   it('should throw on timeout', async () => {
//     await expect(fetch('http://httpbin.org/delay/1', {timeout: 500, retry: 0})).rejects.toThrow('fetch_timeout');
//   });
// });

// describe('fetch with removeDuplicate', () => {
//   it('should deduplicate parallel requests', async () => {
//     const url = 'http://httpbin.org/get?dedup=1';
//     const [res1, res2] = await Promise.all([
//       fetch(url, {
//         removeDuplicate: 'always',
//         headers: {Req: '1'},
//       }),
//       fetch(url, {
//         removeDuplicate: 'always',
//         headers: {Req: '2'},
//       }),
//     ]);
//     expect(res1.status).toBe(200);
//     expect(res2.status).toBe(200);
//     const json1 = await res1.json();
//     const json2 = await res2.json();
//     expect(json1.args.dedup).toBe('1');
//     expect(json2.args.dedup).toBe('1');
//     expect(json1.headers['Req']).toBe('1');
//     expect(json2.headers['Req']).toBe('1'); // both should be '1' due to deduplication
//   });
// });
