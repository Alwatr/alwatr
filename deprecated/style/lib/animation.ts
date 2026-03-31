import type {Config} from 'tailwindcss';

export const animationTheme: Config['theme'] = {
  keyframes: {
    appear: {
      '0%': {
        transform: 'translate3d(0, 100%, 0)',
        opacity: '0',
      },
      '50%': {
        transform: 'translate3d(0, 0, 0)',
        opacity: '1',
      },
    },
  },
  animation: {
    appear: 'appear 1s ease-out both',
  },
};
