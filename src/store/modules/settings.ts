import { Module } from 'vuex';
import { SettingsState, RootStateTypes } from '../interface/index';

const settings: Module<SettingsState, RootStateTypes> = {
  state() {
    return {
      logo: "GithubOutlined",
      title: "Vite TS Antdv",
      isCollapse: false,
    }
  },
  getters: {
    logo: (state) => state.logo,
    title: (state) => state.title,
    isCollapse: (state) => state.isCollapse,
  },
  mutations: {
    TOOGLE_COLLAPSE(state) {
      state.isCollapse = !state.isCollapse
    },
  },
  actions: {
    toggleCollapse({ commit }) {
      commit('TOOGLE_COLLAPSE')
    },
  }
}

export default settings;