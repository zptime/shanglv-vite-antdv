# Vite + TS + AntdV 从零开始搭建后台管理系统（一）

> 主要功能概括：vite 项目初始化配置；vuex 安装及配置；vue router4.x 安装及配置；Sass/Scss 预处理器；Ant Design of Vue 安装及配置

> Gihub 地址[开发分支：1-dev-init]：https://github.com/zptime/shanglv-vite-antdv/tree/1-dev-init

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

警告二：访问"/about"时报错，[Vue warn]: Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".

翻译：组件提供模板选项，但是在 Vue 的这个构建中不支持运行时编译，配置你的 bundler 别名 vue： vue/dist/vue.esm-bundler.js

```js
// 在vite.config.ts中配置别名
// 可参考文档：https://blog.csdn.net/qq_41499782/article/details/112505665
export default defineConfig({
  resolve: {
    alias: {
      vue: "vue/dist/vue.esm-bundler.js",
    },
  },
});
```

## 4. Sass/Scss 预处理器

```bash
$ npm install -D sass sass-loader
```

## 5. Ant Design of Vue 安装及配置

官网：[https://2x.antdv.com/docs/vue/getting-started-cn](https://2x.antdv.com/docs/vue/getting-started-cn)

```bash
# 组件库安装
$ npm i --save ant-design-vue@next

# 图标库安装
$ npm install --save @ant-design/icons-vue
```

### （1）全局引入

在 src 目录下新增 libs/antdv.ts 文件

```js
// （1）全局引入
import type { App } from "vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

export function setupAntd(app: App<Element>): void {
  app.use(Antd);
}
```

修改 main.ts 文件

```js
import { createApp } from "vue";
import { setupStore } from "./store"; // 状态管理
import router, { setupRouter } from "./router"; // 路由
import { setupAntd } from "./libs/antdv"; // 新增++
import App from "./App.vue";

const app = createApp(App);

setupRouter(app); // 引入路由
setupStore(app); // 引入状态管理
setupAntd(app); // 新增++

router.isReady().then(() => {
  app.mount("#app");
});
```

警告提示：You are using a whole package of antd, please use https://www.npmjs.com/package/babel-plugin-import to reduce app bundle size. Not support Vite !!!

解决方法：需要进行按需加载，可使用 babel-plugin-import 插件，但是该插件不支持 vite

### （2）手动按需引入

修改 antdv.ts 文件

```js
import type { App } from "vue";
import Button from "ant-design-vue/es/button"; // 加载 JS
import "ant-design-vue/es/button/style/css"; // 加载 CSS
// import 'ant-design-vue/es/button/style';         // 加载 LESS

import Radio from "ant-design-vue/es/radio";
import "ant-design-vue/es/radio/style/css";
import Checkbox from "ant-design-vue/es/checkbox";
import "ant-design-vue/es/checkbox/style/css";

export function setupAntd(app: App<Element>): void {
  app.use(Button);
  app.use(Radio);
  app.use(Checkbox);
}
```

### （3）使用插件按需引入

按照上面的方式按需引入，每一个都要单独写，有点麻烦。因此采用 vite-plugin-imp 插件帮我们引入，实现效果是一样的。

参看文档：[https://github.com/vitejs/vite/issues/1389](https://github.com/vitejs/vite/issues/1389)

安装 vite-plugin-imp

```bash
$ npm i vite-plugin-imp -D
```

修改 vite.config.ts 文件

```js
import { defineConfig } from "vite";
import vitePluginImp from "vite-plugin-imp";

export default defineConfig({
  plugins: [
    vue(),
    vitePluginImp({
      libList: [
        {
          libName: "ant-design-vue",
          // style: (name) => `ant-design-vue/es/${name}/style/css`, // 加载css
          style: (name) => `ant-design-vue/es/${name}/style`, // 加载less
        },
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        // 自定义定制主题
        modifyVars: { "primary-color": "#1188ff" },
        javascriptEnabled: true,
      },
    },
  },
});
```

加载 less 文件时，需要安装 less 依赖，此时可以自定义主题样式，覆盖默认的样式；加载 css 文件，则不需要安装

```bash
$ npm i less -D
```

修改 antdv.ts 文件

```js
import type { App } from "vue";
import { Button, Radio, Checkbox } from "ant-design-vue";
const components = [Button, Radio, Checkbox];

export function setupAntd(app: App<Element>): void {
  components.forEach((component: any) => {
    app.use(component);
  });
}
```

修改 components/HelloWorld.vue 组件

```html
<a-button type="primary" @click="increment">count is: {{ count }}</a-button>
<a-radio checked>Radio</a-radio>
<a-checkbox checked>Checkbox</a-checkbox>
```

实现效果

![浏览效果](https://github.com/zptime/resources/blob/master/images/shanglv-vite-antdv/antdv.jpg)
