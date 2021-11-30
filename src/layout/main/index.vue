<template>
  <a-layout-content class="c-main">
    <div class="c-main-content">
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

export default defineComponent({
  data() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.c-main {
  margin: 20px;
  &-content {
    padding: 24px;
    background: #fff;
    min-height: 360px;
  }
}
</style>
