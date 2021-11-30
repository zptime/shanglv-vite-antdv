<template>
  <a-layout-header class="c-header">
    <Icon
      :icon="isCollapse ? 'MenuUnfoldOutlined' : 'MenuFoldOutlined'"
      class="c-header-trigger"
      @click="toggleCollapse"
    />
    <Breadcrumb class="c-header-breadcrumb" />
  </a-layout-header>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "store/index";
import Breadcrumb from "../header/breadcrumb.vue";

export default defineComponent({
  components: {
    Breadcrumb,
  },
  setup() {
    const store = useStore();
    const isCollapse = computed(() => store.state.settings.isCollapse);
    const toggleCollapse = () => {
      store.commit("TOGGLE_COLLAPSE");
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
.c-header {
  background: #fff;
  padding: 0;
  display: flex;
  align-items: center;
  &-trigger {
    font-size: 18px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: #1890ff;
    }
  }
  &-breadcrumb {
    flex: 1;
  }
}
</style>
