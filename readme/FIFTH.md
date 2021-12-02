# Vite + TS + AntdV 搭建后台管理系统（五）

## 前言

[尤大的最新推荐(https://twitter.com/VueDose/status/1463169464451706897)]如下所示：

![预览效果](https://github.com/zptime/resources/blob/master/images/shanglv-vite-antdv/ic_5_1.png)

在继续做项目之前，有一些升级和准备：

1. [npm 依赖包版本升级](https://github.com/zptime/shanglv-vite-antdv/blob/main/readme/update.md)
2. `Vetur` 是一个 VSCode 插件，在 Vue2.x 项目中普遍使用，但是对 TS 的支持不太友好；因此 Vue3.x 开发推荐另外一个插件 `Volar`。注意：`Volar 和 Vetur 两个是互斥的，使用 Volar 时要记得禁用 Vetur`
3. [Pinia](https://pinia.esm.dev/)：类似 Vuex，旨在测试 Vuex 下一次迭代的提案，与 Vuex 5 的开放式 RFC 的 API 非常相似。

### Pinia 安装及配置

1. 安装

```bash
yarn add pinia
# or with npm
npm install pinia
```

2. main.ts 中配置

```js
import { createPinia } from "pinia";
app.use(createPinia());
```

3. 定义 stores：以 stores/example.ts 文件为例，实现基础的使用

```js
import { defineStore } from "pinia";

export const useExampleStore = defineStore("example", {
  // 声明state
  state: () => ({
    name: "张三",
    count: 18,
  }),
  // 声明getter
  getters: {
    doubleCount(state) {
      return state.count * 2;
    },
    doubleCountPlus() {
      // 传参通过函数的形式
      return (value: number) => {
        // 调用getter直接通过 this
        return this.doubleCount + value;
      };
    },
  },
  // 声明actions
  actions: {
    // 同步任务
    addCount() {
      this.count++;
    },
    // 异步任务
    asyncAddCount(num: number) {
      setTimeout(() => {
        this.count += num;
      }, 3000);
    },
  },
});
```

## 5.1 完善 breadcrumb 面包屑组件

> 完善 header 头部区的面包屑功能

实现方案思路

1. 选中左侧菜单时，全局保存菜单路径(breadcrumbList)；
2. 根据保存路径，在左侧菜单表中筛选出对应路由信息(breadcrumbRoutes)；
3. 根据对应路由信息，展示面包屑，其中要注意 home 页的处理

### 位置调整

调整 `breadcrumb` 面包屑组件的位置，从内容区 `layout/main` 中移到头部区`layout/header`

1. 修改 layout/main/index.vue，去除 breadcrumb 组件的引入

```vue
<template>
  <a-layout-content class="c-main">
    <div class="c-main-content">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </a-layout-content>
</template>

<script lang="ts"></script>

<style lang="scss" scoped>
.c-main {
  margin: 20px;
  &-content {
    padding: 24px;
    background: #fff;
    min-height: 360px;
  }
}
</style>
```

2. 修改 layout/header/index.vue，加入 breadcrumb 组件

```html
<template>
  <a-layout-header>
    <Breadcrumb />
  </a-layout-header>
</template>

<script lang="ts">
  import Breadcrumb from "../header/breadcrumb.vue";
  export default defineComponent({
    components: {
      Breadcrumb,
    },
  });
</script>
```

### 数据保存

1. 新建 `stores/breadcrumb.ts` 文件，对面包屑进行处理

```js
import { defineStore } from "pinia";

export const useBreadcrumbStore = defineStore("breadcrumb", {
  state: () => ({
    breadcrumbList: ["dashboard"],
  }),
  getters: {
    getBreadcrumb(state) {
      return state.breadcrumbList;
    },
  },
  actions: {
    setBreadcrumb(data: string[]) {
      console.log("pinia", data);
      this.breadcrumbList = data;
    },
  },
});
```

2. 在 layout/sider/menu.vue 中保存选中的菜单路径

```html
<template>
  <a-menu @click="handleMenuClick"></a-menu>
</template>

<script lang="ts">
  import { useBreadcrumbStore } from "stores/breadcrumb";
  export default defineComponent({
    setup() {
      const handleMenuClick = ({ key = "", keyPath = [] }) => {
        // 保存选中路径
        setBreadcrumb(keyPath);
      };
    },
  });
</script>
```

### 功能完善

主要在 `layout/header/breadcrumb.vue` 中处理，之前更新了 vue 版本，现在可以使用 setup 来写了，具体使用可查看官网-[SFC <script setup> 官网介绍 中文](https://v3.cn.vuejs.org/api/sfc-script-setup.html)

```vue

```

## 5.3 新增 tagsView 导航标签组件

## 5.4 新增 user 用户信息组件
