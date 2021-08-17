// 掘金文档：https://juejin.cn/post/6984908770149138446

// 使用举例
import CustomStorage from "./db";

const customStorage = new CustomStorage()

customStorage.bootStrap({
  mode: 'local',
  timeout: 3000,
})

export default customStorage

/* ===== 使用举例 start ===== */
// 获取存储库长度
customStorage.size()
// 判断是否存在某属性
customStorage.hasItem('setItem')
// 获取所有key
customStorage.getKeys()
// 获取所有value
customStorage.getValues()
// 存入数据
customStorage.setItem('setItem', [1])
// 读取数据
customStorage.getItem('setItem') // [1]
// 移除数据
customStorage.removeItem('setItem')
// 修改数据
customStorage.changeItem('key', (oldValue) => {
    return oldValue + 'newUpadte'
})
/* ===== 使用举例 end ===== */
