import { defineStore } from "pinia";
import router, { constRoutes, dynamicRoutes, resetRoute } from "router";
import { useMenuStore } from "./menus";
import { useTabsStore } from "./tabs";

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
        const { generateAccessTabs } = useTabsStore();

        resetRoute();
        routes.forEach((route) => {
          router.addRoute(route);
        });
        this.routes = routes;
        const menus = generateMenus(routes);
        generateAccessTabs(menus);
        resolve(routes);
      });
    },
  },
});
