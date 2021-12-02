import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import ViteComponents, { AntDesignVueResolver } from "vite-plugin-components";

const resolve = (dir: string) => path.join(__dirname, dir);

export default defineConfig({
  plugins: [
    vue(),
    ViteComponents({
      // ts支持
      globalComponentsDeclaration: true,
      // 组件库导入处理
      customComponentResolvers: [AntDesignVueResolver()],
    }),
  ],
  resolve: {
    alias: {
      vue: "vue/dist/vue.esm-bundler.js",
      "@": resolve("src"),
      comps: resolve("src/components"),
      apis: resolve("src/apis"),
      views: resolve("src/views"),
      utils: resolve("src/utils"),
      routes: resolve("src/routes"),
      styles: resolve("src/styles"),
      store: resolve("src/store"),
      stores: resolve("src/stores"),
      interface: resolve("src/interface"),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        // 定制主题
        modifyVars: { "primary-color": "#1188ff" },
        javascriptEnabled: true,
      },
    },
  },
});
