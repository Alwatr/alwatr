import {AlwatrHashGenerator, secretGeneratorPreConfig} from '@alwatr/crypto';

const hashGenerator = new AlwatrHashGenerator(secretGeneratorPreConfig);

for (let i = 0; i <= 10; i++) {
  console.log('hash: %s', hashGenerator.randomSelfValidate());
}

