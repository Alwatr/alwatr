import type {AlwatrConnection} from '../nano-server';
import type {CrossOriginResourceSharingHeaders} from '../type';


export function setCORSHelperHeader(connection: AlwatrConnection, option: CrossOriginResourceSharingHeaders): void {
  const allowedOrigin = option.accessControlAllowOrigin;
  const requestOrigin = connection.incomingMessage.headers.origin;

  if (requestOrigin === undefined) return;

  let allowed = false;

  if (allowedOrigin === '*') {
    connection.serverResponse.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    allowed = true;
  } else if (Array.isArray(allowedOrigin)) {
    if (allowedOrigin.includes(requestOrigin)) {
      connection.serverResponse.setHeader('Access-Control-Allow-Origin', requestOrigin);
      if (allowedOrigin.length > 1) {
        connection.serverResponse.setHeader('Vary', 'Origin');
      }
      allowed = true;
    }
  } else if (allowedOrigin.test(requestOrigin)) {
    connection.serverResponse.setHeader('Access-Control-Allow-Origin', requestOrigin);
    connection.serverResponse.setHeader('Vary', 'Origin');
    allowed = true;
  }

  if (!allowed) return;
}

