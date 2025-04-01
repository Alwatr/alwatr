import {packageTracer} from '@alwatr/package-tracer';

__dev_mode__: packageTracer.add(__package_name__, __package_version__);

export * from './djb2-hash.js';
export * from './nano-hash.js';
