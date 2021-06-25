import { createRouter, createWebHistory } from "vue-router";
import type { App } from "vue";

const Layout = () => import("@/layout/index.vue");
const About = { template: "<div>About</div>" };
const User = {
  template: `
		<div>
			<h2>User {{ $route.params.id }}</h2>
			<router-view></router-view>
		</div>`
};

const routes = [
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("comps/HelloWorld.vue"),
      }
    ]
  },
  { path: "/about", component: About },
  { path: "/users/:id", component: User }
];

const router = createRouter({
  // createWebHashHistory (hash路由 Hash模式 #)
  // createWebHistory (history路由 HTML5 模式 推荐，需要服务器配置支持)
  // createMemoryHistory 带缓存 history 路由
  // 添加baseUrl，createWebHistory(baseUrl)
  history: createWebHistory(),
  routes,
});

export function setupRouter(app: App<Element>) {
  app.use(router);
}

export default router;
