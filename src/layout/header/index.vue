<template>
  <a-layout-header style="background: #fff; padding: 0">
    <Icon
      icon="MenuUnfoldOutlined"
      v-if="isCollapse"
      class="trigger"
      @click="toggleCollapse"
    />
    <Icon
      icon="MenuFoldOutlined"
      v-else
      class="trigger"
      @click="toggleCollapse"
    />
  </a-layout-header>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "store/index";

export default defineComponent({
  setup() {
    const store = useStore();
    const isCollapse = computed(() => store.state.settings.isCollapse);
    const toggleCollapse = () => {
      store.commit("TOOGLE_COLLAPSE");
      // console.log("isCollapse...", isCollapse.value);
    };

    return {
      isCollapse,
      toggleCollapse,
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
