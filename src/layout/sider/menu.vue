<template>
  <a-menu
    :default-selected-keys="['1']"
    :default-open-keys="['2']"
    mode="inline"
    theme="dark"
  >
    <template v-for="item in menus" :key="item.name">
      <template v-if="!item.children">
        <a-menu-item :key="item.name">
          <PieChartOutlined />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
      </template>
      <template v-else>
        <SubMenu :menu-info="item" :key="item.name" />
      </template>
    </template>
  </a-menu>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useStore } from 'store/index'
import SubMenu from "./subMenu.vue"
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons-vue";

export default defineComponent({
  setup() {
    const store = useStore()
    const collapsed = ref<boolean>(false);

    const toggleCollapsed = () => {
      collapsed.value = !collapsed.value;
    };

    return {
      menus: computed(() => store.state.routes.routes),
      collapsed,
      toggleCollapsed,
    };
  },
  components: {
    SubMenu,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
  },
});
</script>

