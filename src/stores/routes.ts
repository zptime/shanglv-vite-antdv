import * as R from "ramda";
import { defineStore } from "pinia";
import { RouteRecordRaw } from "vue-router";
import router, { constRoutes, dynamicRoutes, resetRoute } from "src/router";
import { useMenuStore } from "./menus";

export const useRouteStore = defineStore("route", {
  state: () => ({
    routes: constRoutes,
  }),
  getters: {
    getRoutes(state) {
      return state.routes;
    },
  },
  actions: {
    generateRoutes() {
      return new Promise((resolve) => {
        const routes = [...constRoutes, ...dynamicRoutes];
        const { generateMenus } = useMenuStore();

        resetRoute();
        R.forEach((route) => {
          router.addRoute(route);
        }, routes);
        this.setRoutes(routes);
        generateMenus(routes);
        resolve(routes);
      });
    },
    setRoutes(routes: RouteRecordRaw[] = []) {
      this.routes = routes;
    },
  },
});
