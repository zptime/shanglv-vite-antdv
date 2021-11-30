# Vite + TS + AntdV 从零开始搭建后台管理系统（三）

> 在[Vite + TS + AntdV 从零开始搭建后台管理系统（二）](https://github.com/zptime/shanglv-vite-antdv/blob/main/readme/SECOND.md)的基础上进行构建

> 参考文档：[https://juejin.cn/post/6915378605459521543](https://juejin.cn/post/6915378605459521543)

## 1. 引入 eslint

依赖安装

```bash
# npm
npm i eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin -D

#yarn
yarn add --dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

在根目录下建立 eslint 配置文件： .eslintrc.js

```js
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  rules: {}
}
```

在根目录下建立 eslint 忽略文件： .eslintignore

```js
public/
node_modules/
```

## 2.引入 prettier

安装依赖

```bash
# npm
npm i prettier eslint-config-prettier eslint-plugin-prettier eslint-plugin-vue -D

#yarn
yarn add --dev prettier eslint-config-prettier eslint-plugin-prettier eslint-plugin-vue
```

在根目录下新建 prettier 配置文件：.prettierrc.js

```js
module.exports = {
  printWidth: 100, // 单行输出（不折行）的（最大）长度
  tabWidth: 2, // 每个缩进级别的空格数
  useTabs: false, // 不使用缩进符，而使用空格
  semi: false, // 是否在语句末尾打印分号
  vueIndentScriptAndStyle: true,
  singleQuote: true, // 单引号
  quoteProps: 'as-needed', // 仅在需要时在对象属性周围添加引号
  bracketSpacing: true, // 是否在对象属性添加空格
  trailingComma: 'none', // 去除对象最末尾元素跟随的逗号
  jsxBracketSameLine: true, // 将 > 多行 JSX 元素放在最后一行的末尾，而不是单独放在下一行（不适用于自闭元素）,默认false,这里选择>不另起一行
  jsxSingleQuote: false, // jsx 不使用单引号，而使用双引号
  arrowParens: 'always', // 箭头函数，只有一个参数的时候，也需要括号
  insertPragma: false,
  requirePragma: false,
  proseWrap: 'never', // 当超出print width（上面有这个参数）时就折行
  htmlWhitespaceSensitivity: 'strict', // 指定 HTML 文件的全局空白区域敏感度, "ignore" - 空格被认为是不敏感的
  endOfLine: 'lf' // 换行符使用 lf
}
```

## 2.引入 husky 和 lint-staged

```bash
npm i husky lint-staged -D
```

修改 package.json 文件

```json
"scripts": {
  "lint": "eslint src --fix --ext .ts,.tsx "
},
"husky": {
  "hooks": {
    "pre-commit": "lint-staged"
  }
},
"lint-staged": {
  "*.{.ts,.tsx}": [
    "prettier --write",
    "eslint --cache --fix",
    "git add"
  ]
}
```

## 实现效果

> 配置了，但是没起作用，这就尴尬了！！！
