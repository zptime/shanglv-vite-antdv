# Vite + TS + AntdV 搭建后台管理系统（六）

1. Ant Design Vue 3.x 出来了，升级组件库；vite 中实现按需引入
2. 使用 Pinia 重构路由
3. 使用 Pinia 重构侧栏菜单(menu)
4. 菜单数据(menu)和面包屑数据(breadcrumb)的联动处理

## 1. Ant Design Vue 组件库升级

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

## 2. 路由重构

### 路由元 meta 字段扩充

[官网介绍之路由元信息](https://next.router.vuejs.org/zh/guide/advanced/meta.html)

可以在路由的 meta 中自定义权限或者配置信息，需要扩展 RouteMeta 接口来扩展 meta 属性，在 TS 环境中需要进行声明，具体可查看[官网介绍之路由元信息](https://next.router.vuejs.org/zh/guide/advanced/meta.html)

新建 typings.d.ts 文件，如下所示：

```js
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

如下所示，修改 router/index.ts 文件：

```js
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

### Pinia 路由全局管理

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

## 3. 侧栏菜单(menu)重构

### Pinia 全局管理菜单

新建 stores/menus.ts 文件

```js
import { defineStore } from "pinia";
import { RouteRecordRaw } from "vue-router";

interface MenuRecord {
  name: string;
  title: string;
  icon: string;
  child?: MenuRecord[];
}

// 菜单数据转化
const transMenus = (routes: RouteRecordRaw[]): MenuRecord[] => {
  let result: MenuRecord[] = [];
  console.log(routes);
  routes.forEach((o) => {
    const { name, children } = o;
    // 1. hidden为true的隐藏
    if (!(o.meta && o.meta.hidden)) {
      // 2. 有子路由时，对子路由进行递归处理
      if (children && children.length) {
        o.children = transMenus(children) as unknown as RouteRecordRaw[];
      }
      // 3. 如果只有一个子菜单，仅展示父级菜单，key为子菜单数据
      let flagName = "";
      if (o.children && o.children.length === 1) {
        flagName = o.children[0].name as string;
      }
      result.push({
        name: flagName ? flagName : (name as string),
        title: o.meta && o.meta.title ? o.meta.title : "",
        icon: o.meta && o.meta.icon ? o.meta.icon : "",
        child: flagName ? [] : (o.children as unknown as MenuRecord[]),
      });
    }
  });
  return result;
};

export const useMenuStore = defineStore("menu", {
  state: () => ({
    menus: [] as MenuRecord[],
    selectedMenu: "",
    openMenu: [] as string[],
  }),
  getters: {
    getMenus(state) {
      return state.menus;
    },
  },
  actions: {
    generateMenus(routes: RouteRecordRaw[]) {
      const menus = transMenus(routes);
      this.setMenus(menus);
    },
    setMenus(menus: MenuRecord[]) {
      this.menus = menus;
    },
    setSelectedMenu(menu = "") {
      localStorage.setItem("selectedMenu", menu);
      this.selectedMenu = menu;
    },
    setOpenMenu(menus: string[] = []) {
      this.openMenu = menus;
      localStorage.setItem("openMenu", menus.toString());
    },
  },
});
```

### 菜单组件重构

使用 Pinia 和 vue3.2 的 script setup 进行重构

1. layout/sider/menu.vue 重构

```vue
<template>
  <a-menu
    mode="inline"
    theme="dark"
    @click="handleMenuClick"
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
  >
    <template v-for="menu in menus">
      <template v-if="!(menu.child && menu.child.length)">
        <a-menu-item :key="menu.name">
          <template #icon>
            <Icon v-if="menu.icon" :icon="menu.icon" />
          </template>
          <router-link :to="{ name: menu.name }">
            {{ menu.title }}
          </router-link>
        </a-menu-item>
      </template>
      <template v-else>
        <SubMenu :menus="menu" />
      </template>
    </template>
  </a-menu>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SubMenu from "./subMenu.vue";
import { storeToRefs } from "pinia";
import { useMenuStore } from "stores/menus";
import { useBreadcrumbStore } from "stores/breadcrumb";

const { setBreadcrumb } = useBreadcrumbStore();
const { menus } = storeToRefs(useMenuStore());
const { setSelectedMenu, setOpenMenu } = useMenuStore();

let selectedKeys = ref<string[]>([]);
let openKeys = ref<string[]>([]);

const handleMenuClick = ({ name = "", keyPath = [] }) => {
  // 选中菜单数据保存
  setSelectedMenu(name);
  setOpenMenu(openKeys.value);

  // 保存选中路径
  setBreadcrumb(keyPath);
};
</script>
```

2. layout/sider/subMenu.vue 重构

```vue
<template>
  <a-sub-menu :key="menus.name">
    <template #icon>
      <Icon v-if="menus.icon" :icon="menus.icon" />
    </template>
    <template #title>{{ menus.title }}</template>
    <template v-for="item in menus.child">
      <template v-if="!(item.child && item.child.length)">
        <a-menu-item :key="item.name">
          <template #icon>
            <Icon v-if="item.icon" :icon="item.icon" />
          </template>
          <router-link :to="{ name: item.name }">
            {{ item.title }}{{ item.name }}
          </router-link>
        </a-menu-item>
      </template>
      <template v-else>
        <SubMenu :menus="item" />
      </template>
    </template>
  </a-sub-menu>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SubMenu",
  props: {
    menus: {
      type: Object,
      default: () => ({}),
    },
  },
});
</script>

<style scoped></style>
```

## 4. 面包屑(breadcrumb)重构

### Pinia 管理面包屑

stores/breadcrumb.ts 文件

```js
import { defineStore } from "pinia";
import { MenuRecord } from "interface/menu";
import { useMenuStore } from "stores/menus";

interface BreadcrumbRecord {
  name: string;
  title: string;
}
const initBreadcrumbList = [{ name: "dashboard", title: "首页" }];
const initBreadcrumb = initBreadcrumbList.map((o) => o.name);

export const useBreadcrumbStore = defineStore("breadcrumb", {
  state: () => ({
    breadcrumbList: initBreadcrumb,
  }),
  getters: {
    getBreadcrumb(state) {
      return state.breadcrumbList;
    },
    filterBreadcrumb() {
      // 从菜单中过滤出面包屑值
      return (
        menus: MenuRecord[] = [],
        result: BreadcrumbRecord[] = []
      ): BreadcrumbRecord[] => {
        const path = this.getBreadcrumb;
        if (menus && menus.length && path && path.length) {
          let node = path.shift();
          let item = menus.find((o) => o.name === node) as MenuRecord;
          result.push({ name: item.name, title: item.title });
          if (item?.child) {
            return this.filterBreadcrumb(item.child, result);
          }
        }
        return result && result.length ? result : initBreadcrumbList;
      };
    },
  },
  actions: {
    setBreadcrumb(data: string[]) {
      this.breadcrumbList = data;
    },
    generateBreadcrumb() {
      const { menus } = useMenuStore();
      return this.filterBreadcrumb(menus, []);
    },
  },
});

```

### 面包屑组件重构

layout/header/breadcrumb.vue 文件

```html
<template>
  <a-breadcrumb class="c-breadcrumb">
    <a-breadcrumb-item v-for="item in breadcrumbMenu" :key="item.name">
      <router-link :to="{ name: item.name }"> {{ item.title }} </router-link>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script setup lang="ts">
  import { computed } from "vue";
  import { useBreadcrumbStore } from "stores/breadcrumb";
  const { generateBreadcrumb } = useBreadcrumbStore();
  const breadcrumbMenu = computed(() => generateBreadcrumb();
</script>

<style lang="scss" scoped>
  .c-breadcrumb {
  }
</style>
```
