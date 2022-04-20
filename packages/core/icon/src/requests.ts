import {getData} from '@alwatr/fetch';

const alwatrIconContent = new Map<string, string>();
const requests = new Map<string, Promise<string>>();

export const getSvgContent = (url: string): Promise<string> => {
  let req = requests.get(url);
  if (!req) {
    if (!alwatrIconContent.get(url)) {
      req = getData(url).then(async (response) => {
        if (response.ok) {
          const svgContent = await response.text();
          alwatrIconContent.set(url, svgContent);
          return svgContent;
        }
        return response.statusText;
      });
      requests.set(url, req);
    } else {
      req = new Promise((resolve) => {
        resolve(alwatrIconContent.get(url) ?? '');
      });
    }
  }

  return req;
};
