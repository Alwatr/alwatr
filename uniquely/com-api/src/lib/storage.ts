import {AlwatrStorageClient} from '@alwatr/storage-client';

import {config} from '../config.js';

import type {Order, Product} from '@alwatr/type/customer-order-management.js';

export const orderStorageClient = new AlwatrStorageClient<Order>(config.orderStorage);
export const productStorageClient = new AlwatrStorageClient<Product>(config.productStorage);
