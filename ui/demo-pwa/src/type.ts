import type {ChatStorage} from '@alwatr/type';

declare global {
  // eslint-disable-next-line no-var
  var appConfig: Record<string, string | undefined> | undefined;

  interface AlwatrSignals {
    'chat-storage': ChatStorage;
    'chat-send-text-message': ChatStorage;
  }

  interface AlwatrRequestSignals {
    'chat-send-text-message': {text: string};
  }
}
