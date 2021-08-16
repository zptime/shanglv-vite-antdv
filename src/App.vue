<template>
  <router-view />
</template>

<script lang="ts">
  import { useStore } from "store/index";

  export default {
    name: "App",
    setup: () => {
      const store = useStore();
      store.dispatch("generateRoutes");
    },
  };
</script>

<style></style>
