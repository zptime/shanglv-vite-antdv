import { defineComponent } from 'vue'

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

interface MetaModel {
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

export interface RouteModel {
  id: string,
  name?: string,
  meta?: MetaModel[]
  children?: RouteModel[],
  orderId?: number,
  path?: string
  component?: Component | string
  redirect?: string
}

export interface RoutesState {
  routes: Array<RouteModel>,
  // routes: Array<object>;
  menus: Array<RouteModel>,
}

// 主接口(顶级类型声明)
export interface RootStateTypes {
  app: AppState
  routes: RoutesState
  settings: SettingsState
}