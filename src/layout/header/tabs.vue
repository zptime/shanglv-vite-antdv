<template>
  <div class="c-header-tags">
    <div class="cht-tabs">
      <a-tabs
        v-model:activeKey="activeKey"
        type="editable-card"
        hide-add
        @change="handleChange"
        @edit="handleClose"
      >
        <a-tab-pane
          v-for="item in tabList"
          :key="item.name"
          :tab="item.title"
          :closable="item.closable"
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
import { ref, computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useTabsStore } from "stores/tabs";

const { getTabs, closeTab, openTab } = useTabsStore();

// tabList数据的实现：监听route的变化，添加数据
const tabList = computed(() => {
  return getTabs;
});
const activeKey = ref(tabList.value[0].name);

// 官网地址：[在 setup 中访问路由和当前路由](https://next.router.vuejs.org/zh/guide/advanced/composition-api.html)
const router = useRouter();
const route = useRoute();

// 1. 添加标签页，通过监听路由实现
// route对象是一个响应式对象，避免监听整个对象
watch(
  () => route.name,
  (newName) => {
    if (newName) {
      openTab(newName as string);
      activeKey.value = newName;
    }
  }
);

// 2. 关闭标签页
const handleClose = (targetKey: string) => {
  closeTab(targetKey);
};

// 3. 选中标签页
const handleChange = (targetKey: string) => {
  // 继续当前选中，不处理
  // if (activeKey.value === targetKey) return false;

  // 否则，更改选中标签页
  // activeKey.value === targetKey;
  router.push({
    name: targetKey,
  });
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
