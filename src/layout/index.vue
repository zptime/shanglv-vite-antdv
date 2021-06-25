<template>
  <a-layout style="min-height: 100vh">
    <Sider />
    <a-layout>
      <Header />
      <Main />
      <Footer />
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Sider from "./sider/index.vue";
import Header from "./header/index.vue";
import Main from "./main/index.vue";
import Footer from "./footer/index.vue";

export default defineComponent({
  components: {
    Sider,
    Header,
    Footer,
    Main,
  },
  data() {
    return {};
  },
});
</script>

<style>
</style>
