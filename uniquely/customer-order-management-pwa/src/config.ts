export interface Product {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly price: number;
}

export const sampleProductList: Array<Product> = [
  {
    id: 0,
    title: 'تایل کد ۲۳۸g',
    description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است',
    image: `/image/product/p1.jpg`,
    price: 71599,
  },
  {
    id: 1,
    title: 'تایل کد ۹۷۵',
    description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است',
    image: `/image/product/p2.jpg`,
    price: 62599,
  },
  {
    id: 2,
    title: 'تایل کد ۰۰۱',
    description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است',
    image: `/image/product/p3.jpg`,
    price: 69599,
  },
  {
    id: 3,
    title: 'تایل کد ۲۳۸g',
    description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است',
    image: `/image/product/p1.jpg`,
    price: 71599,
  },
  {
    id: 4,
    title: 'تایل کد ۹۷۵',
    description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است',
    image: `/image/product/p2.jpg`,
    price: 62599,
  },
  {
    id: 5,
    title: 'تایل کد ۰۰۱',
    description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است',
    image: `/image/product/p3.jpg`,
    price: 69599,
  },
];
