// （1）全局引入
import type { App } from "vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

export function setupAntd(app: App<Element>): void {
  app.use(Antd);
}

// （2）手动按需引入
// import type { App } from "vue";
// import Button from "ant-design-vue/es/button"; // 加载 JS
// import "ant-design-vue/es/button/style/css"; // 加载 CSS
// // import 'ant-design-vue/es/button/style';         // 加载 LESS

// import Radio from "ant-design-vue/es/radio";
// import "ant-design-vue/es/radio/style/css";
// import Checkbox from "ant-design-vue/es/checkbox";
// import "ant-design-vue/es/checkbox/style/css";

// export function setupAntd(app: App<Element>): void {
//   app.use(Button);
//   app.use(Radio);
//   app.use(Checkbox);
// }

// （3）使用插件按需引入
// import type { App } from "vue";
// import { Button, Radio, Checkbox } from "ant-design-vue";
// const components = [Button, Radio, Checkbox];

// export function setupAntd(app: App<Element>): void {
//   components.forEach((component: any) => {
//     app.use(component);
//   });
// }
