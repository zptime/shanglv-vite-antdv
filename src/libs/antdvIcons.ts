// （1）图标全局引入
// import type { App } from "vue";
// import * as antIcons from "@ant-design/icons-vue";

// export function setupAntdIcon(app: App<Element>): void {
//   // 注册组件
//   Object.keys(antIcons).forEach((key) => {
//     // bad
//     // app.component(key, antIcons[key]);

//     // good
//     app.component(key, antIcons[key as keyof typeof antIcons]);
//   });

//   // 使用组件
//   // <component :is="menu.icon" />
//   // <component is="PieChartOutlined" />
// }


// （2）图标全局引入：
import type { App } from "vue";
import { createVNode } from "vue";
import * as Icons from "@ant-design/icons-vue";

const Icon = (props: { icon: string }) => {
  const { icon } = props;
  // bad
  // return createVNode(Icons[icon]);

  // good
  return createVNode(Icons[icon as keyof typeof Icons]);
};

export function setupAntdIcon(app: App<Element>): void {
  // 注册
  app.component("Icon", Icon);

  // 使用组件
  // <Icon icon="DesktopOutlined" />
  // <Icon :icon="menu.icon" />
}
