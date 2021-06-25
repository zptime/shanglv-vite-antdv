<template>
  <a-layout-sider v-model:collapsed="collapsed" collapsible>
    <div class="logo" />
    <Menu />
  </a-layout-sider>
</template>

<script lang="ts">

import { defineComponent, ref } from "vue";
import Menu from "./menu.vue"

export default defineComponent({
  components: {
    Menu,
  },
  data() {
    return {
      collapsed: ref<boolean>(false),
      selectedKeys: ref<string[]>(["1"]),
    };
  },
});
</script>

<style scoped>
.logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}
</style>
