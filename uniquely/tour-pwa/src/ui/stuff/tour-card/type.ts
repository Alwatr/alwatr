import type {Photo} from '@alwatr/type';
import type {AlwatrIconOptions} from '@alwatr/ui-kit2/icon/icon.js';


export interface TourCardContent {
  title: string;
  image: Photo;
  descriptionList: {
    icon: AlwatrIconOptions;
    text: string;
  }[]
}
