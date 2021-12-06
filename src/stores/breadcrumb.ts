import { defineStore } from "pinia";
import { MenuRecord } from "interface/menu";
import { useMenuStore } from "stores/menus";

interface BreadcrumbRecord {
  name: string;
  title: string;
}
const initBreadcrumbList = [{ name: "dashboard", title: "首页" }];
const initBreadcrumb = initBreadcrumbList.map((o) => o.name);

export const useBreadcrumbStore = defineStore("breadcrumb", {
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
        const path = this.getBreadcrumb;
        if (menus && menus.length && path && path.length) {
          let node = path.shift();
          let item = menus.find((o) => o.key === node) as MenuRecord;
          result.push({ name: item.key, title: item.title });
          if (item?.child) {
            return this.filterBreadcrumb(item.child, result);
          }
        }
        return result && result.length ? result : initBreadcrumbList;
      };
    },
  },
  // 声明actions
  actions: {
    setBreadcrumb(data: string[]) {
      // console.log("breadcrumbList...", data);
      // localStorage.setItem("breadcrumbList", data);
      this.breadcrumbList = data;
    },
    generateBreadcrumb() {
      const { menus } = useMenuStore();
      this.filterBreadcrumb(menus, []);
    },
  },
});
