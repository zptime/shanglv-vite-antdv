import * as R from "ramda";
import { Module } from "vuex";
import type { RouteRecordRaw } from "vue-router";
import { RoutesState, RootStateTypes } from "../interface/index";
import router, { resetRoute } from "../../router";
import { constRoutes } from "../../router/constantRoutes";
import { dynamicRoutes } from "../../router/dynamicRoutes";

const routes: Module<RoutesState, RootStateTypes> = {
  state() {
    return {
      routes: constRoutes,
      menus: [],
    };
  },
  getters: {
    routes: (state) => state.routes,
  },
  mutations: {
    SET_ROUTE(state: RoutesState, data: any[]) {
      state.routes = data;
    },
    SET_MENU(state: RoutesState, data: any[]) {
      state.menus = data;
    },
  },
  actions: {
    generateRoutes({ commit }, roles) {
      return new Promise((resolve) => {
        let routes = R.concat(constRoutes, dynamicRoutes);
        let menus = generateMenu(routes);
        resetRoute();
        R.forEach((route: RouteRecordRaw) => {
          router.addRoute(route);
        }, routes);
        commit("SET_ROUTE", routes);
        commit("SET_MENU", menus);
        resolve(routes);
      });
    },
  },
};

export default routes;

/* =========== helps ============= */
// 生成菜单
const generateMenu = (routes: any) => {
  const menus = R.filter((o: any) => {
    if (o.meta && o.meta.hidden) {
      return false;
    } else {
      if (o.children && o.children.length) {
        o.children = generateMenu(o.children);
      }
      return o;
    }
  }, routes);
  return menus;
};
