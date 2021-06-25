import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// import vitePluginImp from 'vite-plugin-imp'

const resolve = (dir: string) => path.join(__dirname, dir)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
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
  resolve: {
		alias: {
			vue: "vue/dist/vue.esm-bundler.js",
			'@': resolve('src'),
			comps: resolve('src/components'),
			apis: resolve('src/apis'),
			views: resolve('src/views'),
			utils: resolve('src/utils'),
			routes: resolve('src/routes'),
			styles: resolve('src/styles'),
			store: resolve('src/store')
		}
	},
	// css: {
  //   preprocessorOptions: {
  //     less: {
	// 			// 定制主题
  //       modifyVars: { 'primary-color': '#1188ff' },
  //       javascriptEnabled: true,
  //     },
  //   },
  // },
})
