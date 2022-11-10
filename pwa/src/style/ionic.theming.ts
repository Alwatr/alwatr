import {css} from 'lit';

const theming = css`
  .ion-color-primary {
    --ion-color-base: var(--ion-color-primary, #3880ff) !important;
    --ion-color-base-rgb: var(--ion-color-primary-rgb, 56, 128, 255) !important;
    --ion-color-contrast: var(--ion-color-primary-contrast, #fff) !important;
    --ion-color-contrast-rgb: var(--ion-color-primary-contrast-rgb, 255, 255, 255) !important;
    --ion-color-shade: var(--ion-color-primary-shade, #3171e0) !important;
    --ion-color-tint: var(--ion-color-primary-tint, #4c8dff) !important;
  }

  .ion-color-secondary {
    --ion-color-base: var(--ion-color-secondary, #3dc2ff) !important;
    --ion-color-base-rgb: var(--ion-color-secondary-rgb, 61, 194, 255) !important;
    --ion-color-contrast: var(--ion-color-secondary-contrast, #fff) !important;
    --ion-color-contrast-rgb: var(--ion-color-secondary-contrast-rgb, 255, 255, 255) !important;
    --ion-color-shade: var(--ion-color-secondary-shade, #36abe0) !important;
    --ion-color-tint: var(--ion-color-secondary-tint, #50c8ff) !important;
  }

  .ion-color-tertiary {
    --ion-color-base: var(--ion-color-tertiary, #5260ff) !important;
    --ion-color-base-rgb: var(--ion-color-tertiary-rgb, 82, 96, 255) !important;
    --ion-color-contrast: var(--ion-color-tertiary-contrast, #fff) !important;
    --ion-color-contrast-rgb: var(--ion-color-tertiary-contrast-rgb, 255, 255, 255) !important;
    --ion-color-shade: var(--ion-color-tertiary-shade, #4854e0) !important;
    --ion-color-tint: var(--ion-color-tertiary-tint, #6370ff) !important;
  }

  .ion-color-success {
    --ion-color-base: var(--ion-color-success, #2dd36f) !important;
    --ion-color-base-rgb: var(--ion-color-success-rgb, 45, 211, 111) !important;
    --ion-color-contrast: var(--ion-color-success-contrast, #fff) !important;
    --ion-color-contrast-rgb: var(--ion-color-success-contrast-rgb, 255, 255, 255) !important;
    --ion-color-shade: var(--ion-color-success-shade, #28ba62) !important;
    --ion-color-tint: var(--ion-color-success-tint, #42d77d) !important;
  }

  .ion-color-warning {
    --ion-color-base: var(--ion-color-warning, #ffc409) !important;
    --ion-color-base-rgb: var(--ion-color-warning-rgb, 255, 196, 9) !important;
    --ion-color-contrast: var(--ion-color-warning-contrast, #000) !important;
    --ion-color-contrast-rgb: var(--ion-color-warning-contrast-rgb, 0, 0, 0) !important;
    --ion-color-shade: var(--ion-color-warning-shade, #e0ac08) !important;
    --ion-color-tint: var(--ion-color-warning-tint, #ffca22) !important;
  }

  .ion-color-danger {
    --ion-color-base: var(--ion-color-danger, #eb445a) !important;
    --ion-color-base-rgb: var(--ion-color-danger-rgb, 235, 68, 90) !important;
    --ion-color-contrast: var(--ion-color-danger-contrast, #fff) !important;
    --ion-color-contrast-rgb: var(--ion-color-danger-contrast-rgb, 255, 255, 255) !important;
    --ion-color-shade: var(--ion-color-danger-shade, #cf3c4f) !important;
    --ion-color-tint: var(--ion-color-danger-tint, #ed576b) !important;
  }

  .ion-color-light {
    --ion-color-base: var(--ion-color-light, #f4f5f8) !important;
    --ion-color-base-rgb: var(--ion-color-light-rgb, 244, 245, 248) !important;
    --ion-color-contrast: var(--ion-color-light-contrast, #000) !important;
    --ion-color-contrast-rgb: var(--ion-color-light-contrast-rgb, 0, 0, 0) !important;
    --ion-color-shade: var(--ion-color-light-shade, #d7d8da) !important;
    --ion-color-tint: var(--ion-color-light-tint, #f5f6f9) !important;
  }

  .ion-color-medium {
    --ion-color-base: var(--ion-color-medium, #92949c) !important;
    --ion-color-base-rgb: var(--ion-color-medium-rgb, 146, 148, 156) !important;
    --ion-color-contrast: var(--ion-color-medium-contrast, #fff) !important;
    --ion-color-contrast-rgb: var(--ion-color-medium-contrast-rgb, 255, 255, 255) !important;
    --ion-color-shade: var(--ion-color-medium-shade, #808289) !important;
    --ion-color-tint: var(--ion-color-medium-tint, #9d9fa6) !important;
  }

  .ion-color-dark {
    --ion-color-base: var(--ion-color-dark, #222428) !important;
    --ion-color-base-rgb: var(--ion-color-dark-rgb, 34, 36, 40) !important;
    --ion-color-contrast: var(--ion-color-dark-contrast, #fff) !important;
    --ion-color-contrast-rgb: var(--ion-color-dark-contrast-rgb, 255, 255, 255) !important;
    --ion-color-shade: var(--ion-color-dark-shade, #1e2023) !important;
    --ion-color-tint: var(--ion-color-dark-tint, #383a3e) !important;
  }
`;

export default theming;
