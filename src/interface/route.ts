import { defineComponent } from "vue";
// 1. RouteRecordRaw：官方提供的路由对象数据类型
import type { RouteRecordRaw } from "vue-router";

type Component<T extends any = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import("*.vue")>)
  | (() => Promise<T>);

export interface RouteMeta {
  title?: string; // 标题
  hidden?: boolean; // 是否隐藏
  icon?: string; // 图标
  isKeepAlive?: boolean; // 是否开启keep-alive
  orderId?: string | number; // 序号
  role?: string[]; // 角色
}

// 2. 自定义路由对象数据类型
// Omit 删除指定类型的key返回删除后的接口类型
// export interface RouteRecord extends Omit<RouteRecordRaw, "meta"> {
  export interface RouteRecord {
  id?: string;
  path?: string;
  name?: string;
  meta?: RouteMeta;
  children?: RouteRecord[];
  component?: Component | string;
  redirect?: string;
}
