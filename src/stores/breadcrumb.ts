import { defineStore } from "pinia";
import { MenuRecord } from "interface/menu";

export interface BreadcrumbRecord {
  name: string;
  title: string;
}
const initBreadcrumbList = [{ name: "dashboard", title: "首页" }];
const initBreadcrumb = initBreadcrumbList.map((o) => o.name);

export const useBreadcrumbStore = defineStore("breadcrumb", {
  // 声明state
  state: () => ({
    breadcrumbList: initBreadcrumb,
  }),
  // 声明getter
  getters: {
    getBreadcrumb(state) {
      return state.breadcrumbList;
    },
    filterBreadcrumb() {
      return (
        menus: MenuRecord[] = [],
        result: BreadcrumbRecord[] = []
      ): BreadcrumbRecord[] => {
        // debugger;
        const path = this.getBreadcrumb;
        if (menus && menus.length && path && path.length) {
          let node = path.shift();
          let item = menus.find((o) => o.name === node);
          result.push({ name: item.name, title: item.meta.title });
          if (item?.children) {
            return this.filterBreadcrumb(item.children, result);
          }
        }
        return result && result.length ? result : initBreadcrumbList;
      };
    },
  },
  // 声明actions
  actions: {
    setBreadcrumb(data: string[]) {
      console.log("breadcrumbList...", data);
      this.breadcrumbList = data;
    },
  },
});
