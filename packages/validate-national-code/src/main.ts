import {packageTracer} from '@alwatr/package-tracer';

__dev_mode__: packageTracer.add(__package_name__, __package_version__);

export const validateNationalCode = (str: string): boolean => {
  if (!/^\d{10}$/.test(str)) return false;

  const check = +str[9];
  const sum = str.split('').slice(0, 9).reduce((acc, x, i) => acc + +x * (10 - i), 0) % 11;

  return sum < 2 ? check === sum : check + sum === 11;
}
