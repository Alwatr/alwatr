import type {AlwatrDocumentObject} from '@alwatr/type';

export type MemberList = AlwatrDocumentObject & {
  memberList: Array<number>;
}
