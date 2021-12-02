// （1）全局引入
import type { App } from "vue";
import AntDesign from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

export function setupAntd(app: App<Element>): void {
  app.use(AntDesign);
}