import { defineStore } from "pinia";
import { RouteRecordRaw } from "vue-router";
import { MenuRecord } from "interface/menu";

const filterMenus = (routes: RouteRecordRaw[]): MenuRecord[] => {
  let result: MenuRecord[] = [];
  routes.forEach((o) => {
    const { name, children } = o;
    if (!(o.meta && o.meta.hidden)) {
      if (children && children.length) {
        o.children = filterMenus(children) as unknown as RouteRecordRaw[];
      }
      result.push({
        key: name as string,
        title: o.meta && o.meta.title ? o.meta.title : "",
        icon: o.meta && o.meta.title ? o.meta.title : "",
        child: o.children as unknown as MenuRecord[],
      });
    }
  });
  return result;
};

export const useMenuStore = defineStore("menu", {
  state: () => ({
    menus: [] as MenuRecord[],
  }),
  getters: {
    getMenus(state) {
      return state.menus;
    },
  },
  actions: {
    generateMenus(routes: RouteRecordRaw[]) {
      const menus = filterMenus(routes);
      this.setMenus(menus);
    },
    setMenus(menus: MenuRecord[]) {
      this.menus = menus;
    },
  },
});
