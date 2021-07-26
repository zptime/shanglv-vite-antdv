# Vite + TS + AntdV 搭建后台管理系统（四）

> 侧栏菜单功能完善：之前完成了侧栏菜单的基本展示，还有一些可完善、可优化的地方

## 侧栏菜单路由导航(router-link)

1. 修改 layout/sider/menu.vue 文件

```html
<template>
  <!-- 完整 -->
  <a-menu mode="inline" theme="dark">
    <template v-for="item in menus">
      <!-- 一级菜单 -->
      <a-menu-item v-if="!item.children" :key="item.name">
        <router-link :to="{ name: item.name }">
          <span>{{ item.meta && item.meta.title }}</span>
        </router-link>
      </a-menu-item>
      <!-- 子级菜单 -->
      <SubMenu v-else :menu-info="item" :key="item.name" />
    </template>
  </a-menu>

  <!-- 局部 -->
  <a-menu-item v-if="!item.children" :key="item.name">
    // 注意：此处to属性中用的是name值，而不是path；如果用path,
    router/index.ts中的子菜单path应该定义为“/父菜单路由/子菜单路由”，例如：将“role”改为“/system/role”。
    <router-link :to="{ name: item.name }">
      <span>{{ item.meta && item.meta.title }}</span>
    </router-link>
  </a-menu-item>
</template>

<script lang="ts>
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    // vue-router获取路由，查看路由方法
    const { options, getRoutes } = useRouter();
    console.log('getRoutes', getRoutes());
    console.log('options.routes', options.routes);
  }
})
</script>
```

2.  修改 layout/sider/subMenu.vue 文件

```html
<template>
  <!-- 完整 -->
  <a-sub-menu>
    <template #title>
      <span>
        <Icon
          v-if="menuInfo.meta && menuInfo.meta.icon"
          :icon="menuInfo.meta.icon"
        />
        <!-- <component v-if="menuInfo.meta.icon" :is="menuInfo.meta.icon" /> -->
        <span>{{ menuInfo.meta && menuInfo.meta.title }}</span>
      </span>
    </template>
    <template v-if="menuInfo.children && menuInfo.children.length">
      <template v-for="item in menuInfo.children">
        <!-- 不存在子级的菜单 -->
        <a-menu-item v-if="!item.children" :key="item.name">
          <router-link :to="{ name: item.name }">
            <Icon v-if="item.meta && item.meta.icon" :icon="item.meta.icon" />
            <!-- <component v-if="item.meta.icon" :is="item.meta.icon" /> -->
            <span>{{ item.meta && item.meta.title }}</span>
          </router-link>
        </a-menu-item>
        <!-- 存在子级菜单 -->
        <SubMenu v-else :menu-info="item" :key="item.path" />
      </template>
    </template>
  </a-sub-menu>

  <!-- 局部 -->
  <!-- 不存在子级的菜单 -->
  <a-menu-item v-if="!item.children" :key="item.name">
    <router-link :to="{ name: item.name }">
      <Icon v-if="item.meta && item.meta.icon" :icon="item.meta.icon" />
      <span>{{ item.meta && item.meta.title }}</span>
    </router-link>
  </a-menu-item>
</template>
```

## 侧栏菜单子路由处理

之前的首页、权限测试页都只有一个子菜单，在这种情况展示两级，就不太合理了。需要处理一下，只展示一级，父菜单路由直接取值子菜单的路由。

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

## 菜单状态保存（展开、选中）


## 动态路由注册刷新白屏

问题：点击刷新，vue-router会重新初始化，之前动态addRoute的路由就不存在了，此时访问一个不存在的页面，就导致页面空白了。

解决：把加载菜单信息放在router的全局守卫beforeEach中。

注意：防止无限循环，要根据条件停止

```js
// 路由守卫，只有已登录的用户才能进入系统
router.beforeEach(async (to: any, from: any, next: { (): void; (): void }) => {
  if (to.path === '/login' || to.path === '/register') {
    next();
  } else if (sessionStorage.getItem('token')) {
    if (store.getters.addRouters.length === 0) {
      const roles = JSON.parse(localStorage.getItem('roleNames') as string);
      const accessRoutes = await store.dispatch('GenerateRoutes', { roles });
      router.addRoutes(accessRoutes);
      // @ts-ignore
      next({ path: to.path });
    } else {
      next();
    }
    next();
  } else {
    router.push({ name: 'login' });
  }
});
```
