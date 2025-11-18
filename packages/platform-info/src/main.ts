import type {} from '@alwatr/type-helper';

/**
 * Represents information about the current platform.
 */
interface PlatformInfo {
  /**
   * Whether the NODE_ENV environment variable is not `production` or in browser location.hostname is `localhost`.
   */
  readonly development: boolean;

  /**
   * Whether the current platform is node.js.
   */
  readonly isNode: boolean;

  /**
   * Whether the current platform is a browser.
   */
  readonly isBrowser: boolean;

  /**
   * Whether the current platform is a not a browser.
   */
  readonly isCli: boolean;

  /**
   * Whether the current platform is a web worker.
   */
  readonly isWebWorker: boolean;

  /**
   * Whether the current platform is deno.
   */
  readonly isDeno: boolean;

  /**
   * Whether the current platform is bun.
   */
  readonly isBun: boolean;

  /**
   * Whether the current platform is nw.js.
   */
  readonly isNw: boolean;

  /**
   * Whether the current platform is electron.
   */
  readonly isElectron: boolean;
}

export const platformInfo: PlatformInfo = (() => {
  /**
   * Represents information about the current platform.
   */
  const platformInfo_: Mutable<PlatformInfo> = {
    development: false,
    isNode: false,
    isBrowser: false,
    isWebWorker: false,
    isDeno: false,
    isBun: false,
    isCli: false,
    isNw: false,
    isElectron: false,
  };

  if (typeof window === 'object' && typeof document === 'object' && document.nodeType === Node.DOCUMENT_NODE) {
    platformInfo_.isBrowser = true;
    // @ts-expect-error - Cannot find name 'WorkerGlobalScope'
    platformInfo_.isWebWorker = typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;
  }
  else if (typeof process === 'object') {
    platformInfo_.isCli = true;

    if (process.versions?.node != null) {
      platformInfo_.isNode = true;
    }

    // @ts-expect-error - Cannot find name 'Bun'
    if (typeof Bun !== 'undefined') {
      platformInfo_.isBun = true;
    }
    else if (process.versions?.electron != null) {
      platformInfo_.isElectron = true;
    }
    // @ts-expect-error - Cannot find name 'nw'
    else if (typeof nw !== 'undefined') {
      platformInfo_.isNw = true;
    }
  }

  // other platforms
  // @ts-expect-error - Cannot find name 'Deno'
  if (typeof Deno !== 'undefined') {
    platformInfo_.isCli = true;
    platformInfo_.isDeno = true;
  }

  // development
  if (platformInfo_.isBrowser === true) {
    platformInfo_.development = location.hostname === 'localhost' || location.hostname.indexOf('127.') === 0;
  }
  else if (platformInfo_.isCli === true) {
    platformInfo_.development = process.env.NODE_ENV !== 'production';
  }

  return platformInfo_;
})();
