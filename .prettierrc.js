module.exports = {
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  jsxSingleQuote: false,
  trailingComma: 'all',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',
  endOfLine: 'lf',

  plugins: ['@trivago/prettier-plugin-sort-imports'],

  // @trivago/prettier-plugin-sort-import
  importOrder: ['^react$', '^@.*$', '^[./]'],
  importOrderParserPlugins: ['typescript', 'jsx', 'classProperties', 'decorators-legacy'],
};
