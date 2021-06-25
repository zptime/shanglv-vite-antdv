import { defineComponent } from 'vue'
// import type { RouteRecordRaw } from 'vue-router'

type Component<T extends any = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>)


export interface AppState {
  count: number
}

export interface SettingsState {
  logo: string,
  title: string,
  collapse: boolean,
}

interface RouteMeta {
  title: string,
  icon: string,
  // auth: string[]
  // isLink?: string
  // isAffix: boolean
  // isHide: boolean
  // isKeepAlive: boolean
  // index: string | number
  // roles?: string[]
}

export interface RouteRecord {
  id: string,
  name?: string,
  meta?: RouteMeta,
  children?: RouteRecord[],
  orderId?: number,
  path?: string
  component?: Component | string
  redirect?: string
}

// @ts-ignore
// export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
//   // id: string,
//   name: string
//   meta: RouteMeta
//   component?: Component | string
//   components?: Component
//   children?: AppRouteRecordRaw[]
//   props?: Recordable
//   fullPath?: string
//   query?: Partial<Recordable>  | undefined
// }

export interface RoutesState {
  routes: Array<object>;
  // routes: Array<AppRouteRecordRaw>,
  menus: Array<object>;
}

// 主接口(顶级类型声明)
export interface RootStateTypes {
  app: AppState
  routes: RoutesState
  settings: SettingsState
}