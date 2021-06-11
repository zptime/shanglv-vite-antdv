import { createApp } from 'vue'
import { setupStore } from './store' // 状态管理
import App from './App.vue'

const app = createApp(App)

setupStore(app) // 引入状态管理

app.mount('#app')