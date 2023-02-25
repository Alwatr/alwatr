/* eslint-disable max-len */
import type {ProductPageContent} from '../type.js';

export const productPageContent: ProductPageContent = {
  topAppBar: {
    type: 'large',
    headline: 'Ceiling tile product',
    startIcon: {icon: 'arrow-back-outline', clickSignalId: 'back-click-event'},
    endIconList: [
      {icon: 'globe-outline', clickSignalId: 'language-button-click-event'},
      {icon: 'menu-outline', flipRtl: true},
    ],
  },

  product: [
    {
      headline: 'Product one',
      image: 'https://fastly.picsum.photos/id/613/512/512.jpg?hmac=yKvmC3Ve1L2xmNgH_NWheg4DNQXism0Z-YsnmB8AZ44',
      description: 'The description text of a product from the Soffit brand',
      elevated: 1,
      stated: true,
    },
    {
      headline: 'Product two',
      image: 'https://fastly.picsum.photos/id/620/512/512.jpg?hmac=ekpaYlTuleE5YkU1OnrIUyF4-yoKGm0kLAQfp0oY_sk',
      description: 'The description text of a product from the Soffit brand',
      elevated: 1,
      stated: true,
    },
    {
      headline: 'Product three',
      image: 'https://fastly.picsum.photos/id/618/512/512.jpg?hmac=lthx2JjBF4AqPZbgi0PuOU2v_eHo7ALt799GafmnYiA',
      description: 'The description text of a product from the Soffit brand',
      elevated: 1,
      stated: true,
    },
    {
      headline: 'Product four',
      image: 'https://fastly.picsum.photos/id/43/512/512.jpg?hmac=moVeP1k_ZavV4XjR4Ru_eVMqxEuLn73WQ2CTt0in6Kg',
      description: 'The description text of a product from the Soffit brand',
      elevated: 1,
      stated: true,
    },
    {
      headline: 'Product five',
      image: 'https://fastly.picsum.photos/id/223/512/512.jpg?hmac=N-KoUSx0MTedR6SUj6JmSKo_0bdqcSlbEGD4uFJYoBI',
      description: 'The description text of a product from the Soffit brand',
      elevated: 1,
      stated: true,
    },
    {
      headline: 'Product six',
      image: 'https://fastly.picsum.photos/id/234/512/512.jpg?hmac=pCHWOiGeJGGls9rJpS8unQo9pVMFT_d3yUWOd6ztM3A',
      description: 'The description text of a product from the Soffit brand',
      elevated: 1,
      stated: true,
    },
    {
      headline: 'Product seven',
      image: 'https://fastly.picsum.photos/id/249/512/512.jpg?hmac=XIOoZNY2gpWkJlc6jRalcCms4CKAr6fPVSveeFttxaY',
      description: 'The description text of a product from the Soffit brand',
      elevated: 1,
      stated: true,
    },
  ],
};
