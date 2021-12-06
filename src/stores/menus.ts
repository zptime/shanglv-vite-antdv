import { defineStore } from "pinia";
import { RouteRecordRaw } from "vue-router";
import { MenuRecord } from "interface/menu";

// 菜单数据转化
const transMenus = (routes: RouteRecordRaw[]): MenuRecord[] => {
  let result: MenuRecord[] = [];
  routes.forEach((o) => {
    const { name, children } = o;
    if (!(o.meta && o.meta.hidden)) {
      if (children && children.length) {
        o.children = transMenus(children) as unknown as RouteRecordRaw[];
      }
      result.push({
        key: name as string,
        title: o.meta && o.meta.title ? o.meta.title : "",
        icon: o.meta && o.meta.icon ? o.meta.icon : "",
        child: o.children as unknown as MenuRecord[],
      });
    }
  });
  return result;
};

export const useMenuStore = defineStore("menu", {
  state: () => ({
    menus: [] as MenuRecord[],
    selectedMenu: "",
    openMenu: [] as string[],
  }),
  getters: {
    getMenus(state) {
      return state.menus;
    },
  },
  actions: {
    generateMenus(routes: RouteRecordRaw[]) {
      const menus = transMenus(routes);
      this.setMenus(menus);
    },
    setMenus(menus: MenuRecord[]) {
      this.menus = menus;
    },
    getSelectedMenu() {
      return this.selectedMenu
        ? this.selectedMenu
        : localStorage.getItem("selectedMenu")
        ? localStorage.getItem("selectedMenu")
        : "";
    },
    getOpenMenu() {
      return this.openMenu?.length
        ? this.openMenu
        : localStorage.getItem("openMenu")
        ? (localStorage.getItem("openMenu") || "").split(",")
        : [];
    },
    setSelectedMenu(menu = "") {
      localStorage.setItem("selectedMenu", menu);
      this.selectedMenu = menu;
    },
    setOpenMenu(menus: string[] = []) {
      this.openMenu = menus;
      localStorage.setItem("openMenu", menus.toString());
    },
  },
});
