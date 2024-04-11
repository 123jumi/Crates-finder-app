import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createBootstrap } from "bootstrap-vue-next";

import App from './App.vue'
import router from './router'

import "@/assets/sass/styles.sass";

const app = createApp(App)
app.use(createBootstrap()).use(createPinia()).use(router).mount("#app");
