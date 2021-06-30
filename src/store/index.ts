import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import type { App } from "vue";

import { RootStateTypes } from "./interface/index";
import app from "./modules/app";
import routes from "./modules/routes";
import settings from "./modules/settings";

// 定义注入类型
const key: InjectionKey<Store<RootStateTypes>> = Symbol();

const store = createStore<RootStateTypes>({
  modules: {
    app,
    routes,
    settings,
  },
});

// 将类型注入useStore
// 以后项目中引用的均为自定义的这个，而不是vuex默认导出的useStore
export function useStore() {
  return baseUseStore(key);
}

export function setupStore(app: App<Element>) {
  app.use(store, key);
}

export default store;