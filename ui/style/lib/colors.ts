import type {Config} from 'tailwindcss';

export const refColors = {
  refPrimary: {
    0: 'rgba(var(--ref-palette-primary0), <alpha-value>)',
    10: 'rgba(var(--ref-palette-primary10), <alpha-value>)',
    20: 'rgba(var(--ref-palette-primary20), <alpha-value>)',
    25: 'rgba(var(--ref-palette-primary25), <alpha-value>)',
    30: 'rgba(var(--ref-palette-primary30), <alpha-value>)',
    35: 'rgba(var(--ref-palette-primary35), <alpha-value>)',
    40: 'rgba(var(--ref-palette-primary40), <alpha-value>)',
    50: 'rgba(var(--ref-palette-primary50), <alpha-value>)',
    60: 'rgba(var(--ref-palette-primary60), <alpha-value>)',
    70: 'rgba(var(--ref-palette-primary70), <alpha-value>)',
    80: 'rgba(var(--ref-palette-primary80), <alpha-value>)',
    90: 'rgba(var(--ref-palette-primary90), <alpha-value>)',
    95: 'rgba(var(--ref-palette-primary95), <alpha-value>)',
    98: 'rgba(var(--ref-palette-primary98), <alpha-value>)',
    99: 'rgba(var(--ref-palette-primary99), <alpha-value>)',
    100: 'rgba(var(--ref-palette-primary100), <alpha-value>)',
  },

  refSecondary: {
    0: 'rgba(var(--ref-palette-secondary0), <alpha-value>)',
    10: 'rgba(var(--ref-palette-secondary10), <alpha-value>)',
    20: 'rgba(var(--ref-palette-secondary20), <alpha-value>)',
    25: 'rgba(var(--ref-palette-secondary25), <alpha-value>)',
    30: 'rgba(var(--ref-palette-secondary30), <alpha-value>)',
    35: 'rgba(var(--ref-palette-secondary35), <alpha-value>)',
    40: 'rgba(var(--ref-palette-secondary40), <alpha-value>)',
    50: 'rgba(var(--ref-palette-secondary50), <alpha-value>)',
    60: 'rgba(var(--ref-palette-secondary60), <alpha-value>)',
    70: 'rgba(var(--ref-palette-secondary70), <alpha-value>)',
    80: 'rgba(var(--ref-palette-secondary80), <alpha-value>)',
    90: 'rgba(var(--ref-palette-secondary90), <alpha-value>)',
    95: 'rgba(var(--ref-palette-secondary95), <alpha-value>)',
    98: 'rgba(var(--ref-palette-secondary98), <alpha-value>)',
    99: 'rgba(var(--ref-palette-secondary99), <alpha-value>)',
    100: 'rgba(var(--ref-palette-secondary100), <alpha-value>)',
  },

  refTertiary: {
    0: 'rgba(var(--ref-palette-tertiary0), <alpha-value>)',
    10: 'rgba(var(--ref-palette-tertiary10), <alpha-value>)',
    20: 'rgba(var(--ref-palette-tertiary20), <alpha-value>)',
    25: 'rgba(var(--ref-palette-tertiary25), <alpha-value>)',
    30: 'rgba(var(--ref-palette-tertiary30), <alpha-value>)',
    35: 'rgba(var(--ref-palette-tertiary35), <alpha-value>)',
    40: 'rgba(var(--ref-palette-tertiary40), <alpha-value>)',
    50: 'rgba(var(--ref-palette-tertiary50), <alpha-value>)',
    60: 'rgba(var(--ref-palette-tertiary60), <alpha-value>)',
    70: 'rgba(var(--ref-palette-tertiary70), <alpha-value>)',
    80: 'rgba(var(--ref-palette-tertiary80), <alpha-value>)',
    90: 'rgba(var(--ref-palette-tertiary90), <alpha-value>)',
    95: 'rgba(var(--ref-palette-tertiary95), <alpha-value>)',
    98: 'rgba(var(--ref-palette-tertiary98), <alpha-value>)',
    99: 'rgba(var(--ref-palette-tertiary99), <alpha-value>)',
    100: 'rgba(var(--ref-palette-tertiary100), <alpha-value>)',
  },

  refNeutral: {
    0: 'rgba(var(--ref-palette-neutral0), <alpha-value>)',
    10: 'rgba(var(--ref-palette-neutral10), <alpha-value>)',
    20: 'rgba(var(--ref-palette-neutral20), <alpha-value>)',
    25: 'rgba(var(--ref-palette-neutral25), <alpha-value>)',
    30: 'rgba(var(--ref-palette-neutral30), <alpha-value>)',
    35: 'rgba(var(--ref-palette-neutral35), <alpha-value>)',
    40: 'rgba(var(--ref-palette-neutral40), <alpha-value>)',
    50: 'rgba(var(--ref-palette-neutral50), <alpha-value>)',
    60: 'rgba(var(--ref-palette-neutral60), <alpha-value>)',
    70: 'rgba(var(--ref-palette-neutral70), <alpha-value>)',
    80: 'rgba(var(--ref-palette-neutral80), <alpha-value>)',
    90: 'rgba(var(--ref-palette-neutral90), <alpha-value>)',
    95: 'rgba(var(--ref-palette-neutral95), <alpha-value>)',
    98: 'rgba(var(--ref-palette-neutral98), <alpha-value>)',
    99: 'rgba(var(--ref-palette-neutral99), <alpha-value>)',
    100: 'rgba(var(--ref-palette-neutral100), <alpha-value>)',
  },

  refNeutralVariant: {
    0: 'rgba(var(--ref-palette-neutral-variant0), <alpha-value>)',
    10: 'rgba(var(--ref-palette-neutral-variant10), <alpha-value>)',
    20: 'rgba(var(--ref-palette-neutral-variant20), <alpha-value>)',
    25: 'rgba(var(--ref-palette-neutral-variant25), <alpha-value>)',
    30: 'rgba(var(--ref-palette-neutral-variant30), <alpha-value>)',
    35: 'rgba(var(--ref-palette-neutral-variant35), <alpha-value>)',
    40: 'rgba(var(--ref-palette-neutral-variant40), <alpha-value>)',
    50: 'rgba(var(--ref-palette-neutral-variant50), <alpha-value>)',
    60: 'rgba(var(--ref-palette-neutral-variant60), <alpha-value>)',
    70: 'rgba(var(--ref-palette-neutral-variant70), <alpha-value>)',
    80: 'rgba(var(--ref-palette-neutral-variant80), <alpha-value>)',
    90: 'rgba(var(--ref-palette-neutral-variant90), <alpha-value>)',
    95: 'rgba(var(--ref-palette-neutral-variant95), <alpha-value>)',
    98: 'rgba(var(--ref-palette-neutral-variant98), <alpha-value>)',
    99: 'rgba(var(--ref-palette-neutral-variant99), <alpha-value>)',
    100: 'rgba(var(--ref-palette-neutral-variant100), <alpha-value>)',
  },

  refError: {
    0: 'rgba(var(--ref-palette-error0), <alpha-value>)',
    10: 'rgba(var(--ref-palette-error10), <alpha-value>)',
    20: 'rgba(var(--ref-palette-error20), <alpha-value>)',
    25: 'rgba(var(--ref-palette-error25), <alpha-value>)',
    30: 'rgba(var(--ref-palette-error30), <alpha-value>)',
    35: 'rgba(var(--ref-palette-error35), <alpha-value>)',
    40: 'rgba(var(--ref-palette-error40), <alpha-value>)',
    50: 'rgba(var(--ref-palette-error50), <alpha-value>)',
    60: 'rgba(var(--ref-palette-error60), <alpha-value>)',
    70: 'rgba(var(--ref-palette-error70), <alpha-value>)',
    80: 'rgba(var(--ref-palette-error80), <alpha-value>)',
    90: 'rgba(var(--ref-palette-error90), <alpha-value>)',
    95: 'rgba(var(--ref-palette-error95), <alpha-value>)',
    98: 'rgba(var(--ref-palette-error98), <alpha-value>)',
    99: 'rgba(var(--ref-palette-error99), <alpha-value>)',
    100: 'rgba(var(--ref-palette-error100), <alpha-value>)',
  },
} as const;

