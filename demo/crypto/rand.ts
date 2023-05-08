import {AlwatrHashGenerator} from '@alwatr/crypto';

const hashGenerator = new AlwatrHashGenerator({algorithm: 'sha256', encoding: 'base64url', crcLength: 4});

for (let i = 0; i <= 10; i++) {
  console.log('hash: %s', hashGenerator.randomSelfValidate());
}

