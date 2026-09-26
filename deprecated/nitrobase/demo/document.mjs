import {createLogger} from '@alwatr/logger';

import {AlwatrNitrobase, Region} from '@alwatr/nitrobase';

const logger = createLogger('AlwatrNitrobase/Demo', true);
logger.banner('AlwatrNitrobase/Demo');

// Create a new nitrobase instance
const alwatrStore = new AlwatrNitrobase({
  rootPath: './db',
  defaultChangeDebounce: 2_000, // for demo
});

async function quickstart() {
  const docId = {
    name: 'posts/intro-to-alwatr-nitrobase',
    region: Region.Authenticated,
  };

  logger.logProperty?.('docId', docId);

  // Check the document exist?
  const exists = alwatrStore.hasStore(docId);
  logger.logProperty?.('exists', exists);

  if (!exists) {
    // Define a new document nitrobase file.
    alwatrStore.newDocument(docId, {
      title: 'new title',
      body: '',
    });
  }

  // Create new document reference of specific id.
  const myPost = await alwatrStore.openDocument(docId);

  // Read the document meta information.
  logger.logProperty?.('doc.meta', myPost.getStoreMeta());

  // Enter new data into the document.
  myPost.replaceData({
    title: 'Welcome to Alwatr Nitrobase',
    body: 'This is a amazing content',
  });

  // Read the document.
  logger.logProperty?.('context', myPost.getData());

  // Update an existing document.
  myPost.mergeData({
    body: 'My first AlwatrNitrobase Document',
  });
  logger.logProperty?.('context', myPost.getData());

  logger.logProperty?.('doc.meta', myPost.getStoreMeta());

  await new Promise((resolve) => setTimeout(resolve, 1_000));

  // Unload the document from memory.
  alwatrStore.unloadStore(docId);
  logger.logOther?.('The document unloaded from ram');

  // Delete the document nitrobase file.
  // alwatrStore.deleteFile(docId);
  logger.logOther?.('The document nitrobase file deleted');
}

quickstart();
