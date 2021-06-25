// 参考文档：https://segmentfault.com/a/1190000038704028
// 参考文档：https://qdmana.com/2021/03/20210319154547214O.html
import type { App } from "vue";
// import { createVNode } from "vue";

// 全部引入
// import * as Icons from "@ant-design/icons-vue";

// 按需引入
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MailOutlined,
} from "@ant-design/icons-vue";
const Icons = [
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MailOutlined,
];

// const Icon = (props: { icon: any }) => {
//   const { icon } = props;
//   return createVNode(Icons[icon]);
// };

export function setupAntdIcon(app: App<Element>): void {
  // app.component('Icon', Icon);
  Icons.forEach((icon: any) => {
    app.component(icon, icon);
  });
}

// export { default as PieChartOutlined } from "@ant-design/icons-vue/lib/icons/PieChartOutlined";
// export { default as DesktopOutlined } from "@ant-design/icons-vue/lib/icons/DesktopOutlined";
// export { default as UserOutlined } from "@ant-design/icons-vue/lib/icons/DesktopOutlined";
// export { default as TeamOutlined } from "@ant-design/icons-vue/lib/icons/DesktopOutlined";
// export { default as FileOutlined } from "@ant-design/icons-vue/lib/icons/DesktopOutlined";
// export { default as MenuFoldOutlined } from "@ant-design/icons-vue/lib/icons/DesktopOutlined";
// export { default as MenuUnfoldOutlined } from "@ant-design/icons-vue/lib/icons/DesktopOutlined";
// export { default as MailOutlined } from "@ant-design/icons-vue/lib/icons/DesktopOutlined";
