/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/strict',
    'plugin:@typescript-eslint/stylistic',
    // "plugin:@typescript-eslint/strict-type-checked",
    // "plugin:@typescript-eslint/stylistic-type-checked",
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:require-extensions/recommended',
  ],
  env: {
    'shared-node-browser': true,
    es2023: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
    ecmaVersion: 2023,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'import', 'require-extensions'],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        ecmaVersion: 2023,
        project: ['**/tsconfig.json'],
        projectFolderIgnoreList: ['**/node_modules/**'],
      },
      node: true,
    },
    'import/extensions': ['.js', '.mjs', '.ts', '.d.ts'],
  },
  rules: {
    'max-len': ['error', {code: 140}],
    'no-eval': ['error', {allowIndirect: true}],
    'no-floating-decimal': 'error',
    'space-infix-ops': 'error',
    'new-cap': ['error', {capIsNewExceptionPattern: 'Mixin$'}],
    'brace-style': ['error', 'stroustrup', {allowSingleLine: true}],
    indent: 'off',
    '@typescript-eslint/indent': [
      'error',
      2,
      {
        SwitchCase: 1,
        VariableDeclarator: 1,
        outerIIFEBody: 1,
        MemberExpression: 1,
        FunctionDeclaration: {parameters: 1, body: 1},
        FunctionExpression: {parameters: 1, body: 1},
        CallExpression: {arguments: 1},
        ArrayExpression: 1,
        ObjectExpression: 1,
        ImportDeclaration: 1,
        flatTernaryExpressions: false,
        ignoreComments: false,
        ignoredNodes: [
          'TemplateLiteral *',
          'TSTypeParameterInstantiation',
          'FunctionExpression > .params[decorators.length > 0]',
          'FunctionExpression > .params > :matches(Decorator, :not(:first-child))',
          'ClassBody.body > PropertyDefinition[decorators.length > 0] > .key',
        ],
      },
    ],
    'operator-linebreak': ['error', 'after', {overrides: {'?': 'before', ':': 'before'}}],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index'], 'object', 'unknown', 'type'],
        'newlines-between': 'always',
        warnOnUnassignedImports: true,
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error', // یا "error" بسته به سطح سخت‌گیری شما
      {
        varsIgnorePattern: '_',
        argsIgnorePattern: '_',
        caughtErrorsIgnorePattern: '_',
      },
    ],
    '@typescript-eslint/explicit-member-accessibility': 'error',
    '@typescript-eslint/prefer-string-starts-ends-with': 'off',
    '@typescript-eslint/no-dynamic-delete': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    'no-throw-literal': 'off',
    'no-unused-labels': 'off',
    'require-jsdoc': 'off',
    'valid-jsdoc': 'off',
  },
};
