import { defineStore } from "pinia";
import { RouteRecordRaw } from "vue-router";
import { MenuRecord } from "interface/menu";

// 菜单数据转化
const transMenus = (routes: RouteRecordRaw[]): MenuRecord[] => {
  let result: MenuRecord[] = [];
  routes.forEach((o) => {
    const { name, children } = o;
    // 1. hidden为true的隐藏
    if (!(o.meta && o.meta.hidden)) {
      // 2. 有子路由时，对子路由进行递归处理
      if (children && children.length) {
        o.children = transMenus(children) as unknown as RouteRecordRaw[];
      }
      // 3. 如果只有一个子菜单，仅展示父级菜单，key为子菜单数据
      let flagName = "";
      if (o.children && o.children.length === 1) {
        flagName = o.children[0].name as string;
      }
      result.push({
        name: flagName ? flagName : (name as string),
        title: o.meta && o.meta.title ? o.meta.title : "",
        icon: o.meta && o.meta.icon ? o.meta.icon : "",
        child: flagName ? [] : (o.children as unknown as MenuRecord[]) || [],
      });
    }
  });
  return result;
};

export const useMenuStore = defineStore("menu", {
  state: () => ({
    menus: [] as MenuRecord[],
    selectedMenu: "", // 选中菜单数据
    openMenu: [] as string[], // 展开菜单数据
  }),
  getters: {
    getSelectedMenu(state) {
      return state.selectedMenu
        ? state.selectedMenu
        : localStorage.getItem("selectedMenu")
        ? localStorage.getItem("selectedMenu")
        : "";
    },
    getOpenMenu(state) {
      return state.openMenu?.length
        ? state.openMenu
        : localStorage.getItem("openMenu")
        ? (localStorage.getItem("openMenu") || "").split(",")
        : [];
    },
  },
  actions: {
    generateMenus(routes: RouteRecordRaw[]) {
      const menus = transMenus(routes);
      // console.log("generateMenus", menus);
      this.setMenus(menus);
      return menus;
    },
    setMenus(menus: MenuRecord[]) {
      this.menus = menus;
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
