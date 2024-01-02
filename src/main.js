import "vant/lib/index.css"
import "./assets/styles/main.scss"
import { createApp } from "vue"
import { createPinia } from "pinia"
import { Lazyload, Locale } from "vant"
import ruRU from "vant/es/locale/lang/ru-RU"
import App from "./App.vue"
import router from "./router"

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Lazyload, {
	lazyComponent: true,
});

app.mount("#app");
Locale.use("ru-RU", ruRU);
