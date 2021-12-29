import { defineStore } from "pinia";
import { MenuRecord } from "interface/menu";
import { useMenuStore } from "stores/menus";

interface BreadcrumbRecord {
  name: string;
  title: string;
}
const initBreadcrumbList = [{ name: "dashboard", title: "首页" }];
const initBreadcrumb = initBreadcrumbList.map((o) => o.name);
const filterBreadcrumb = (
  breadcrumbList: string[] = [],
  menus: MenuRecord[] = [],
  result: BreadcrumbRecord[] = []
): BreadcrumbRecord[] => {
  const path = breadcrumbList;
  if (menus && menus.length && path && path.length) {
    let node = path.shift();
    let item = menus.find((o) => o.name === node) as MenuRecord;
    result.push({ name: item.name, title: item.title });
    if (item?.child?.length) {
      return filterBreadcrumb(path, item.child, result);
    }
  }
  result = result && result.length ? result : initBreadcrumbList;
  return result;
};
const { menus } = useMenuStore();

export const useBreadcrumbStore = defineStore("breadcrumb", {
  state: () => ({
    breadcrumbList: initBreadcrumb,
  }),
  actions: {
    setBreadcrumb(data: string[]) {
      // localStorage.setItem("breadcrumbList", data);
      this.breadcrumbList = data;
    },
    generateBreadcrumb() {
      // console.log("generateBreadcrumb", menus);
      // let result = filterBreadcrumb(["system", "user", "userList"], menus, []);
      let result = filterBreadcrumb(this.breadcrumbList, menus, []);
      console.log("generateBreadcrumb", result, menus);
      return result;
    },
  },
});
