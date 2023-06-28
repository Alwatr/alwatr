import type {MaybePromise, Photo} from '@alwatr/type';

export interface TourCardContent {
  title: string;
  image: Photo;
  descriptionList: Array<{
    icon: MaybePromise<string>;
    text: string;
  }>
}
