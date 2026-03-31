/**
 * @type {import('prettier').Config}
 */
module.exports = {
  // plugins: ['@prettier/plugin-xml', 'prettier-plugin-nginx', 'prettier-plugin-css-order', 'prettier-plugin-jsdoc'],
  arrowParens: 'always',
  bracketSameLine: false,
  bracketSpacing: false,
  checkIgnorePragma: false,
  embeddedLanguageFormatting: 'auto',
  endOfLine: 'lf',
  experimentalOperatorPosition: 'start',
  experimentalTernaries: true,
  htmlWhitespaceSensitivity: 'ignore',
  insertPragma: false,
  objectWrap: 'preserve',
  printWidth: 120,
  proseWrap: 'preserve',
  quoteProps: 'consistent',
  semi: true,
  singleAttributePerLine: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
  cssDeclarationSorterOrder: 'frakto', // https://github.com/Siilwyn/css-declaration-sorter#order
  cssDeclarationSorterKeepOverrides: false,
  tsdoc: true,
  jsdocCommentLineStrategy: 'multiline',
  overrides: [
    {
      files: ['*.conf.template', 'nginx.conf'],
      options: {
        parser: 'nginx',
      },
    },
  ],
};
