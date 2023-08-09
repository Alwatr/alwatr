import type {Photo} from '@alwatr/type';
import type {IconContent} from '@alwatr/ui-kit2/icon/icon.js';


export interface TourCardContent {
  title: string;
  image: Photo;
  descriptionList: {
    icon: IconContent;
    text: string;
  }[]
}
