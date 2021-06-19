import { Module } from 'vuex';
import { SettingsState, RootStateTypes } from '../interface/index';

const settings: Module<SettingsState, RootStateTypes> = {
  state() {
    return {
      logo: "",
      title: "Vite TS Antdv",
      collapse: true,
    }
  },
  getters: {
    logo: (state) => state.logo,
    title: (state) => state.title,
    collapse: (state) => state.collapse,
  },
  mutations: {
    TOOGLE_COLLAPSE(state) {
      state.collapse = !state.collapse
    },
  },
  actions: {
    toggleCollapse({ commit }) {
      commit('TOOGLE_COLLAPSE')
    },
  }
}

export default settings;