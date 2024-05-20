import "./assets/tailwind.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { createNaverMap } from "vue3-naver-maps";

import App from "./App.vue";
import router from "./router";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

app.use(pinia);
app.use(router);
app.use(createNaverMap, {
  clientId: import.meta.env.VITE_NAVER_MAPS_CLIENT_ID,
  category: "ncp",
  subModules: ["geocoder"],
});

app.mount("#app");
