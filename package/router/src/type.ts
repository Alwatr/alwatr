import '@vatr/signal/type';

declare global {
  interface VatrSignals {
    'vatr-router-go': unknown;
  }

  interface VatrRequestSignals {
    'vatr-router-change': {
      pathname: string;
      search: string;
      hash: string;
    };
  }
}
export interface InitOptions {
  /**
   * A navigation trigger for Vatr Router that translated clicks on `<a>` links into navigation signal.
   *
   * Only regular clicks on in-app links are translated.
   * Only primary mouse button, no modifier keys, the target href is within the app's URL space.
   *
   * @default true
   */
  clickTrigger?: boolean;
  popstateTrigger?: boolean;
}
