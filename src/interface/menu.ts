// import { RouteRecord } from "./route";
// export interface MenuRecord extends RouteRecord {}

// 菜单
export interface MenuRecord {
  key: string;
  title: string;
  icon: string;
  child?: MenuRecord[];
}
