import {tailwindConfig} from '@alwatr/style'

export default {
  ...tailwindConfig,
  content: [
    '**/*.html',
    // join(dirname(require.resolve('@alwatr/ui-kit2')), '**/*.ts'),
  ],
};
