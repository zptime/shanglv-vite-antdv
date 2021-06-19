<template>
  <a-layout-content style="margin: 0 16px">
    <Breadcrumb />
    <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
      Bill is a cat.
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </a-layout-content>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Breadcrumb from "./breadcrumb.vue";

export default defineComponent({
  components: {
    Breadcrumb,
  },
  data() {
    return {};
  },
});
</script>

<style>
</style>
