<template>
  <a-layout-header style="background: #fff; padding: 0">
    <menu-unfold-outlined
      v-if="collapsed"
      class="trigger"
      @click="() => (collapsed = !collapsed)"
    />
    <menu-fold-outlined
      v-else
      class="trigger"
      @click="() => (collapsed = !collapsed)"
    />
  </a-layout-header>
</template>

<script lang="ts">

import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  },
  data() {
    return {
      collapsed: ref<boolean>(false),
    };
  },
});
</script>

<style lang="scss" scoped>
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: #1890ff;
  }
}
</style>
