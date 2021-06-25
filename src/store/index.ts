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

const store = createStore<State>({
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
