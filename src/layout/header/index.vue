<template>
  <a-layout-header class="c-header">
    <div class="c-header-top">
      <Icon
        :icon="isCollapse ? 'MenuUnfoldOutlined' : 'MenuFoldOutlined'"
        class="c-header-trigger"
        @click="toggleCollapse"
      />
      <hl-breadcrumb class="c-header-breadcrumb" />
    </div>
    <hl-tabs />
  </a-layout-header>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "store/index";
import HlBreadcrumb from "./breadcrumb.vue";
import HlTabs from "./tabs.vue";

export default defineComponent({
  components: {
    HlBreadcrumb,
    HlTabs,
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
  height: auto;
  line-height: 1;
  &-top {
    display: flex;
    align-items: center;
    height: 56px;
  }
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
