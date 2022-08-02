import type {AlwatrConnection} from '@alwatr/nano-server';

export function requireToken(connection: AlwatrConnection): string | null {
  const token = connection.token;

  if (token == null) {
    connection.reply({
      ok: false,
      statusCode: 401,
      errorCode: 'token_required',
    });
  }

  // TODO: validate token

  return token;
}

const subTokenLength = 12;
export const subToken = (token: string): string => {
  return token.substring(0, subTokenLength);
};
