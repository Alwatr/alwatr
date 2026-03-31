import plugin from 'tailwindcss/plugin.js';

export const safeAreaPlugin = plugin(({addUtilities}) => {
  addUtilities({
    '.m-safe': {
      marginTop: 'var(--safe-area-inset-top, 0)',
      marginRight: 'var(--safe-area-inset-right, 0)',
      marginBottom: 'var(--safe-area-inset-bottom, 0)',
      marginLeft: 'var(--safe-area-inset-left, 0)',
    },
    '.mx-safe': {
      marginRight: 'var(--safe-area-inset-right, 0)',
      marginLeft: 'var(--safe-area-inset-left, 0)',
    },
    '.my-safe': {
      marginTop: 'var(--safe-area-inset-top, 0)',
      marginBottom: 'var(--safe-area-inset-bottom, 0)',
    },
    '.mt-safe': {
      marginTop: 'var(--safe-area-inset-top, 0)',
    },
    '.mr-safe': {
      marginRight: 'var(--safe-area-inset-right, 0)',
    },
    '.mb-safe': {
      marginBottom: 'var(--safe-area-inset-bottom, 0)',
    },
    '.ml-safe': {
      marginLeft: 'var(--safe-area-inset-left, 0)',
    },
    '.p-safe': {
      paddingTop: 'var(--safe-area-inset-top, 0)',
      paddingRight: 'var(--safe-area-inset-right, 0)',
      paddingBottom: 'var(--safe-area-inset-bottom, 0)',
      paddingLeft: 'var(--safe-area-inset-left, 0)',
    },
    '.px-safe': {
      paddingRight: 'var(--safe-area-inset-right, 0)',
      paddingLeft: 'var(--safe-area-inset-left, 0)',
    },
    '.py-safe': {
      paddingTop: 'var(--safe-area-inset-top, 0)',
      paddingBottom: 'var(--safe-area-inset-bottom, 0)',
    },
    '.pt-safe': {
      paddingTop: 'var(--safe-area-inset-top, 0)',
    },
    '.pr-safe': {
      paddingRight: 'var(--safe-area-inset-right, 0)',
    },
    '.pb-safe': {
      paddingBottom: 'var(--safe-area-inset-bottom, 0)',
    },
    '.pl-safe': {
      paddingLeft: 'var(--safe-area-inset-left, 0)',
    },
    '.top-safe': {
      top: 'var(--safe-area-inset-top, 0)',
    },
    '.right-safe': {
      right: 'var(--safe-area-inset-right, 0)',
    },
    '.bottom-safe': {
      bottom: 'var(--safe-area-inset-bottom, 0)',
    },
    '.left-safe': {
      left: 'var(--safe-area-inset-left, 0)',
    },
    '.min-h-screen-safe': {
      minHeight: [
        'calc(100vh - (var(--safe-area-inset-top, 0) + var(--safe-area-inset-bottom, 0)))',
        '-webkit-fill-available',
      ],
    },
    '.h-screen-safe': {
      height: [
        'calc(100vh - (var(--safe-area-inset-top, 0) + var(--safe-area-inset-bottom, 0)))',
        '-webkit-fill-available',
      ],
    },
  });
});
