import type { RouteRecordRaw } from "vue-router";

const Layout = () => import("@/layout/index.vue");

// 动态路由表：根据权限加载
export const dynamicRoutes: RouteRecordRaw[] = [
  {
    path: "/system",
    name: "system",
    component: Layout,
    meta: { title: "系统管理", icon: "DesktopOutlined", role: ["admin"] },
    children: [
      {
        path: "user",
        name: "user",
        meta: { title: "用户列表", icon: "AppstoreOutlined", role: ["admin"] },
        component: () => import("views/system/user/index.vue"),
        children: [
          {
            path: "add",
            name: "userAdd",
            meta: { title: "新增用户", role: ["admin"] },
            component: { template: "<div>新增用户</div>" },
          },
          {
            path: "edit",
            name: "userEdit",
            meta: { title: "编辑用户", role: ["admin"] },
            component: { template: "<div>编辑用户</div>" },
          },
          {
            path: "edit",
            name: "userHidden",
            meta: { title: "隐藏页", role: ["admin"], hidden: true },
            component: { template: "<div>隐藏页</div>" },
          },
        ],
      },
      {
        path: "role",
        name: "role",
        meta: { title: "角色列表", icon: "InboxOutlined", role: ["admin"] },
        component: () => import("views/system/role/index.vue"),
      },
      {
        path: "permission",
        name: "permission",
        meta: { title: "权限列表", icon: "MailOutlined", role: ["admin"] },
        component: () => import("views/system/permission/index.vue"),
      },
    ],
  },
  {
    path: "/result",
    name: "result",
    component: Layout,
    redirect: "/result/200",
    meta: { title: "结果管理", icon: "SettingOutlined", role: ["admin"] },
    children: [
      {
        path: "200",
        name: "200",
        meta: { title: "成功页", role: ["admin"] },
        component: { template: "<div>200页面</div>" },
        children: [
          {
            path: "200",
            name: "one",
            meta: { title: "成功页1", role: ["admin"] },
            component: { template: "<div>200页面111</div>" },
          },
        ],
      },
      {
        path: "500",
        name: "500",
        meta: { title: "失败页", role: ["admin"] },
        component: { template: "<div>500页面</div>" },
      },
    ],
  },
  {
    path: "/components",
    component: Layout,
    name: "components",
    meta: { title: "组件库", icon: "QqOutlined", role: ["admin", "root"] },
    children: [
      {
        path: "table",
        component: { template: "<div>表格展示页</div>" },
        name: "table",
        meta: { title: "表格", role: ["admin", "root"] },
      },
      {
        path: "tree",
        component: { template: "<div>树组件页</div>" },
        name: "tree",
        meta: { title: "树组件", role: ["admin", "root"] },
      },
    ],
  },
  {
    path: "/test",
    name: "test",
    component: Layout,
    redirect: "/test/index",
    meta: {
      title: "权限测试",
      icon: "AppstoreOutlined",
      role: ["admin", "root"],
    },
    children: [
      {
        path: "index",
        component: { template: "<div>权限测试页</div>" },
        name: "testIndex",
        meta: { title: "权限测试页", role: ["admin", "root"] },
      },
    ],
  },
  // 一定要放在最后，且在动态路由中添加，避免所有页面都被拦截到404
  { path: "/:pathMatch(.*)*", redirect: "/404", meta: { hidden: true } },
];
