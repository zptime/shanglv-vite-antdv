# Vite + TS + AntdV 搭建后台管理系统（六）

1. Ant Design Vue 3.x 出来了，升级组件库
2. 使用 Pinia 处理菜单数据
3. 菜单数据(menu)和面包屑数据(breadcrumb)的联动处理

## Ant Design Vue 组件库升级

- 2.x 版本，是为了兼容 Vue3 开发兼容版本，没有带来很多新的特性
- 3.x 版本在性能、易用性、功能上都有了很大的提升。以下是比较重要的变化：
  - 日期组件中移除了 Moment.js，请使用 Day.js 替换。在[前端性能优化实战 从 30s 到 2s](https://juejin.cn/post/7008072984858460196#heading-17)就提到过 Moment.js 的优化，换成更轻量级的 Day.js，现在官方支也移除了，当然更好
  - 使用 TS + Composition Api 几乎重构了所有组件，极个别剩下的也会接下来逐步重构

### 安装

```js
// 安装命令 ^2.2.8 -> ^3.0.0-alpha.13
yarn add ant-design-vue@3.0.0-alpha.13
```

### 按需加载

之前使用的`vite-plugin-imp`实现按需加载，现在换成官网提供的插件`vite-plugin-components`，实现 ant design vue 在 vite 中的按需加载

```js
// 插件安装 ^0.13.3
yarn add vite-plugin-components -D

// 按需配置：修改vite.config.js文件
import ViteComponents, { AntDesignVueResolver } from "vite-plugin-components";

export default {
  plugins: [
    /* ... */
    ViteComponents({
      // ts支持
      globalComponentsDeclaration: true,
      // 组件库导入处理
      customComponentResolvers: [AntDesignVueResolver()],
    }),
  ],
};
```

### 国家化实现

Ant Design Vue 默认文案是英文，需要改成中文，使用`ConfigProvider`来完成

```vue
// 修改App.vue文件
<template>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
</template>

<script lang="ts">
import zhCN from "ant-design-vue/es/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");

export default {
  name: "App",
  data() {
    return {
      locale: zhCN,
    };
  },
};
</script>

<style></style>
```
