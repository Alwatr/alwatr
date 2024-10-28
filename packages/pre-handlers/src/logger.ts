import {createLogger, packageTracer} from '@alwatr/nanolib';

__dev_mode__: packageTracer.add(__package_name__, __package_version__);

export const logger = /* #__PURE__ */  createLogger(__package_name__);
