import { Module } from 'vuex';
import { AppState, RootStateTypes } from '../interface/index';

const app: Module<AppState, RootStateTypes> = {
  state() {
    return {
      count: 0
    }
  },
  mutations: {
    increment(state: AppState) {
      state.count++
    }
  }
}

export default app;