import "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    title?: string; // 标题
    hidden?: boolean; // 是否隐藏
    icon?: string; // 图标
    isKeepAlive?: boolean; // 是否开启keep-alive
    orderId?: string | number; // 序号
    role?: string[]; // 角色
  }
}
