export type {ChatMessage, ChatPhotoMessage, ChatStorage, ChatTextMessage} from './chat.js';
export type {
  AlwatrServiceResponse,
  AlwatrServiceResponseFailed,
  AlwatrServiceResponseSuccess,
  AlwatrServiceResponseSuccessWithMeta,
  Methods,
  ParamKeyType,
  ParamValueType,
  QueryParameters,
} from './service-response.js';
export type {AlwatrDocumentObject, AlwatrDocumentStorage, AlwatrStorageMeta} from './storage.js';
export {type AlwatrPackageInfo, GlobalAlwatr} from './global.js';
export type {L10Resource, LocalCode, Locale, i18nString} from './i18n.js';
export type {Constructor, MaybePromise} from './type-helper.js';

Alwatr.registeredList.push({
  name: '@alwatr/type',
  version: '{{ALWATR_VERSION}}',
});
