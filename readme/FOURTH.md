# Vite + TS + AntdV 从零开始搭建后台管理系统（四）

> 在[（三）](https://github.com/zptime/shanglv-vite-antdv/blob/main/readme/THIRD.md)的基础上，进行侧栏菜单功能完善，之前完成了侧栏菜单的基本展示，还有一些可完善、可优化的地方。此分支路由表有更新，具体查看源码。

> 主要功能概括：路由导航(router-link)；唯一子菜单处理；动态路由刷新白屏；菜单状态保存

> Gihub 地址[开发分支：4-dev-menu]：https://github.com/zptime/shanglv-vite-antdv/tree/4-dev-menu

## 侧栏菜单路由导航(router-link) 

> 之前只是完成了菜单的展示，但是对应的路由功能没有实现，现在使用 routerLink 实现路由导航，主要使用 to 属性控制目标路由的链接。

> 官方 API 文档：https://router.vuejs.org/zh/api/#router-link

1. 修改 layout/sider/menu.vue 文件

```html
<template>
  <a-menu mode="inline" theme="dark">
    <template v-for="item in menus">
      <!-- 一级菜单 -->
      <a-menu-item v-if="!item.children" :key="item.name">
        <!-- 注意：此处to属性中用的是name值，而不是path；如果用path,
        router/index.ts中的子菜单path应该定义为“/父菜单路由/子菜单路由”，例如：将“role”改为“/system/role”。 -->
        <router-link :to="{ name: item.name }">
          <span>{{ item.meta && item.meta.title }}</span>
        </router-link>
      </a-menu-item>
       <!-- 子级菜单 -->
      <SubMenu v-else :menu-info="item" :key="item.name" />
    </template>
  </a-menu>
</template>

<script lang="ts>
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    // vue-router获取路由，查看路由方法
    const { options, getRoutes } = useRouter();
    console.log("getRoutes", getRoutes());
    console.log("options.routes", options.routes);
  }
})
</script>
```

说明：VueRouter 4.x 中获取路由，查看路由的方法为 useRouter()，useRouter().getRoutes()，useRouter().options.routes 等

2.  修改 layout/sider/subMenu.vue 文件

```html
<template>
  <!-- 不存在子级的菜单 -->
  <a-menu-item v-if="!item.children" :key="item.name">
    <router-link :to="{ name: item.name }">
      <Icon v-if="item.meta && item.meta.icon" :icon="item.meta.icon" />
      <span>{{ item.meta && item.meta.title }}</span>
    </router-link>
  </a-menu-item>
  <!-- 存在子级菜单 -->
  <SubMenu v-else :menu-info="item" :key="item.name" />
</template>
```

## 侧栏菜单子路由处理

> 之前的首页、权限测试页都只有一个子菜单，在这种情况展示两级，就不太合理了。对于这种情况，需要处理一下，只展示一级，父菜单路由直接取值子菜单的路由。

判断条件：是否子菜单 && 子菜单个数 === 1

1. 修改 layout/sider/menu.vue 文件

```html
<template>
  <!-- 一级菜单 -->
  <a-menu-item
    v-if="
          !item.children ||
          (item.children && item.children.length && item.children.length === 1)
        "
    :key="item.name"
  >
    <router-link
      :to="{
            name:
              item.children &&
              item.children.length &&
              item.children.length === 1
                ? item.children[0].name
                : item.name,
          }"
    >
      <span>{{ item.meta && item.meta.title }}</span>
    </router-link>
  </a-menu-item>
</template>
```

2. 修改 layout/sider/subMenu.vue 文件

```html
<template>
  <!-- 不存在子级的菜单 -->
  <a-menu-item
    v-if="!item.children ||
          (item.children && item.children.length && item.children.length === 1)"
    :key="item.name"
  >
    <router-link
      :to="{
            name:
              item.children &&
              item.children.length &&
              item.children.length === 1
                ? item.children[0].name
                : item.name,
          }"
    >
      <Icon v-if="item.meta && item.meta.icon" :icon="item.meta.icon" />
      <!-- <component v-if="item.meta.icon" :is="item.meta.icon" /> -->
      <span>{{ item.meta && item.meta.title }}</span>
    </router-link>
  </a-menu-item>
</template>
```

## 动态路由注册刷新白屏

问题：点击刷新，vue-router 会重新初始化，之前动态 addRoute 的路由就不存在了，此时访问一个不存在的页面，就导致页面空白了。

解决：把加载菜单信息放在 router 的全局守卫 beforeEach 中。

注意：防止无限循环，要根据条件停止。我的停止条件就是 store.getters.routes.length > 3，因为默认的通用路由长度为 3，长度小于 3 时，需要加载动态路由表；长度大于 3，代表已经添加过了，无需再添加。

1. 修改 App.vue 文件

```html
<template>
  <router-view />
</template>

<script lang="ts">
  export default {
    name: "App",
  };
</script>

<style></style>
```

2. 修改 router/index.ts 文件

```js
import store from "store/index";

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    document.title = `${to.meta.title}`;
  }

  if (to.path === "/login" || to.path === "/register") {
    next();
  } else if (store.getters.routes.length <= 3) {
    store.dispatch("generateRoutes");
    // @ts-ignore
    next({ ...to, replace: true });
  } else {
    next();
  }
});
```

## 菜单状态保存（展开、选中）

每次刷新页面，菜单展开的状态和被选中的状态就丢失了，需要处理一下。我采用的是 localStorage 和 Vuex 结合使用

1. 修改 layout/sider/menu.vue 文件

```html
<template>
  <a-menu
    @click="handleMenuClick"
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
  >
    // ...
  </a-menu>
</template>

<script lang="ts">
  import * as R from "ramda";
  import { defineComponent, toRefs, reactive } from "vue";
  import { useStore } from "store/index";

  export default defineComponent({
    setup() {
      const store = useStore();
      // 通过localStorage保存状态
      const state = reactive({
        selectedKeys: localStorage.getItem("selectedMenu")
          ? [localStorage.getItem("selectedMenu")]
          : [],
        openKeys: localStorage.getItem("openMenu")
          ? R.split(",", localStorage.getItem("openMenu"))
          : [],
      });

      const handleMenuClick = (e: Event) => {
        const { key } = e;
        // 点击时，将状态保存到vuex和localStorage
        store.commit("SELECTED_MENU", key);
        store.commit("OPEN_MENU", state.openKeys);
      };

      return {
        ...toRefs(state),
        handleMenuClick,
      };
    },
  });
</script>
```

2. 修改 store/modules/settings.ts 文件

```js
const settings: Module<SettingsState, RootStateTypes> = {
  state() {
    return {
      selectedMenu: [],
      openMenu: [],
    };
  },
  getters: {
    selectedMenu: (state) => state.selectedMenu,
    openMenu: (state) => state.openMenu,
  },
  mutations: {
    SELECTED_MENU(state, data) {
      localStorage.setItem("selectedMenu", data);
      state.selectedMenu = data;
    },
    OPEN_MENU(state, data) {
      localStorage.setItem("openMenu", data);
      state.openMenu = data;
    },
  },
};
```

![预览效果](https://github.com/zptime/resources/blob/master/images/shanglv-vite-antdv/sider_status_keep.png)
