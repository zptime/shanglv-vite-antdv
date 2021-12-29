// 实现思路：
// 1. 监听$route的变化，动态加载签页(openTab)：已存在时，激活当前标签页；不存在时，加入标签页列表(tabs)
// 2. 关闭标签页(closeTab, closeAllTab, closeOtherTab)，从标签页列表中删除。注意，首页是一直存在的，不能删除

import * as R from "ramda";
import { defineStore } from "pinia";
import { forEach } from "ramda";
import { useMenuStore } from "./menus";

interface TabRecord {
  name: string; // 关键字
  title: string; // 标题
  closable?: boolean; // 隐藏关闭按钮；首页不能删除
}
const initData = [{ name: "dashboard", title: "首页", closable: false }];
const flattenMenu = (menus, result = []) => {
  R.forEach((menu) => {
    result.push(R.pick(["name", "title"], menu));
    if (menu.child && menu.child.length) {
      result = R.concat(result, flattenMenu(menu.child));
    }
  }, menus);
  return result;
};

export const useTabsStore = defineStore("tabs", {
  state: () => ({
    tabs: initData, // 打开的标签
    accessTabs: [], // 所有的标签
    accessTabsKey: [], // 所有标签的key集合
  }),
  getters: {
    getTabs(state) {
      return state.tabs;
    },
  },
  actions: {
    // 设置所有的标签：由菜单转化而来
    generateAccessTabs(menus) {
      this.accessTabs = flattenMenu(menus);
      this.accessTabsKey = R.map((o) => o.name, this.accessTabs);
      // console.log("accessTabs", this.accessTabs, this.accessTabsKey);
    },
    // 打开新标签页
    openTab(key: string) {
      const index = R.findIndex(R.propEq("name", key), this.tabs);
      if (index > -1) {
        // 已存在标签数据中，更新数据
        this.tabs = this.tabs.splice(index, 1, this.tabs[index]);
      } else {
        // 不存在时，加入数据
        const tab = R.find(R.propEq("name", key), this.accessTabs);
        this.tabs.push(tab);
      }
    },
    // 关闭某个标签页
    closeTab(key: string) {
      this.tabs = this.tabs.filter((o) => o.name !== key);
    },
    // 关闭所有标签页
    closeAllTab() {},
    // 关闭其他标签页
    closeOtherTab() {},
  },
});
