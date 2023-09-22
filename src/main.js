import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import '@/assets/css/index.css'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
const app = createApp(App).use(store).use(router).use(Antd)

app.config.globalProperties.$axios = axios

app.mount("#app")