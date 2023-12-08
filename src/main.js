import "./assets/main.css";
import "vant/lib/index.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import { Locale } from "vant";
import ruRU from "vant/es/locale/lang/ru-RU";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
Locale.use("ru-RU", ruRU);
