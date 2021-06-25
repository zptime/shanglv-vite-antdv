import * as R from "ramda";
import { Module } from "vuex";
import type { RouteRecordRaw } from "vue-router";
import { RoutesState, RootStateTypes } from "../interface/index";
import router, { constRoutes, dynamicRoutes, resetRoute } from "../../router";

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
      state.routes = R.concat(constRoutes, data);
    },
    SET_MENU(state: RoutesState, data: any[]) {
      state.menus = generateMenu(data);
    },
  },
  actions: {
    generateRoutes({ commit }, roles) {
      return new Promise((resolve) => {
        let routes = R.concat(constRoutes, dynamicRoutes);
        resetRoute();
        R.forEach((route: RouteRecordRaw) => {
          router.addRoute(route);
        }, routes);
        commit("SET_MENU", routes);
        commit("SET_ROUTE", dynamicRoutes);
        resolve(routes);
      });
    },
  },
};

export default routes;

/* =========== helps ============= */
//
const hasPermission = (roles: string[], route: any) => {
  if (route.meta && route.meta.role) {
    return roles.some((role: string) => route.meta.role.indexOf(role) >= 0);
  } else {
    return true;
  }
};

// 根据角色清洗路由表
const cleanRotes = (routes: any, roles: string[]) => {
  const accessRoutes = R.filter((v: any) => {
    if (roles && roles.indexOf("admin") >= 0) return true;
    if (hasPermission(roles, v)) {
      if (v.children && v.children.length > 0) {
        v.children = R.filter((child: any) => {
          if (hasPermission(roles, child)) {
            return child;
          }
          return false;
        }, v.children);
        return v;
      } else {
        return v;
      }
    }
  }, routes);
  return accessRoutes;
};

// 生成菜单
const generateMenu = (routes: any) => {
  return [];
};
