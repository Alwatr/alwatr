const browserData = [
  {name: 'Chrome', versions: ['94.0.4606.81', '93.0.4577.82', '92.0.4515.159', '91.0.4472.124']},
  {name: 'Firefox', versions: ['93.0', '92.0', '91.0', '90.0']},
  {name: 'Safari', versions: ['15.0', '14.1', '14.0', '13.1']},
  {name: 'Edge', versions: ['96.0.1054.43', '95.0.1020.40', '94.0.992.50']},
  {name: 'Opera', versions: ['80.0.4170.61', '79.0.4143.66', '78.0.4093.184']},
];

const operatingSystems = [
  'Windows NT 10.0',
  'Macintosh; Intel Mac OS X 11_6_0',
  'Linux x86_64',
  'iPhone; CPU iPhone OS 14_7_1 like Mac OS X',
  'Android 11.0.0',
  'iPad; CPU OS 15_0 like Mac OS X',
];

export function generateRandomUserAgent(): string {
  const randomBrowser = browserData[Math.floor(Math.random() * browserData.length)];
  const randomBrowserVersion = randomBrowser.versions[Math.floor(Math.random() * randomBrowser.versions.length)];
  const randomOperatingSystem = operatingSystems[Math.floor(Math.random() * operatingSystems.length)];

  return `${randomBrowser.name}/${randomBrowserVersion} (${randomOperatingSystem})`;
}
