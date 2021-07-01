import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
// import eslint from '@rollup/plugin-eslint'
// import vitePluginImp from 'vite-plugin-imp'

const resolve = (dir: string) => path.join(__dirname, dir);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // eslint插件，fix项开启会在启动项目时或者构建项目时修复eslint报错
    // eslint({
    //   include: '**/*.+(vue|js|jsx|ts|tsx)',
    //   fix: false,
    // }),
    vue(),
    // vitePluginImp({
    //   libList: [
    //     {
    //       libName: 'ant-design-vue',
    //       // style: (name) => `ant-design-vue/es/${name}/style/css`, // 加载css
    //       style: (name) => `ant-design-vue/es/${name}/style`, // 加载less
    //     },
    //   ],
    // })
  ],
  base: "/", //开发或生产环境服务的公共基础路径
  build: {
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true, // 去除构建环境的debugger以及console
      },
    },
    // chunk 大小警告的限制（以 kbs 为单位）
    chunkSizeWarningLimit: 1000,
    // 自定义底层的 Rollup 打包配置
    rollupOptions: {
      // 传递给rollup 的配置，用于构建模式
      output: {
        manualChunks(id) {
          // 以下这段代码会根据条件，将符合条件的文件模块打包成特定的chunk文件
          // 将node_modules 中的包切割成单独的chunk，有助于文件的预加载、以及缓存优化
          if (id.includes("node_modules") && id.includes("ant-design-vue")) {
            return "ant-design-vue";
          } else if (id.includes("node_modules") && id.includes("vue")) {
            return "vue-module";
          } else if (id.includes("node_modules")) {
            return "other-module";
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      // '/@src': path.resolve(__dirname, 'src'), // 好多都采用"/"开头，设置别名？？？
      vue: "vue/dist/vue.esm-bundler.js",
      "@": resolve("src"),
      comps: resolve("src/components"),
      apis: resolve("src/apis"),
      views: resolve("src/views"),
      utils: resolve("src/utils"),
      routes: resolve("src/routes"),
      styles: resolve("src/styles"),
      store: resolve("src/store"),
      // '@ant-design/icons-vue/lib/index$': resolve('src/libs/antdvIcons.ts')
    },
  },
  define: {
    // 定义全局常量替换方式：字符串值将直接作为一个表达式，所以如果需要定义一个字符串常量，它需要被显式地引用（例如：通过 JSON.stringify）
    // 'BUILD_TIME': JSON.stringify(moment().format('YYYY-MM-DD HH:mm:ss')),
  },
  // 依赖优化选项
  optimizeDeps: {
    include: [
      // 不是位于node_modules直接目录下的包不会被预构建，使用此选项可强制预构建链接的包
      "@ant-design/icons-vue",
      'ant-design-vue/es/date-picker/locale/zh_CN',
      'ant-design-vue/es/locale/zh_CN',
      '@ant-design-vue/use',
    ],
  },
  css: {
    // 指定传递给 CSS 预处理器的选项
    preprocessorOptions: {
      // 传入全局less变量
      less: {
        // 定制主题
        modifyVars: { "primary-color": "#1188ff" },
        javascriptEnabled: true,
      },
      scss: {
        // 传入全局的scss变量
        additionalData: `$injectedColor: orange;`,
        // additionalData: '@import "./src/styles/variables";'
      },
    },
  },
});
