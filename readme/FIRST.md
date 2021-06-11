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

## 2. 引入 Vuex

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
      apis: resolve("src/apis"),
      views: resolve("src/views"),
      utils: resolve("src/utils"),
      routes: resolve("src/routes"),
      styles: resolve("src/styles"),
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

解决办法：在 vscode 里新打开一个以当前项目根目录为顶级目录的窗口；并且改项目文件必须放在第一个。

![解决图示](https://github.com/zptime/resources/blob/master/images/shanglv-vite-antdv/alias.jpg)

网上有好多帖子说，在 tsconfig.json 中配置 baseUrl 和 paths，其实是没有用的。这个问题本质上是插件本身的问题。

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@": ["src/*"],
      "comps/*": ["src/components/*"],
      "apis/*": ["src/apis/*"],
      "views/*": ["src/utils/*"],
      "routes/*": ["src/routes/*"],
      "styles/*": ["src/styles/*"],
      "store/*": ["src/store/*"]
    }
  }
}
```

- 配置后效果展示：

![vuex配置效果](https://github.com/zptime/resources/blob/master/images/shanglv-vite-antdv/vuex.jpg)
