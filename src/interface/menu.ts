// import { RouteRecord } from "./route";
// export interface MenuRecord extends RouteRecord {}

// 菜单
export interface MenuRecord {
  name: string;
  title: string;
  icon: string;
  child?: MenuRecord[];
}
