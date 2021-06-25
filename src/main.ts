import { createApp } from "vue";
import { setupStore } from "./store"; // 状态管理
import router, { setupRouter } from "./router"; // 路由
import { setupAntd } from "./libs/antdv"; // 组件库
import App from "./App.vue";

const app = createApp(App);

setupRouter(app); // 引入路由
setupStore(app); // 引入状态管理
setupAntd(app); // 引入组件库

router.isReady().then(() => {
  app.mount("#app");
});