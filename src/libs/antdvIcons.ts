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
