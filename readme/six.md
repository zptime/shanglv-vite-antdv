# Vite + TS + AntdV 搭建后台管理系统（六）

1. Ant Design Vue 3.x 出来了，升级组件库；vite 中实现按需引入
2. 使用 Pinia 重构路由
3. 使用 Pinia 重构侧栏菜单(menu)
4. 使用 Pinia 重构面包屑(breadcrumb)
5. 菜单数据(menu)和面包屑数据(breadcrumb)的联动处理

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

### 国际化实现

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

## 路由数据(route)重构

### 路由元 meta 字段扩充

[官网介绍之路由元信息](https://next.router.vuejs.org/zh/guide/advanced/meta.html)

可以在路由的 meta 中自定义权限或者配置信息，需要扩展 RouteMeta 接口来扩展 meta 属性，在 TS 环境中需要进行声明，具体可查看[官网介绍之路由元信息](https://next.router.vuejs.org/zh/guide/advanced/meta.html)

```js
// 新建typings.d.ts文件
import "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    title?: string; // 标题
    hidden?: boolean; // 是否隐藏
    icon?: string; // 图标
    isKeepAlive?: boolean; // 是否开启keep-alive
    orderId?: string | number; // 序号
    role?: string[]; // 角色
  }
}
```

### 路由文件更改(router/index.ts)

```js
// 修改router/index.ts文件

// todo...
// 初始化路由及菜单函数
import { useRouteStore } from "stores/routes";
// 通用路由表
import { constRoutes } from "./constantRoutes";
// 动态路由表
import { dynamicRoutes } from "./dynamicRoutes";
export { constRoutes, dynamicRoutes };

// 路由守卫：进行菜单和权限的处理
router.beforeEach((to, from, next) => {
  if (to.path === "/login" || to.path === "/register") {
    next();
  } else {
    // 初始化路由及菜单函数
    const { generateRoutes, routes } = useRouteStore();
    if (routes.length <= 3) {
      // 防止无限循环，要根据条件停止：通用路由表长度3
      generateRoutes();
      next({ ...to, replace: true });
    } else {
      next();
    }
  }
});

export default router;
```

### Pinia 处理路由

```js
// 新建stores/routes.ts文件
import { defineStore } from "pinia";
import router, { constRoutes, dynamicRoutes, resetRoute } from "router";
import { useMenuStore } from "./menus";

export const useRouteStore = defineStore("route", {
  state: () => ({
    routes: constRoutes,
  }),
  getters: {},
  actions: {
    generateRoutes() {
      return new Promise((resolve) => {
        const routes = [...constRoutes, ...dynamicRoutes];
        resetRoute();
        routes.forEach((route) => {
          router.addRoute(route);
        });
        this.routes = routes;

        // todo...
        // 菜单初始化处理
        const { generateMenus } = useMenuStore();
        generateMenus(routes);
        resolve(routes);
      });
    },
  },
});
```

## 侧栏菜单(menu)重构


