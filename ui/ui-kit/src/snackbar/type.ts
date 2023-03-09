export type SnackbarOptions = {
  /**
   * Snackbar message.
   */
  message?: string;

  /**
   * Snackbar L10n message.
   */
  messageKey?: string;

  /**
   * Snackbar action button label text.
   */
  actionLabel?: string;

  /**
   * Snackbar action button label L10n key.
   */
  actionLabelKey?: string;

  /**
   * Snackbar automatically disappear from the screen after a minimum of 4,000ms, and a maximum of 10,000ms.
   *
   * If duration is `-1` and `actionLabel` defined, snackbar remain until action button clicked.
   *
   * @default 5_000
   */
  duration?: number;
}

export type SnackbarResponse = {
  actionButton?: true;
}
