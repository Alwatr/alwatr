import {AlwatrStorageClient} from '@alwatr/storage-client';

import {config} from '../config.js';

import type {Order} from '@alwatr/type/customer-order-management.js';

export const orderStorageClient = new AlwatrStorageClient<Order>(config.orderStorage);
