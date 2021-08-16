# Vite + TS + AntdV 搭建后台管理系统（三）

> 在[（二）](https://github.com/zptime/shanglv-vite-antdv/blob/main/readme/SECOND.md)的基础上进行开发

> 主要功能概括：路由菜单动态配置；Antdv2.x Icons 图标批量注册，动态引用；sider 菜单组件动态取值；sider 菜单展开收起功能

> Gihub 地址[开发分支：3-dev-asider]：https://github.com/zptime/shanglv-vite-antdv/tree/3-dev-asider

## 基础配置

### VSCode 2021 git bash 配置

旧版 VScode 的 git bash 终端配置如下：

```json
"terminal.integrated.shell.windows": "D:\\Program Files\\Git\\bin\\bash.exe"
```

当 VSCode 升级至 1.57.1(2021.6.17)时，会出现警告提示：此项已弃用，配置默认 shell 的新推荐方法是在 `#terminal.integrated.profiles.windows#` 中创建一个终端配置文件，并将其配置文件名称设置为 `#terminal.integrated.defaultProfile.windows#` 中的默认值。此操作当前将优先于新的配置文件设置，但将来会发生更改。

![警告截图](https://github.com/zptime/resources/blob/master/images/shanglv-vite-antdv/bash-old.jpg)

新版配置如下：

![git bash配置](https://github.com/zptime/resources/blob/master/images/shanglv-vite-antdv/bash.jpg)

VSCode 官方配置文档：[https://code.visualstudio.com/docs/editor/integrated-terminal#\_configuration](https://code.visualstudio.com/docs/editor/integrated-terminal#_configuration)

### ramda 安装

官方文档：[https://ramdajs.com/](https://ramdajs.com/)

```bash
npm install ramda
```

错误提示：无法找到模块“ramda”的声明文件。“e:/xxx/node_modules/ramda/src/index.js”隐式拥有 "any" 类型。尝试使用 `npm i --save-dev @types/ramda` (如果存在)，或者添加一个包含 `declare module 'ramda';` 的新声明(.d.ts)文件

```bash
# ts支持
npm install --save-dev types/npm-ramda#dist
```

## 新增多个路由菜单

（1）修改 router/index.ts 文件

```js
import { createRouter, createWebHistory } from "vue-router";
import type { App } from "vue";

const Layout = () => import("@/layout/index.vue");

// 通用路由表
export const constRoutes = [
  {
    path: "/login",
    name: "login",
    component: { template: "<div>登录页</div>" },
    meta: { title: "登录页", hidden: true },
  },
  {
    path: "/404",
    name: "404",
    component: { template: "<div>404页面</div>" },
    meta: { title: "404", hidden: true },
  },
  {
    id: "C01",
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    meta: { title: "首页", icon: "PieChartOutlined" },
    children: [
      {
        id: "R010",
        path: "dashboard",
        name: "dashboard",
        meta: { title: "首页" },
        component: () => import("comps/HelloWorld.vue"),
      },
    ],
  },
];

// 动态路由表：根据权限加载
export const dynamicRoutes = [
  {
    id: "C02",
    path: "/system",
    component: Layout,
    redirect: "/system/user",
    meta: { title: "系统管理", icon: "DesktopOutlined", role: ["admin"] },
    children: [
      {
        id: "R020",
        path: "user",
        name: "user",
        meta: { title: "用户列表", icon: "AppstoreOutlined", role: ["admin"] },
        component: () => import("views/system/user/index.vue"),
        children: [
          {
            path: "add",
            name: "userAdd",
            meta: { title: "新增用户", role: ["admin"] },
            component: { template: "<div>新增用户</div>" },
          },
          {
            path: "edit",
            name: "userEdit",
            meta: { title: "编辑用户", role: ["admin"] },
            component: { template: "<div>编辑用户</div>" },
          },
          {
            path: "edit",
            name: "userHidden",
            meta: { title: "隐藏页", role: ["admin"], hidden: true },
            component: { template: "<div>隐藏页</div>" },
          },
        ],
      },
      {
        id: "R021",
        path: "role",
        name: "role",
        meta: { title: "角色列表", icon: "InboxOutlined", role: ["admin"] },
        component: () => import("views/system/role/index.vue"),
      },
      {
        id: "R022",
        path: "permission",
        name: "permission",
        meta: { title: "权限列表", icon: "MailOutlined", role: ["admin"] },
        component: () => import("views/system/permission/index.vue"),
      },
    ],
  },
  {
    id: "C03",
    path: "/result",
    component: Layout,
    redirect: "/result/200",
    meta: { title: "结果页", icon: "SettingOutlined", role: ["admin"] },
    children: [
      {
        id: "R030",
        path: "200",
        name: "200",
        meta: { title: "成功页", role: ["admin"] },
        component: { template: "<div>200页面</div>" },
      },
      {
        id: "R031",
        path: "500",
        name: "500",
        meta: { title: "失败页", role: ["admin"] },
        component: { template: "<div>500页面</div>" },
      },
    ],
  },
  {
    path: "/permission",
    component: Layout,
    name: "permission",
    redirect: "/permission/index",
    meta: { title: "权限测试", icon: "QqOutlined", role: ["admin", "root"] },
    children: [
      {
        path: "index",
        component: { template: "<div>权限测试页</div>" },
        name: "权限测试页",
        meta: { title: "权限测试页", role: ["admin", "root"] },
      },
    ],
  },
  // 一定要放在最后，且在动态路由中添加，避免所有页面都被拦截到404
  { path: "/:pathMatch(.*)*", redirect: "/404", meta: { hidden: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes: constRoutes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 };
  },
});

// 删除/重置路由
export function resetRoute(): void {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

export function setupRouter(app: App<Element>) {
  app.use(router);
}

export default router;
```

（2）新增路由相关页面

```html
<!-- views/system/permission/index.vue -->
<!-- views/system/role/index.vue -->
<!-- views/system/user/index.vue -->

<template>
  <div>permission 权限列表</div>
</template>

<script>
  export default {};
</script>

<style></style>
```

## vuex 控制路由和菜单

（1）新增 store/interface/index.ts 文件

```js
export interface AppState {
  count: number
}
export interface SettingsState {
  logo: string,
  title: string,
  isCollapse: boolean,
}
export interface RoutesState {
  routes: Array<object>;
  menus: Array<object>;
}

// 主接口(顶级类型声明)
export interface RootStateTypes {
  app: AppState
  routes: RoutesState
  settings: SettingsState
}
```

（2）新增 store/modules/routes.ts

```js
import * as R from "ramda";
import { Module } from "vuex";
import type { RouteRecordRaw } from "vue-router";
import { RoutesState, RootStateTypes } from "../interface/index";
import router, { constRoutes, dynamicRoutes, resetRoute } from "../../router";

const routes: Module<RoutesState, RootStateTypes> = {
  state() {
    return {
      routes: constRoutes,
      menus: [],
    };
  },
  getters: {
    routes: (state) => state.routes,
  },
  mutations: {
    SET_ROUTE(state: RoutesState, data: any[]) {
      state.routes = data;
    },
    SET_MENU(state: RoutesState, data: any[]) {
      state.menus = data;
    },
  },
  actions: {
    generateRoutes({ commit }, roles) {
      return new Promise((resolve) => {
        let routes = R.concat(constRoutes, dynamicRoutes);
        let menus = generateMenu(routes);
        resetRoute();
        R.forEach((route: RouteRecordRaw) => {
          router.addRoute(route);
        }, routes);
        commit("SET_ROUTE", routes);
        commit("SET_MENU", menus);
        resolve(routes);
      });
    },
  },
};

export default routes;

/* =========== helps ============= */
// 生成菜单
const generateMenu = (routes: any) => {
  const menus = R.filter((o: any) => {
    if (o.meta && o.meta.hidden) {
      return false;
    } else {
      if (o.children && o.children.length) {
        o.children = generateMenu(o.children);
      }
      return o;
    }
  }, routes);
  return menus;
};
```

（3）新增 store/modules/settings.ts

```js
import { Module } from "vuex";
import { SettingsState, RootStateTypes } from "../interface/index";

const settings: Module<SettingsState, RootStateTypes> = {
  state() {
    return {
      logo: "GithubOutlined",
      title: "Vite TS Antdv",
      isCollapse: false,
    };
  },
  getters: {
    logo: (state) => state.logo,
    title: (state) => state.title,
    isCollapse: (state) => state.isCollapse,
  },
  mutations: {
    TOOGLE_COLLAPSE(state) {
      state.isCollapse = !state.isCollapse;
    },
  },
  actions: {
    toggleCollapse({ commit }) {
      commit("TOOGLE_COLLAPSE");
    },
  },
};

export default settings;
```

（4）新增 store/modules/app.ts

```js
import { Module } from "vuex";
import { AppState, RootStateTypes } from "../interface/index";

const app: Module<AppState, RootStateTypes> = {
  state() {
    return {
      count: 0,
    };
  },
  mutations: {
    increment(state: AppState) {
      state.count++;
    },
  },
};

export default app;
```

（5）修改 store/index.ts

```js
import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import type { App } from "vue";

import { RootStateTypes } from "./interface/index";
import app from "./modules/app";
import routes from "./modules/routes";
import settings from "./modules/settings";

// 定义注入类型
const key: InjectionKey<Store<RootStateTypes>> = Symbol();

const store =
  createStore <
  RootStateTypes >
  {
    modules: {
      app,
      routes,
      settings,
    },
  };

// 将类型注入useStore
// 以后项目中引用的均为自定义的这个，而不是vuex默认导出的useStore
export function useStore() {
  return baseUseStore(key);
}

export function setupStore(app: App<Element>) {
  app.use(store, key);
}

export default store;
```

## Antdv2.x Icons 图标批量注册，动态引用

### 方式一：使用时注册

```vue
<template>
  <div>
    <MailOutlined />
    <PieChartOutlined />
  </div>
</template>

<script lang="ts">
import { PieChartOutlined, MailOutlined } from "@ant-design/icons-vue";

import { defineComponent } from "vue";

export default defineComponent({
  components: {
    PieChartOutlined,
    MailOutlined,
  },
});
</script>

<style scoped></style>
```

### 方式二：全局注册使用

新增 libs/antdvIcons.ts 文件：以下两种方式

```js
// （1）图标全局引入
import type { App } from "vue";
import * as antIcons from "@ant-design/icons-vue";

export function setupAntdIcon(app: App<Element>): void {
  // 注册组件
  Object.keys(antIcons).forEach((key) => {
    // bad
    // app.component(key, antIcons[key]);

    // good
    app.component(key, antIcons[key as keyof typeof antIcons]);
  });

  // 使用组件
  // <component :is="menu.icon" />
  // <component is="PieChartOutlined" />
}
```

修改 main.ts 文件

```js
import { setupAntdIcon } from "./libs/antdvIcons"; // 图标库

setupAntdIcon(app); // 引入组件库
```

报错：元素隐式具有 "any" 类型，因为类型为 "any" 的表达式不能用于索引类型 "typeof import("/node_modules/@ant-design/icons-vue/lib/index")"。

解决办法：key as keyof typeof antIcons

### 方式三：全局注册使用

新增 libs/antdvIcons.ts 文件

```js

// （2）图标全局引入：
import type { App } from "vue";
import { createVNode } from "vue";
import * as Icons from "@ant-design/icons-vue";

const Icon = (props: { icon: string }) => {
  const { icon } = props;
  // bad
  // return createVNode(Icons[icon]);

  // good
  return createVNode(Icons[icon as keyof typeof Icons]);
};

export function setupAntdIcon(app: App<Element>): void {
  // 注册
  app.component("Icon", Icon);

  // 使用组件
  // <Icon icon="DesktopOutlined" />
  // <Icon :icon="menu.icon" />
}
```

## 完善 sider 菜单组件

### 修改 App.vue

```html
<template>
  <router-view></router-view>
</template>

<script lang="ts">
  import { useStore } from "store/index";

  export default {
    name: "App",
    setup: () => {
      const store = useStore();
      store.dispatch("generateRoutes");
    },
  };
</script>

<style></style>
```

### Menu 导航菜单动态取值

官方文档之单文件递归菜单：[https://2x.antdv.com/components/menu-cn](https://2x.antdv.com/components/menu-cn)

（1）修改 layout/sider/index.vue

```html
<template>
  <a-layout-sider>
    <Logo />
    <menu />
  </a-layout-sider>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import Logo from "./logo.vue";
  import Menu from "./menu.vue";

  export default defineComponent({
    components: {
      Logo,
      Menu,
    },
  });
</script>

<style></style>
```

（2）新增 logo 组件：layout/sider/logo.vue

```html
<template>
  <div class="m-logo">
    <Icon :icon="logo" class="icon" />
    <div v-show="!isCollapse" class="title">{{ title }}</div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from "vue";
  import { useStore } from "store/index";

  export default defineComponent({
    setup() {
      const store = useStore();
      const title = computed(() => store.state.settings.title);
      const logo = computed(() => store.state.settings.logo);
      const isCollapse = computed(() => store.state.settings.isCollapse);

      return {
        title,
        logo,
        isCollapse,
      };
    },
    data() {
      return {};
    },
  });
</script>

<style scoped lang="scss">
  .m-logo {
    display: flex;
    align-items: center;
    margin: 16px 0;
    .icon {
      font-size: 25px;
      color: #fff;
      margin-left: 26px;
    }
    .title {
      color: #fff;
      font-size: 20px;
      font-weight: bold;
      margin-left: 12px;
    }
  }
</style>
```

（3）新增 menu 菜单组件：layout/sider/menu.vue

```html
<template>
  <a-menu mode="inline" theme="dark">
    <template v-for="item in menus" :key="item.name">
      <template v-if="!item.children">
        <a-menu-item :key="item.name">
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
      </template>
      <template v-else>
        <SubMenu :menu-info="item" :key="item.name" />
      </template>
    </template>
  </a-menu>
</template>

<script lang="ts">
  import { defineComponent, computed } from "vue";
  import { useStore } from "store/index";
  import SubMenu from "./subMenu.vue";

  export default defineComponent({
    setup() {
      const store = useStore();
      const routes = computed(() => store.state.routes.routes);
      const menus = computed(() => store.state.routes.menus);

      return {
        routes,
        menus,
      };
    },
    components: {
      SubMenu,
    },
  });
</script>
```

（4）新增 subMenu 子菜单组件：layout/sider/subMenu.vue

```html
<template>
  <a-sub-menu :key="menuInfo.name" v-bind="$attrs">
    <template #title>
      <span>
        <Icon v-if="menuInfo.meta.icon" :icon="menuInfo.meta.icon" />
        <!-- <component v-if="menuInfo.meta.icon" :is="menuInfo.meta.icon" /> -->
        <span>{{ menuInfo.meta.title }}</span>
      </span>
    </template>
    <template v-for="item in menuInfo.children" :key="item.name">
      <template v-if="!item.children">
        <a-menu-item :key="item.name">
          <Icon v-if="item.meta.icon" :icon="item.meta.icon" />
          <!-- <component v-if="item.meta.icon" :is="item.meta.icon" /> -->
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
      </template>
      <template v-else>
        <SubMenu :menu-info="item" :key="item.name" />
      </template>
    </template>
  </a-sub-menu>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "SubMenu",
    props: {
      menuInfo: {
        type: Object,
        default: () => ({}),
      },
    },
  });
</script>

<style scoped></style>
```

（5）实现效果展示

![预览效果](https://github.com/zptime/resources/blob/master/images/shanglv-vite-antdv/sider.jpg)

### Menu 导航菜单展开收起功能

修改 layout/header/index.vue

```html
<template>
  <a-layout-header style="background: #fff; padding: 0">
    <Icon
      icon="MenuUnfoldOutlined"
      v-if="isCollapse"
      class="trigger"
      @click="toggleCollapse"
    />
    <Icon
      icon="MenuFoldOutlined"
      v-else
      class="trigger"
      @click="toggleCollapse"
    />
  </a-layout-header>
</template>

<script lang="ts">
  import { defineComponent, computed } from "vue";
  import { useStore } from "store/index";

  export default defineComponent({
    setup() {
      const store = useStore();
      const isCollapse = computed(() => store.state.settings.isCollapse);
      const toggleCollapse = () => {
        store.commit("TOOGLE_COLLAPSE");
        // console.log("isCollapse...", isCollapse.value);
      };

      return {
        isCollapse,
        toggleCollapse,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: #1890ff;
    }
  }
</style>
```

修改 layout/sider/index.vue

```html
<template>
  <a-layout-sider v-model:collapsed="isCollapse">
    <Logo />
    <menu />
  </a-layout-sider>
</template>

<script lang="ts">
  import { defineComponent, computed } from "vue";
  import { useStore } from "store/index";
  import Logo from "./logo.vue";
  import Menu from "./menu.vue";

  export default defineComponent({
    components: {
      Logo,
      Menu,
    },
    setup() {
      const store = useStore();
      const isCollapse = computed(() => store.state.settings.isCollapse);
      console.log("isCollapse", isCollapse.value);

      return {
        isCollapse,
      };
    },
  });
</script>

<style></style>
```

问题描述：Warning: [ant-design-vue: Menu] `inlineCollapsed` not control Menu under Sider. Should set `collapsed` on Sider instead.（`inlineCollapsed` 不能控制 Sider 下的 Menu。应该在 Sider 上设置 `collapsed`）

原因分析：menu 放在 sider 中时，展开收缩控制应由 sider 处理。menu 自己处理无效。

```html
<!-- 错误写法 -->
<a-layout-sider collapsible>
  <a-menu mode="inline" theme="dark" :inline-collapsed="collapsed">
    .....
  </a-menu>
</a-layout-sider>

<!-- 正确写法 -->
<a-layout-sider v-model:collapsed="isCollapse" collapsible>
  <a-menu mode="inline" theme="dark"> ..... </a-menu>
</a-layout-sider>
```

修改 components/HelloWorld.vue

```js
export default defineComponent({
  name: "HelloWorld",
  setup: () => {
    const store = useStore();
    return {
      count: computed(() => store.state.app.count), // 修改
    };
  },
});
```

实现效果展示

![预览效果](https://github.com/zptime/resources/blob/master/images/shanglv-vite-antdv/sider_open.jpg)

![预览效果](https://github.com/zptime/resources/blob/master/images/shanglv-vite-antdv/sider_close.jpg)
