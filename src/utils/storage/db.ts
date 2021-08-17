// 报错函数
export function throwErrorMessage(msg: string): void {
    alert(msg)
}
/**
 * 判断当前类型是否是Symbol
 * @param val 需要判断的值
 * @returns 当前参数是否是symbol
 */
export function isSymbol(val: any): boolean {
  return typeof val === "symbol";
}

/**
 * 判断当前值是否能够呗JSON.stringify识别
 * @param data 需要判断的值
 * @returns 前参数是否可以string化
 */
export function hasStringify(data: any): boolean {
  if (data === undefined) {
    return false;
  }

  if (data instanceof Function) {
    return false;
  }

  if (isSymbol(data)) {
    return false;
  }

  return true;
}

// 当环境支持WebStorage的条件下，初始化默认数据 -> bootStrap
interface StorageBootStrapConfig {
  /** 当前环境 */
  mode: "session" | "local";
  /** 超时时间 */
  timeout: number;
}

interface StorageSaveFormat {
  /** 过期时间 */
  timestamp: number;
  /** @name 数据实体 */
  data: any;
}

// 判断浏览器支持情况，不支持抛出错误
class CustomStorage {
  private readStorage: Storage;
  private config: StorageBootStrapConfig;
  private usage: number; // 已用存储空间
  private quota: number; // 存储总量，3M左右

  constructor() {
    if (!window) {
      throw new Error("当前环境非浏览器，无法消费全局window实例。");
    }
    if (!window.localStorage) {
      throw new Error("当前环境非无法使用localStorage");
    }
    if (!window.sessionStorage) {
      throw new Error("当前环境非无法使用sessionStorage");
    }

    if (window && window.localStorage && window.sessionStorage) {
      this.readStorage = window.localStorage;
    }
  }

  /**
   * 初始化Storage的数据
   * @param config StorageBootStrapConfig
   */
  bootStrap(config: StorageBootStrapConfig): void {
    switch (config.mode) {
      case "session":
        this.readStorage = window.sessionStorage;
        break;

      case "local":
        this.readStorage = window.localStorage;
        break;

      default:
        throwErrorMessage("当前配置的mode未再配置区内，可以检查传入配置。");
        break;
    }
    this.config = config;
  }

  /**
   * 获取所有key
   * @returns 回storage当中所有key集合
   */
  getKeys(): Array<string> {
    return Object.keys(this.readStorage);
  }

  /**
   * 获取所有value
   * @returns 所有数据集合
   */
  getValues() {
    return Object.values(this.readStorage);
  }

  /**
   * 返回当前存储库长度
   * @returns number
   */
  size(): number {
    return this.readStorage.length;
  }

  /**
   * 判断是否存在该属性
   * @param key 需要判断的key
   */
  hasItem(key: string): boolean {
    return this.readStorage.hasOwnProperty(key);
  }

  /**
   * 存入数据
   * @param key 设置当前存储key
   * @param value 设置当前存储value
   */
  setItem(key: string, value) {
    if (hasStringify(value)) {
      const saveData: StorageSaveFormat = {
        timestamp: new Date().getTime(),
        data: value,
      };
      console.log(saveData, "saveData");
      this.readStorage.setItem(key, JSON.stringify(saveData));
    } else {
      throwErrorMessage(
        "需要存储的data不支持JSON.stringify方法，请检查当前数据"
      );
    }
  }

  /**
   * 读取数据
   * @param key 获取当前数据key
   * @returns 存储数据
   */
  getItem<T = any>(key: string): T | null {
    const content: StorageSaveFormat | null = JSON.parse(
      this.readStorage.getItem(key)
    );
    // ocalStorage如果不是主动清除，存储数据是不会过期的
    // 获取时间的时候，会进行一个简单的判断，当前时间 - 存储时间 >= 过期时间
    if (
      content?.timestamp &&
      new Date().getTime() - content.timestamp >= this.config.timeout
    ) {
      this.removeItem(key);
      return null;
    }
    return content?.data || null;
  }

  /**
   * 移除一条数据
   * @param key 移除key
   */
  removeItem(key: string) {
    if (this.hasItem(key)) {
      this.readStorage.removeItem(key);
    }
  }

  /**
   * 清除存储中所有数据
   */
  clearAll() {
    this.readStorage.clear();
  }

  /**
   * 修改当前存储内容数据
   * @param key 当前存储key
   * @param onChange 修改函数
   * @param baseValue 基础数据
   */
  changeItem<S = any>(
    key: string,
    onChange: (oldValue: S) => S | null,
    baseValue?: any
  ) {
    const data = this.getItem<S>(key);
    this.setItem(key, onChange(data || baseValue));
  }

  // 判断缓存是否溢出
  initCacheSize() {
    if (navigator && navigator.storage) {
        navigator.storage.estimate().then(estimate => {
            console.log(estimate)
        });
    }
  }

  /**
   * 获取当前清除存储空间，并且进行排序
   */
  getClearStorage() {
    const keys: string[] = Object.keys(this.readStorage);
    const db: Array<{
      key: string;
      data: StorageSaveFormat;
    }> = [];
    keys.forEach((name) => {
      const item = this.getItem(name);
      if (item.timestamp) {
        db.push({
          key: name,
          data: item,
        });
      }
    });
    return db.sort((a, b) => {
      return a.data.timestamp - b.data.timestamp;
    });
  }

  /**
   * 容量清理，直到满足存储大小为止
   * 按照时间线将距离当前越久的时间清除
   * 停止条件：总大小(quota) - (使用大小)usage > [当前存入大小currentSize]
   */
  detectionStorageContext(currentSize: number) {
    if (this.usage + currentSize >= this.quota) {
      const storage = this.getClearStorage();
      for (let { key, data } of storage) {
        // 如果满足要求就跳出，还不够就继续清除。
        if (this.usage + currentSize < this.quota) break;
        // 刷新容量大小
        this.removeItem(key);
        // initCacheSize();
      }
    }
  }
}

/**
 * 实例化当前Storage下的class
 */
export default CustomStorage;
