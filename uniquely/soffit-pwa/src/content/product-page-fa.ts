/* eslint-disable max-len */
import type {ProductPageContent} from '../type.js';

export const productPageContent: ProductPageContent = {
  topAppBar: {
    type: 'large',
    headline: 'محصولات تایل سقفی',
    startIcon: {icon: 'arrow-back-outline', flipRtl: true},
    endIconList: [
      {icon: 'globe-outline', clickSignalId: 'language-button-click-event'},
      {icon: 'menu-outline', flipRtl: true},
    ],
  },

  product: [
    {
      headline: 'محصول شماره یک',
      image: 'https://fastly.picsum.photos/id/613/512/512.jpg?hmac=yKvmC3Ve1L2xmNgH_NWheg4DNQXism0Z-YsnmB8AZ44',
      description: 'متن توضیحات یک محصول از برند سافیت',
      elevated: 2,
      highlight: true,
      stated: true,
    },
    {
      headline: 'محصول شماره یک',
      image: 'https://fastly.picsum.photos/id/620/512/512.jpg?hmac=ekpaYlTuleE5YkU1OnrIUyF4-yoKGm0kLAQfp0oY_sk',
      description: 'متن توضیحات یک محصول از برند سافیت',
      elevated: 2,
      highlight: true,
      stated: true,
    },
    {
      headline: 'محصول شماره یک',
      image: 'https://fastly.picsum.photos/id/618/512/512.jpg?hmac=lthx2JjBF4AqPZbgi0PuOU2v_eHo7ALt799GafmnYiA',
      description: 'متن توضیحات یک محصول از برند سافیت',
      elevated: 2,
      highlight: true,
      stated: true,
    },
    {
      headline: 'محصول شماره یک',
      image: 'https://fastly.picsum.photos/id/613/300/300.jpg?hmac=iAlBg400TaxoC7sUHVjQQVaMZ9im8E314SrksFFgfYU',
      description: 'متن توضیحات یک محصول از برند سافیت',
      elevated: 2,
      highlight: true,
      stated: true,
    },
  ],
};
