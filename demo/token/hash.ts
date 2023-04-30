import {AlwatrHashGenerator} from '@alwatr/token';

const hashGenerator = new AlwatrHashGenerator({
  algorithm: 'sha1',
  encoding: 'base64url',
  crcLength: 8,
});

const test = (): void => {
  const hash = hashGenerator.randomSelfValidate();
  console.log('hash: %s validation: %s', hash, hashGenerator.verifySelfValidate(hash));
};

for (let index = 0; index < 10; index++) {
  test();
}
