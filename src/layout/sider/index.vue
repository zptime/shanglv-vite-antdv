<template>
  <a-layout-sider v-model:collapsed="isCollapse">
    <Logo />
    <Menu />
  </a-layout-sider>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "store/index";
import Logo from "./logo.vue";
import Menu from "./menu.vue";

export default defineComponent({
  components: {
    Logo,
    Menu,
  },
  setup() {
    const store = useStore();
    const isCollapse = computed(() => store.state.settings.isCollapse);
    console.log("isCollapse", isCollapse.value);

    return {
      isCollapse,
    };
  },
});
</script>

<style></style>
