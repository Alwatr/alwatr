/**
 * Make query string from `ParameterList`
 */
export function joinParameterList(
    parameterList: Record<string, string | number | boolean> | null | undefined,
): string {
  if (parameterList == null) return '';
  const list: Array<string> = [];
  for (const key in parameterList) {
    if (Object.prototype.hasOwnProperty.call(parameterList, key)) {
      list.push(`${key}=${String(parameterList[key])}`);
    }
  }
  return list.join('&');
}

/**
 * Make {key:val} object from query string
 */
export function splitParameterString(
    parameterString: string | null | undefined,
): Record<string, string | number | boolean> {
  const parameterList = {};
  if (!parameterString) return parameterList;

  parameterString
      .split('&')
      .forEach((parameter) => {
        const parameterArray = parameter.split('=');
        parameterList[parameterArray[0]] = parameterArray[1] ?? null;
      })
  ;

  return parameterList;
}
