
import type {AlwatrDocumentStorage, ChatStorage, ChatTextMessage} from '@alwatr/type';

declare global {
  // eslint-disable-next-line no-var
  var appConfig: Record<string, string | undefined> | undefined;

  interface AlwatrSignals {
    'chat-document-storage': ChatStorage;
    'chat-send-text-message': AlwatrDocumentStorage<ChatTextMessage>;
  }

  interface AlwatrRequestSignals {
    'chat-send-text-message': {text: string};
  }
}
