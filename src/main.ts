import { createApp } from "vue";
import { setupStore } from "./store"; // 状态管理
import router, { setupRouter } from "./router"; // 路由
import { setupAntd } from "./libs/antdv"; // 组件管理
import { setupAntdIcon } from "./libs/antdvIcons"; // 图标库
import { createPinia } from "pinia";
import App from "./App.vue";

const app = createApp(App);

setupRouter(app); // 引入路由
setupStore(app); // 引入状态管理
setupAntd(app); // 引入组件库
setupAntdIcon(app); // 引入组件库
app.use(createPinia());

router.isReady().then(() => {
  app.mount("#app");
});
