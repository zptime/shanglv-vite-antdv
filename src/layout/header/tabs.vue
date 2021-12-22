<template>
  <div class="c-header-tags">
    <div class="cht-tabs">
      <a-tabs
        v-model:activeKye="activeKey"
        type="editable-card"
        hide-add
        @edit="handleEdit"
      >
        <a-tab-pane
          v-for="item in tabList"
          :key="item.id"
          :tab="item.title"
          closable
        >
        </a-tab-pane>
      </a-tabs>
    </div>
    <div class="cht-down">
      <a-dropdown>
        <Icon icon="CaretDownOutlined" />
        <template #overlay>
          <a-menu>
            <a-menu-item>关闭所有</a-menu-item>
            <a-menu-item>关闭其他</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const tabList = ref([
  { id: "1", title: "首页" },
  { id: "2", title: "用户管理" },
  { id: "3", title: "角色管理" },
  { id: "4", title: "菜单管理" },
  { id: "5", title: "成功页" },
  { id: "6", title: "失败页" },
  { id: "7", title: "表格" },
  { id: "8", title: "树组件" },
]);
let activeKey = ref("1");

const handleEdit = (targetKey: string) => {
  tabList.value = tabList.value.filter((o) => o.id !== targetKey);
  // 如果关掉已选中的，则默认最后一个选中
  if (tabList.value.length && activeKey.value === targetKey) {
    activeKey.value = tabList.value[tabList.value.length - 1].id;
  }
  console.log("activeKey", activeKey.value);
};
</script>

<style lang="scss" scoped>
.c-header-tags {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  width: 100%;
  height: 40px;
  border-top: 1px solid #ebebeb;
  position: relative;
  padding-left: 20px;
}

.cht-down {
  width: 40px;
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-left: 1px solid #ebebeb;
}
.cht-tabs {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  border-left: 1px solid #f0f0f0;
  // scoped中的样式穿透，针对scss
  :deep(.ant-tabs-nav) {
    margin-bottom: 0;
  }
  :deep(.ant-tabs-card > .ant-tabs-nav .ant-tabs-tab, .ant-tabs-card
      > div
      > .ant-tabs-nav
      .ant-tabs-tab) {
    border-left: none;
    border-top: none;
    border-bottom: none;
    border-radius: 0;
    padding: 9px 16px;
  }
  :deep(.ant-tabs-card.ant-tabs-top
      > .ant-tabs-nav
      .ant-tabs-tab
      + .ant-tabs-tab, .ant-tabs-card.ant-tabs-bottom
      > .ant-tabs-nav
      .ant-tabs-tab
      + .ant-tabs-tab, .ant-tabs-card.ant-tabs-top
      > div
      > .ant-tabs-nav
      .ant-tabs-tab
      + .ant-tabs-tab, .ant-tabs-card.ant-tabs-bottom
      > div
      > .ant-tabs-nav
      .ant-tabs-tab
      + .ant-tabs-tab) {
    margin-left: 0;
  }
}
</style>
