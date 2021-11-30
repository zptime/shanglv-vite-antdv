# Vite + TS + AntdV 搭建后台管理系统（五）

参考网站：

- [vben-admin](https://vvbin.cn/thin/next/#/about/index)

- [admin-antd-vue](http://vite-demo.admin-antd-vue.liqingsong.cc/#/home/workplace)

## 5.1 npm 依赖包版本升级

vue 更新的真的是太快了，没多久就已经从 3.1 升级到 3.2 了，真的是有点学不动了呀。

但是 3.2 版本的 script setup 和 css 中的 v-bind 真的感觉挺好的，也挺感兴趣的，还是得尝试一下，最终决定升级一下咯。有兴趣的可看一下官网的[vue3 升级日志](https://github.com/vuejs/vue-next/blob/master/CHANGELOG.md)和[Issues](https://github.com/vuejs/vue-next/issues)

当然升级也不能光升级 vue，其他的库组件也需要处理一下

当然我这也是初次尝试用 vue3+ts+vite 开发项目，ts 和 vue3 也是在实战中慢慢摸索，肯定有不完善的地方，有啥不对的地方，希望各位见谅，也请多多提提意见啥的，帮助我提升和完善。

### npm-check 版本升级

在网上找到了一个资料，提供了一个插件，可以检测版本并进行升级，就是 `npm-check`

参考文档：

- [vue 项目升级:vue 项目中的旧版本 npm 包怎么持续升级维护](https://juejin.cn/post/6873388192163168270)
- [npm-check](https://www.npmjs.com/package/npm-check)

```js
// 安装依赖包
npm install -g npm-check

// 运行命令，查看包更新情况
npm-check -u

// 更新全部命令
npm-check -y
```

检测包更新效果：
![npm-check](https://github.com/zptime/resources/blob/master/images/shanglv-vite-antdv/ic_update_1.png)

问题 1：运行`npm-check -y`命令升级报错，提示“ERESOLVE unable to resolve dependency tree”，如下图所示：

![npm-check](https://github.com/zptime/resources/blob/master/images/shanglv-vite-antdv/ic_update_2.png)

(1)解决办法：先手动删除旧的 node modules and package-lock.json，然后执行`npm cache clean --force`，最后再运行安装命令。_尝试后失败了，还是不行_

(2)报错建议解决方法：_实践后要使用命令一个个安装，太慢了_

- Fix the upstream dependency conflict, or retry(修复上游依赖冲突，或者重试)
- this command with --force, or --legacy-peer-deps(使用 --force 或 --legacy-peer-deps)
- to accept an incorrect (and potentially broken) dependency resolution(接受不正确（并且可能已损坏）的依赖项解析)

`--force` 强制拉取当前安装包的最新版本,不管本地已存在的副本.
`--legacy-peer-deps` npm 采用安全的策略去处理各个依赖包中的不同版本

参考文档：[前端开发技巧】npm install xxxx --legacy-peer-deps 到底做了些什么？](https://juejin.cn/post/6971268824288985118)

(3) 按照`npm-check -u`命令展示的包更新版本，直接改 package.json 版本号，然后 npm install 命令安装，这个感觉最快了

```js
// 更新前
"dependencies": {
    "@ant-design/icons-vue": "^6.0.1",
    "ant-design-vue": "^2.2.2",
    "ramda": "^0.27.1",
    "vue": "^3.0.5",
    "vue-router": "^4.0.10",
    "vuex": "^4.0.2"
  },
  "devDependencies": {
    "@types/node": "^16.4.1",
    "@types/ramda": "^0.27.44",
    "@vitejs/plugin-vue": "^1.2.5",
    "@vue/compiler-sfc": "^3.0.5",
    "less": "^4.1.1",
    "sass": "^1.35.2",
    "sass-loader": "^12.1.0",
    "typescript": "^4.3.2",
    "vite": "^2.4.3",
    "vite-plugin-imp": "^2.0.7",
    "vue-tsc": "^0.0.24"
  }

// 更新后
"dependencies": {
    "@ant-design/icons-vue": "^6.0.1",
    "ant-design-vue": "^2.2.8", // 1
    "ramda": "^0.27.1",
    "vue": "^3.2.21", // 1
    "vue-router": "^4.0.12", // 1
    "vuex": "^4.0.2"
  },
  "devDependencies": {
    "@types/node": "^16.11.6", // 1 2
    "@types/ramda": "^0.27.46", // 1 2
    "@vitejs/plugin-vue": "^1.9.4", // 1 2
    "@vue/compiler-sfc": "^3.2.21", // 1 2
    "less": "^4.1.2", // 1 2
    "sass": "^1.43.4", // 1 2
    "sass-loader": "^12.3.0", // 1 2
    "typescript": "^4.4.4", // 1 2
    "vite": "^2.6.13", // 1 2
    "vite-plugin-imp": "^2.0.10", // 1 2
    "vue-tsc": "^0.28.10" // 1 2
  }
```

### npm-check-updates 版本升级

```js
// 安装命令
npm install -g npm-check-updates

// 运行命令：检测并更新
ncu -u

// 运行命令完成升级
npm install
或 npm update
```

1. 直接运行 npm update 效果，package 是没有变化的

![npm-check](https://github.com/zptime/resources/blob/master/images/shanglv-vite-antdv/ic_update_3.png)

2. 运行 ncu -u 命令，效果如下所示：只更新了 devDependencies 中的依赖包，dependencies 中的没有变化

![npm-check](https://github.com/zptime/resources/blob/master/images/shanglv-vite-antdv/ic_update_4.png)

```js
// 更新后
"dependencies": {
    "@ant-design/icons-vue": "^6.0.1",
    "ant-design-vue": "^2.2.8", // 1
    "ramda": "^0.27.1",
    "vue": "^3.2.21", // 1
    "vue-router": "^4.0.12", // 1
    "vuex": "^4.0.2"
  },
  "devDependencies": {
    "@types/node": "^16.11.6", // 1 2
    "@types/ramda": "^0.27.46", // 1 2
    "@vitejs/plugin-vue": "^1.9.4", // 1 2
    "@vue/compiler-sfc": "^3.2.21", // 1 2
    "less": "^4.1.2", // 1 2
    "sass": "^1.43.4", // 1 2
    "sass-loader": "^12.3.0", // 1 2
    "typescript": "^4.4.4", // 1 2
    "vite": "^2.6.13", // 1 2
    "vite-plugin-imp": "^2.0.10", // 1 2
    "vue-tsc": "^0.28.10" // 1 2
  }
```

3. 运行`npm outdated`命令，查看剩下需要升级的包

![npm-check](https://github.com/zptime/resources/blob/master/images/shanglv-vite-antdv/ic_update_5.png)

4. 最终还是手动更改 package，然后安装才行

参考文档：

- [[译] 如何更新 package.json 中的依赖项](https://cloud.tencent.com/developer/article/1645064)
- [npm-check-updates](https://github.com/raineorshine/npm-check-updates)

### 升级结果

最终实现就是通过更改 `package.json`文件中的依赖版本号，然后运行`npm update`来实现升级的，升级之后项目可以正常运行。

当然也有可能是目前功能比较简单，因此升级影响不是特别大吧，暂时没啥报错的。真正实践项目还是以稳定为主的，不能随意升级

## 5.2 完善 breadcrumb 面包屑组件

> 完善 header 头部区的面包屑功能

实现方案思路

1. 选中左侧菜单时，保存菜单路径(breadcrumbList)；
2. 根据保存路径，在左侧菜单表中筛选出对应路由信息(breadcrumbRoutes)；
3. 根据对应路由信息，展示面包屑，注意 home 页的处理

### 位置调整

调整 `breadcrumb` 面包屑组件的位置，从内容区 `layout/main` 中移到头部区`layout/header`

1. 修改 layout/main/index.vue，去除 breadcrumb 组件的引入

```html
<template>
  <a-layout-content style="margin: 0 16px">
    <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
      Bill is a cat.
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </a-layout-content>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    data() {
      return {};
    },
  });
</script>

<style></style>
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

在 layout/sider/menu.vue 中保存选中的菜单路径

```html
<template>
  <a-menu @click="handleMenuClick"></a-menu>
</template>

<script lang="ts">
  export default defineComponent({
    setup() {
      const handleMenuClick = (e: Event) => {
        const { item, key, keyPath } = e;
        // 保存选中路径
        store.commit("SET_BREADCRUMB", keyPath);
      };
    },
  });
</script>
```

在 store/modules/settings.ts 中处理，采用 vuex 和 localStorage 混合的方式处理，保证页面刷新时，状态不丢失

```js
// store/interface/index.ts
export interface SettingsState {
  breadcrumbList: Array<string>;
}

// settings.ts
const settings: Module<SettingsState, RootStateTypes> = {
  state() {
    return {
      breadcrumbList: [],
    };
  },
  getters: {
    breadcrumbList: (state) => state.openMenu,
  },
  mutations: {
    SET_BREADCRUMB(state, data) {
      localStorage.setItem("breadcrumbList", data);
      state.breadcrumbList = data;
    },
  },
  actions: {
    toggleCollapse({ commit }) {
      commit("TOGGLE_COLLAPSE");
    },
  },
};

export default settings;
```

### 功能完善

主要在 layout/header/breadcrumb.vue 中处理，之前更新了 vue 版本，现在可以使用 setup 来写了

[SFC <script setup> 官网介绍 英文](https://v3.vuejs.org/api/sfc-script-setup.html)
[SFC <script setup> 官网介绍 中文](https://v3.cn.vuejs.org/api/sfc-script-setup.html)

## 5.3 新增 tagsView 导航标签组件

## 5.4 新增 user 用户信息组件

vetur 支持 vue2.x
volar 支持 vue3.x
参考文档：[Volar - vue 终极开发神器！](https://juejin.cn/post/6966106927990308872)
Volar 和 Vetur 两个是互斥的，使用 Volar 时要记得禁用 Vetur
