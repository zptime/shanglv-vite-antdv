import { Module } from "vuex";
import { RoutesState, RootStateTypes } from "../interface/index";
import { dynamicRoutes } from "../../router";

const routes: Module<RoutesState, RootStateTypes> = {
  state() {
    return {
      routes: dynamicRoutes,
      menus: [],
    };
  },
  getters: {
    logo: (state) => state.routes,
  },
  mutations: {
    SET_ROUTE(state: RoutesState, data) {
      state.routes = data;
    },
    SET_MENU(state: RoutesState, data: any[]) {
      state.menus = data;
    },
  },
  actions: {
    setRoutes({ commit }) {
      commit("SET_ROUTE");
    },
  },
};

export default routes;
