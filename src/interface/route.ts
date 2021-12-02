import { defineComponent } from "vue";

type Component<T extends any = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import("*.vue")>)
  | (() => Promise<T>);

export interface RouteMeta {
  title: string; // 标题
  hidden: boolean; // 是否隐藏
  icon: string; // 图标
  isKeepAlive?: boolean; // 是否开启keep-alive
  orderId?: string | number; // 序号
}

export interface RouteRecord {
  id?: string;
  name?: string;
  meta?: RouteMeta;
  children?: RouteRecord[];
  orderId?: number;
  path?: string;
  component?: Component | string;
  redirect?: string;
}
