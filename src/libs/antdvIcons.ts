// （1）图标全局引入
// import type { App } from "vue";
// import * as antIcons from "@ant-design/icons-vue";

// export function setupAntdIcon(app: App<Element>): void {
//   // 注册组件
//   Object.keys(antIcons).forEach((key) => {
//     // 报错：元素隐式具有 "any" 类型，因为类型为 "any" 的表达式不能用于索引类型 "typeof import("e:/MyRemote/shanglv-vite-antdv/node_modules/@ant-design/icons-vue/lib/index")"。
//     // app.component(key, antIcons[key]);
//     app.component(key, antIcons[key as keyof typeof antIcons]);
//   });

//   // 使用组件
//   // <component :is="menu.icon" />
//   // <component is="PieChartOutlined" />
// }

// （2）图标全局引入
// 原文链接：https://segmentfault.com/a/1190000039673424
import type { App } from "vue";
import { createVNode } from "vue";
import * as Icons from "@ant-design/icons-vue";

const Icon = (props: { icon: string }) => {
  const { icon } = props;
  return createVNode(Icons[icon as keyof typeof Icons]);
};

export function setupAntdIcon(app: App<Element>): void {
  // 注册
  app.component("Icon", Icon);

  // 使用组件
  // <Icon icon="DesktopOutlined" />
  // <Icon :icon="menu.icon" />
}