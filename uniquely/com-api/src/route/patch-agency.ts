import {config, logger} from '../lib/config.js';
import {nanoServer} from '../lib/server.js';
import {storageClient} from '../lib/storage.js';
import {tokenGenerator} from '../lib/token.js';

import type {AgencyInfo} from '@alwatr/type/customer-order-management.js';

nanoServer.route('PATCH', '/agency/', async (connection) => {
  logger.logMethod?.('patch-agency');

  connection.requireToken(config.nanoServer.adminToken);
  const remoteAddress = connection.getRemoteAddress();
  const clientId = connection.requireClientId();

  const agency = await connection.requireJsonBody<AgencyInfo>();

  agency.id = 'userInfo';
  agency.clientId = clientId;
  agency.remoteAddress = remoteAddress;
  agency.token = tokenGenerator.generate(agency.phoneNumber + '1');

  const storageName = `${config.agencyStoragePrefix}${agency.phoneNumber}-${agency.token}`;

  return {
    ok: true,
    data: await storageClient.set<AgencyInfo>(agency, storageName),
  };
});