export const colorTheme: Config['theme'] = {
  colors: {
    ...refColors,

    /**
     * Primary colors
     */
    primary: 'rgba(var(--sys-color-primary), <alpha-value>)',
    primaryLight: refColors.refPrimary[40],
    primaryDark: refColors.refPrimary[80],

    primaryContainer: 'rgba(var(--sys-color-primary-container), <alpha-value>)',
    primaryContainerLight: refColors.refPrimary[90],
    primaryContainerDark: refColors.refPrimary[30],

    onPrimary: 'rgba(var(--sys-color-on-primary), <alpha-value>)',
    onPrimaryLight: refColors.refPrimary[100],
    onPrimaryDark: refColors.refPrimary[20],

    onPrimaryContainer: 'rgba(var(--sys-color-on-primary-container), <alpha-value>)',
    onPrimaryContainerLight: refColors.refPrimary[10],
    onPrimaryContainerDark: refColors.refPrimary[90],

    inversePrimary: 'rgba(var(--sys-color-inverse-primary), <alpha-value>)',
    inversePrimaryLight: refColors.refPrimary[80],
    inversePrimaryDark: refColors.refPrimary[40],

    /**
     * Secondary colors
     */
    secondary: 'rgba(var(--sys-color-secondary), <alpha-value>)',
    secondaryLight: refColors.refSecondary[40],
    secondaryDark: refColors.refSecondary[80],

    secondaryContainer: 'rgba(var(--sys-color-secondary-container), <alpha-value>)',
    secondaryContainerLight: refColors.refSecondary[90],
    secondaryContainerDark: refColors.refSecondary[30],

    onSecondary: 'rgba(var(--sys-color-on-secondary), <alpha-value>)',
    onSecondaryLight: refColors.refSecondary[100],
    onSecondaryDark: refColors.refSecondary[20],

    onSecondaryContainer: 'rgba(var(--sys-color-on-secondary-container), <alpha-value>)',
    onSecondaryContainerLight: refColors.refSecondary[10],
    onSecondaryContainerDark: refColors.refSecondary[90],

    /**
     * Tertiary colors
     */
    tertiary: 'rgba(var(--sys-color-tertiary), <alpha-value>)',
    tertiaryLight: refColors.refTertiary[40],
    tertiaryDark: refColors.refTertiary[80],

    tertiaryContainer: 'rgba(var(--sys-color-tertiary-container), <alpha-value>)',
    tertiaryContainerLight: refColors.refTertiary[90],
    tertiaryContainerDark: refColors.refTertiary[30],

    onTertiary: 'rgba(var(--sys-color-on-tertiary), <alpha-value>)',
    onTertiaryLight: refColors.refTertiary[100],
    onTertiaryDark: refColors.refTertiary[20],

    onTertiaryContainer: 'rgba(var(--sys-color-on-tertiary-container), <alpha-value>)',
    onTertiaryContainerLight: refColors.refTertiary[10],
    onTertiaryContainerDark: refColors.refTertiary[90],

    /**
     * Surface colors
     */
    background: 'rgba(var(--sys-color-background), <alpha-value>)',
    backgroundLight: refColors.refNeutral[98],
    backgroundDark: refColors.refNeutral[10],

    surface: 'rgba(var(--sys-color-surface), <alpha-value>)',
    surfaceLight: refColors.refNeutral[98],
    surfaceDark: refColors.refNeutral[10],

    surfaceDim: 'rgba(var(--sys-color-surface-dim), <alpha-value>)',
    surfaceDimLight: refColors.refNeutral[90],
    surfaceDimDark: refColors.refNeutral[10],

    surfaceBright: 'rgba(var(--sys-color-surface-bright), <alpha-value>)',
    surfaceBrightLight: refColors.refNeutral[98],
    surfaceBrightDark: refColors.refNeutral[20],

    surfaceContainerLowest: 'rgba(var(--sys-color-surface-container-lowest), <alpha-value>)',
    surfaceContainerLowestLight: refColors.refNeutral[100],
    surfaceContainerLowestDark: refColors.refNeutral[0],

    surfaceContainerLow: 'rgba(var(--sys-color-surface-container-low), <alpha-value>)',
    surfaceContainerLowLight: refColors.refNeutral[98],
    surfaceContainerLowDark: refColors.refNeutral[10],

    surfaceContainer: 'rgba(var(--sys-color-surface-container), <alpha-value>)',
    surfaceContainerLight: refColors.refNeutral[95],
    surfaceContainerDark: refColors.refNeutral[10],

    surfaceContainerHigh: 'rgba(var(--sys-color-surface-container-high), <alpha-value>)',
    surfaceContainerHighLight: refColors.refNeutral[90],
    surfaceContainerHighDark: refColors.refNeutral[20],

    surfaceContainerHighest: 'rgba(var(--sys-color-surface-container-highest), <alpha-value>)',
    surfaceContainerHighestLight: refColors.refNeutral[90],
    surfaceContainerHighestDark: refColors.refNeutral[20],

    surfaceVariant: 'rgba(var(--sys-color-surface-variant), <alpha-value>)',
    surfaceVariantLight: refColors.refNeutral[90],
    surfaceVariantDark: refColors.refNeutral[30],

    inverseSurface: 'rgba(var(--sys-color-inverse-surface), <alpha-value>)',
    inverseSurfaceLight: refColors.refNeutral[20],
    inverseSurfaceDark: refColors.refNeutral[90],

    onBackground: 'rgba(var(--sys-color-on-background), <alpha-value>)',
    onBackgroundLight: refColors.refNeutral[10],
    onBackgroundDark: refColors.refNeutral[90],

    onSurface: 'rgba(var(--sys-color-on-surface), <alpha-value>)',
    onSurfaceLight: refColors.refNeutral[10],
    onSurfaceDark: refColors.refNeutral[90],

    onSurfaceVariant: 'rgba(var(--sys-color-on-surface-variant), <alpha-value>)',
    onSurfaceVariantLight: refColors.refNeutral[30],
    onSurfaceVariantDark: refColors.refNeutral[80],

    inverseOnSurface: 'rgba(var(--sys-color-inverse-on-surface), <alpha-value>)',
    inverseOnSurfaceLight: refColors.refNeutral[95],
    inverseOnSurfaceDark: refColors.refNeutral[20],

    /**
     * Outline colors
     */
    outline: 'rgba(var(--sys-color-outline), <alpha-value>)',
    outlineLight: refColors.refNeutralVariant[50],
    outlineDark: refColors.refNeutralVariant[60],

    outlineVariant: 'rgba(var(--sys-color-outline-variant), <alpha-value>)',
    outlineVariantLight: refColors.refNeutralVariant[80],
    outlineVariantDark: refColors.refNeutralVariant[30],

    /**
     * Error colors
     */
    error: 'rgba(var(--sys-color-error), <alpha-value>)',
    errorLight: refColors.refError[40],
    errorDark: refColors.refError[80],

    errorContainer: 'rgba(var(--sys-color-error-container), <alpha-value>)',
    errorContainerLight: refColors.refError[90],
    errorContainerDark: refColors.refError[30],

    onError: 'rgba(var(--sys-color-on-error), <alpha-value>)',
    onErrorLight: refColors.refError[100],
    onErrorDark: refColors.refError[20],

    onErrorContainer: 'rgba(var(--sys-color-on-error-container), <alpha-value>)',
    onErrorContainerLight: refColors.refError[10],
    onErrorContainerDark: refColors.refError[90],

    /**
     * Other colors
     */
    surfaceTint: refColors.refPrimary[40],
    shadow: refColors.refNeutral[0],
    scrim: refColors.refNeutral[0],
  },
};
