<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { onMounted } from "vue";
import { useStore } from "store/index";

export default {
  name: "App",
  setup() {
    onMounted(() => {
      const store = useStore();
      store.dispatch("generateRoutes");
    });
  },
};
</script>

<style></style>
