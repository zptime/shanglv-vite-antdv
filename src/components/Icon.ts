import { createVNode } from "vue";
// import * as Icons from "@ant-design/icons-vue";
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

export const Icon = (props: { icon: any }) => {
  const { icon } = props;
  return createVNode(Icons[icon]);
};
