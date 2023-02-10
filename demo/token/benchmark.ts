import {type DigestAlgorithm, AlwatrTokenGenerator} from '@alwatr/token';
import {delay} from '@alwatr/util';

if (process.env.NODE_ENV !== 'production') {
  console.log('Please run node in production for benchmark. NODE_ENV=production node demo/token/benchmark.js');
  process.exit();
}

const tokenGenerator = new AlwatrTokenGenerator({
  secret: 'my-very-secret-key',
  duration: null,
  algorithm: 'md5',
  encoding: 'base64url',
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
await delay(500);
benchmark('sha1');
await delay(500);
benchmark('sha224');
await delay(500);
benchmark('sha256');
await delay(500);
benchmark('sha384');
await delay(500);
benchmark('sha512');
