// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    /** ESLint 中的单双引号的配置 https://eslint.org/docs/rules/quotes */
    /* eslint quotes: ["error", "double"] */
    /* eslint-env es6 */
    /** 配置let、var等是否可以定义多个变量，例如：var bar,baz; */
    // 'one-var': ["error", "always"]
    /** 控制方法()的前后的空格 */
    "space-before-function-paren": ["error", {
      "anonymous": "never",
      "named": "never",
      "asyncArrow": "always"
    }],
  }
}
