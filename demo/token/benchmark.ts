import {AlwatrTokenGenerator} from '@alwatr/token';

import type {DigestAlgorithm} from '@alwatr/token';

if (process.env.NODE_ENV !== 'production') {
  console.log('Please run node in production for benchmark. NODE_ENV=production node demo/token/benchmark.js');
  process.exit();
}

const tokenGenerator = new AlwatrTokenGenerator({
  secret: 'my-very-secret-key',
  duration: '1h',
  algorithm: 'sha512',
  encoding: 'base64',
});

const sampleData = 'Lorem ipsum dolor sit amet consectetur adipisicing elit.';

function benchmark(algorithm: DigestAlgorithm): void {
  tokenGenerator.config.algorithm = algorithm;
  const now = Date.now();
  const testRun = 1_000_000;
  let i = testRun;
  for (; i > 0; i--) {
    tokenGenerator.generate(sampleData);
  }
  const runPerSec = Math.round((testRun / (Date.now() - now)) * 1000);
  console.log(`Benchmark for ${algorithm} runs %s per sec`, runPerSec);
}

benchmark('md5');
benchmark('sha1');
benchmark('sha224');
benchmark('sha256');
benchmark('sha384');
benchmark('sha512');
