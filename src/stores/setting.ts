import { defineStore } from "pinia";

export const useSettingStore = defineStore("setting", {
  state: () => ({
    logo: "GithubOutlined",
    title: "Vite TS Antdv",
    isCollapse: false,
  }),
  getters: {},
  actions: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
  },
});
