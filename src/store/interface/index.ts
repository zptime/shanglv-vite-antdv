export interface AppState {
  count: number
}
export interface SettingsState {
  logo: string,
  title: string,
  isCollapse: boolean,
}
export interface RoutesState {
  routes: Array<object>;
  menus: Array<object>;
}

// 主接口(顶级类型声明)
export interface RootStateTypes {
  app: AppState
  routes: RoutesState
  settings: SettingsState
}
