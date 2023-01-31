export type SnackbarOptions = {
  /**
   * Snackbar message.
   */
  message: string;

  /**
   * Snackbar action button label text.
   */
  actionLabel?: string;

  /**
   * Snackbar automatically disappear from the screen after a minimum of 4 seconds, and a maximum of 10 seconds.
   *
   * If duration is `-1` and `actionLabel` defined, snackbar remain until action button clicked.
   *
   * @default 5s
   */
  duration?: number;
}

export type SnackbarResponse = {
  actionButton?: true;
}
