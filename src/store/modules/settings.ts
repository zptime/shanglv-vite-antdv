import { Module } from 'vuex';
import { SettingsState, RootStateTypes } from '../interface/index';

const settings: Module<SettingsState, RootStateTypes> = {
  state() {
    return {
      logo: "GithubOutlined",
      title: "Vite TS Antdv",
      isCollapse: false,
      selectedMenu: [],
      openMenu: [],
    }
  },
  getters: {
    logo: (state) => state.logo,
    title: (state) => state.title,
    isCollapse: (state) => state.isCollapse,
    selectedMenu: (state) => state.selectedMenu,
    openMenu: (state) => state.openMenu,
  },
  mutations: {
    TOOGLE_COLLAPSE(state) {
      state.isCollapse = !state.isCollapse
    },
    SELECTED_MENU(state, data) {
      localStorage.setItem('selectedMenu', data);
      state.selectedMenu = data;
    },
    OPEN_MENU(state, data) {
      localStorage.setItem('openMenu', data);
      state.openMenu = data;
    }
  },
  actions: {
    toggleCollapse({ commit }) {
      commit('TOOGLE_COLLAPSE')
    },
  }
}

export default settings;