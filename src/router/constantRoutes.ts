import type { RouteRecordRaw } from "vue-router";

const Layout = () => import("@/layout/index.vue");

// 通用路由表
export const constRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: Layout,
    redirect: "/dashboard",
    meta: { title: "首页", icon: "PieChartOutlined" },
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        meta: { title: "首页" },
        component: () => import("comps/HelloWorld.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: { template: "<div>登录页</div>" },
    meta: { title: "登录页", hidden: true },
  },
  {
    path: "/404",
    name: "404",
    component: { template: "<div>404页面</div>" },
    meta: { title: "404", hidden: true },
  },
];
