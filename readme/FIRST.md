# Vite + TS + AntdV 从零开始搭建后台管理系统（一）

## 1. Vite 项目初始化配置

vite 官方中文文档：[https://cn.vitejs.dev/guide/](https://cn.vitejs.dev/guide/)

- 安装 vite

```sh
$ npm init @vitejs/app
$ yarn create @vitejs/app
```

- 初始化 vite 项目模板：选择模板为 vue-ts

```sh
$ npm init @vitejs/app shanglv-vite-antdv -- --template vue
$ yarn create @vitejs/app shanglv-vite-antdv --template vue
```

- 模板安装好后，运行环境

  - 进入安装目录：cd shanglv-vite-antdv
  - 安装依赖：npm install
  - 启动：npm run dev

- 浏览器打开查看效果：http://localhost:3000/

![启动页](https://github.com/zptime/resources/blob/master/images/shanglv-vite-antdv/3000.jpg)

## 2. Vuex 配置

Vuex 官方文档：[https://next.vuex.vuejs.org/](https://next.vuex.vuejs.org/)

- 安装 Vuex，目前 4.x 还没有中文文档，可参考 3.x 中文文档一起阅读

```sh
$ npm install vuex@next --save
$ yarn add vuex@next --save
```

- 在 src 目录下创建 store/index.ts

```js
import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import type { App } from "vue";

// InjectionKey 将store安装到Vue应用程序时提供类型，将类型传递InjectionKey给useStore方法

// 手动声明 state 类型
export interface State {
  count: number;
}

// 定义注入类型
const key: InjectionKey<Store<State>> = Symbol();

const store =
  createStore <
  State >
  {
    state() {
      return {
        count: 0,
      };
    },
    mutations: {
      increment(state: State) {
        state.count++;
      },
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

- main.ts 修改

```ts
import { createApp } from "vue";
import { setupStore } from "./store"; // 状态管理
import App from "./App.vue";

const app = createApp(App);

setupStore(app); // 引入状态管理

app.mount("#app");
```

- components/HelloWorld.vue 修改

```html
<template>
  <h1>{{ msg }}</h1>
  <button type="button" @click="increment">count is: {{ count }}</button>
</template>

<script lang="ts">
  import { defineComponent, computed } from "vue";
  // 注意此处，引入的useStore为自定义的，而不是vuex默认导出的；为了引入方便，此处需要配置别名
  // import { useStore } from 'vuex'
  import { useStore } from "store/index";

  export default defineComponent({
    name: "HelloWorld",
    props: {
      msg: {
        type: String,
        required: true,
      },
    },
    setup: () => {
      const store = useStore();
      return {
        count: computed(() => store.state.count),
        increment: () => store.commit("increment"),
      };
    },
  });
</script>

<style scoped></style>
```

- vite 配置别名：修改 vite.config.ts 配置文件

```js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
const resolve = (dir: string) => path.join(__dirname, dir);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@/": resolve("src/*"),
      comps: resolve("src/components"),
      store: resolve("src/store"),
    },
  },
});
```

报错一：找不到模块“path”或其相应的类型声明；找不到名称“\_\_dirname”。

解决办法：

```bash
npm install @types/node --save-dev
```

报错二：Cannot find module 'store/index' or its corresponding type declarations.Vetur(2307)

原因分析：以当前项目的上级目录为根目录，可能 Vetur 不知道当前哪一层文件夹才是真正的根目录。

解决办法：

（1）在 tsconfig.json 中配置 baseUrl 和 paths

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@": ["src/*"],
      "comps/*": ["src/components/*"],
      "store/*": ["src/store/*"]
    }
  }
}
```

（2）在 vscode 里新打开一个以当前项目根目录为顶级目录的窗口；并且改项目文件必须放在第一个。

![解决图示](https://github.com/zptime/resources/blob/master/images/shanglv-vite-antdv/alias.jpg)

- 配置后效果展示：

![vuex配置效果](https://github.com/zptime/resources/blob/master/images/shanglv-vite-antdv/vuex.jpg)

## 3. Vue Router 4.x 配置

Vue Router 官方中文文档：[https://next.router.vuejs.org/zh/introduction.html](https://next.router.vuejs.org/zh/introduction.html)

- 安装命令

```sh
$ npm install vue-router@4
```

- 修改 App.vue 文件

```html
<template>
  <router-view></router-view>
</template>

<script lang="ts">
  export default {
    name: "App",
  };
</script>

<style></style>
```

- 在 src 目录下新建 router/index.ts

```js
import { createRouter, createWebHistory } from "vue-router";
import type { App } from "vue";

const HelloWorld = () => import("../components/HelloWorld.vue");
const About = { template: "<div>About</div>" };
const User = {
  template: `
		<div>
			<h2>User {{ $route.params.id }}</h2>
			<router-view></router-view>
		</div>`,
};

const routes = [
  { path: "/", component: HelloWorld },
  { path: "/about", component: About },
  { path: "/users/:id", component: User },
];

const router = createRouter({
  // createWebHashHistory (hash路由 Hash模式 #)
  // createWebHistory (history路由 HTML5 模式 推荐，需要服务器配置支持)
  // createMemoryHistory 带缓存 history 路由
  // 添加baseUrl，createWebHistory(baseUrl)
  history: createWebHistory(),
  routes,
});

export function setupRouter(app: App<Element>) {
  app.use(router);
}

export default router;
```

- main.ts 修改

```js
import { createApp } from "vue";
import { setupStore } from "./store"; // 状态管理
import router, { setupRouter } from "./router"; // 路由 ++
import App from "./App.vue";

const app = createApp(App);

setupRouter(app); // 引入路由
setupStore(app); // 引入状态管理 ++

router.isReady().then(() => {
  app.mount("#app");
});
```

- 问题解决

警告一：[Vue warn]: Missing required prop: "msg" at <HelloWorld onVnodeUnmounted=fn<onVnodeUnmounted> ref=Ref< undefined >

```js
// HelloWorld.vue 中的 required 去掉
export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      // required: true,
      default: 'Hello Vue 3 + TypeScript + Vite'
    }
  }
  ...
})
```

警告二：访问"/about"时报错，[Vue warn]: Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".（组件提供模板选项，但是在Vue的这个构建中不支持运行时编译，配置你的bundler别名 vue： vue/dist/vue.esm-bundler.js）

```js
// 在vite.config.ts中配置别名
// 可参考文档：https://blog.csdn.net/qq_41499782/article/details/112505665
export default defineConfig({
  resolve: {
    alias: {
      vue: "vue/dist/vue.esm-bundler.js",
    },
  }
});
```
