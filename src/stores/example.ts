import { defineStore } from "pinia";

export const useExampleStore = defineStore("example", {
  // 声明state
  state: () => ({
    name: "张三",
    count: 18,
  }),
  // 声明getter
  getters: {
    doubleCount(state) {
      return state.count * 2;
    },
    doubleCountPlus() {
      // 传参通过函数的形式
      return (value: number) => {
        // 调用getter直接通过 this
        return this.doubleCount + value;
      };
    },
  },
  // 声明actions
  actions: {
    // 同步任务
    addCount() {
      this.count++;
    },
    // 异步任务
    asyncAddCount(num: number) {
      setTimeout(() => {
        this.count += num;
      }, 3000);
    },
  },
});
