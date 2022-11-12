/**
 * validate and parse airline information
 * return null if information not valid
 */
export function validateBodyJson(bodyJson: Record<string, unknown>): boolean {
  // check have safe type
  if (bodyJson.date === undefined || bodyJson.dest === undefined || bodyJson.origin === undefined) return false;

  // The data is valid now
  return true;
}
