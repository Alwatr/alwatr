import plugin from 'tailwindcss/plugin.js';

export const elevationPlugin = plugin(({addUtilities}) => {
  addUtilities({
    '.elevation-0': {
      boxShadow: `
        0px 0px 0px 0px rgba(var(--sys-color-shadow), 0.2),
        0px 0px 0px 0px rgba(var(--sys-color-shadow), 0.14),
        0px 0px 0px 0px rgba(var(--sys-color-shadow), 0.12)
      `,
    },
    '.elevation-1': {
      boxShadow: `
        0px 2px 1px -1px rgba(var(--sys-color-shadow), 0.2),
        0px 1px 1px 0px rgba(var(--sys-color-shadow), 0.14),
        0px 1px 3px 0px rgba(var(--sys-color-shadow), 0.12)
      `,
    },
    '.elevation-2': {
      boxShadow: `
        0px 3px 1px -2px rgba(var(--sys-color-shadow), 0.2),
        0px 2px 2px 0px rgba(var(--sys-color-shadow), 0.14),
        0px 1px 5px 0px rgba(var(--sys-color-shadow), 0.12)
      `,
    },
    '.elevation-3': {
      boxShadow: `
        0px 3px 3px -2px rgba(var(--sys-color-shadow), 0.2),
        0px 3px 4px 0px rgba(var(--sys-color-shadow), 0.14),
        0px 1px 8px 0px rgba(var(--sys-color-shadow), 0.12)
      `,
    },
    '.elevation-4': {
      boxShadow: `
        0px 2px 4px -1px rgba(var(--sys-color-shadow), 0.2),
        0px 4px 5px 0px rgba(var(--sys-color-shadow), 0.14),
        0px 1px 10px 0px rgba(var(--sys-color-shadow), 0.12)
      `,
    },
    '.elevation-5': {
      boxShadow: `
        0px 3px 5px -1px rgba(var(--sys-color-shadow), 0.2),
        0px 5px 8px 0px rgba(var(--sys-color-shadow), 0.14),
        0px 1px 14px 0px rgba(var(--sys-color-shadow), 0.12)
      `,
    },
    '.elevation-6': {
      boxShadow: `
        0px 3px 5px -1px rgba(var(--sys-color-shadow), 0.2),
        0px 6px 10px 0px rgba(var(--sys-color-shadow), 0.14),
        0px 1px 18px 0px rgba(var(--sys-color-shadow), 0.12)
      `,
    },
    '.elevation-7': {
      boxShadow: `
        0px 4px 5px -2px rgba(var(--sys-color-shadow), 0.2),
        0px 7px 10px 1px rgba(var(--sys-color-shadow), 0.14),
        0px 2px 16px 1px rgba(var(--sys-color-shadow), 0.12)
      `,
    },
    '.elevation-8': {
      boxShadow: `
        0px 5px 5px -3px rgba(var(--sys-color-shadow), 0.2),
        0px 8px 10px 1px rgba(var(--sys-color-shadow), 0.14),
        0px 3px 14px 2px rgba(var(--sys-color-shadow), 0.12)
      `,
    },
    '.elevation-9': {
      boxShadow: `
        0px 5px 6px -3px rgba(var(--sys-color-shadow), 0.2),
        0px 9px 12px 1px rgba(var(--sys-color-shadow), 0.14),
        0px 3px 16px 2px rgba(var(--sys-color-shadow), 0.12)
      `,
    },
    '.elevation-10': {
      boxShadow: `
        0px 6px 6px -3px rgba(var(--sys-color-shadow), 0.2),
        0px 10px 14px 1px rgba(var(--sys-color-shadow), 0.14),
        0px 4px 18px 3px rgba(var(--sys-color-shadow), 0.12)
      `,
    },
    '.elevation-11': {
      boxShadow: `
        0px 6px 7px -4px rgba(var(--sys-color-shadow), 0.2),
        0px 11px 15px 1px rgba(var(--sys-color-shadow), 0.14),
        0px 4px 20px 3px rgba(var(--sys-color-shadow), 0.12)
      `,
    },
    '.elevation-12': {
      boxShadow: `
        0px 7px 8px -4px rgba(var(--sys-color-shadow), 0.2),
        0px 12px 17px 2px rgba(var(--sys-color-shadow), 0.14),
        0px 5px 22px 4px rgba(var(--sys-color-shadow), 0.12)
      `,
    },
    '.elevation-13': {
      boxShadow: `
        0px 7px 8px -4px rgba(var(--sys-color-shadow), 0.2),
        0px 13px 19px 2px rgba(var(--sys-color-shadow), 0.14),
        0px 5px 24px 4px rgba(var(--sys-color-shadow), 0.12)
      `,
    },
    '.elevation-14': {
      boxShadow: `
        0px 7px 9px -4px rgba(var(--sys-color-shadow), 0.2),
        0px 14px 21px 2px rgba(var(--sys-color-shadow), 0.14),
        0px 5px 26px 4px rgba(var(--sys-color-shadow), 0.12)
      `,
    },
    '.elevation-15': {
      boxShadow: `
        0px 8px 9px -5px rgba(var(--sys-color-shadow), 0.2),
        0px 15px 22px 2px rgba(var(--sys-color-shadow), 0.14),
        0px 6px 28px 5px rgba(var(--sys-color-shadow), 0.12)
      `,
    },
    '.elevation-16': {
      boxShadow: `
        0px 8px 10px -5px rgba(var(--sys-color-shadow), 0.2),
        0px 16px 24px 2px rgba(var(--sys-color-shadow), 0.14),
        0px 6px 30px 5px rgba(var(--sys-color-shadow), 0.12)
      `,
    },
    '.elevation-17': {
      boxShadow: `
        0px 8px 11px -5px rgba(var(--sys-color-shadow), 0.2),
        0px 17px 26px 2px rgba(var(--sys-color-shadow), 0.14),
        0px 6px 32px 5px rgba(var(--sys-color-shadow), 0.12)
      `,
    },
    '.elevation-18': {
      boxShadow: `
        0px 9px 11px -5px rgba(var(--sys-color-shadow), 0.2),
        0px 18px 28px 2px rgba(var(--sys-color-shadow), 0.14),
        0px 7px 34px 6px rgba(var(--sys-color-shadow), 0.12)
      `,
    },
    '.elevation-19': {
      boxShadow: `
        0px 9px 12px -6px rgba(var(--sys-color-shadow), 0.2),
        0px 19px 29px 2px rgba(var(--sys-color-shadow), 0.14),
        0px 7px 36px 6px rgba(var(--sys-color-shadow), 0.12)
      `,
    },
    '.elevation-20': {
      boxShadow: `
        0px 10px 13px -6px rgba(var(--sys-color-shadow), 0.2),
        0px 20px 31px 3px rgba(var(--sys-color-shadow), 0.14),
        0px 8px 38px 7px rgba(var(--sys-color-shadow), 0.12)
      `,
    },
    '.elevation-21': {
      boxShadow: `
        0px 10px 13px -6px rgba(var(--sys-color-shadow), 0.2),
        0px 21px 33px 3px rgba(var(--sys-color-shadow), 0.14),
        0px 8px 40px 7px rgba(var(--sys-color-shadow), 0.12)
      `,
    },
    '.elevation-22': {
      boxShadow: `
        0px 10px 14px -6px rgba(var(--sys-color-shadow), 0.2),
        0px 22px 35px 3px rgba(var(--sys-color-shadow), 0.14),
        0px 8px 42px 7px rgba(var(--sys-color-shadow), 0.12)
      `,
    },
    '.elevation-23': {
      boxShadow: `
        0px 11px 14px -7px rgba(var(--sys-color-shadow), 0.2),
        0px 23px 36px 3px rgba(var(--sys-color-shadow), 0.14),
        0px 9px 44px 8px rgba(var(--sys-color-shadow), 0.12)
      `,
    },
    '.elevation-24': {
      boxShadow: `
        0px 11px 15px -7px rgba(var(--sys-color-shadow), 0.2),
        0px 24px 38px 3px rgba(var(--sys-color-shadow), 0.14),
        0px 9px 46px 8px rgba(var(--sys-color-shadow), 0.12)
      `,
    },
  });
});
