import { defineStore } from "pinia";
import router, { constRoutes, dynamicRoutes, resetRoute } from "router";
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
        routes.forEach((route) => {
          router.addRoute(route);
        });
        this.routes = routes;
        generateMenus(routes);
        resolve(routes);
      });
    },
  },
});
