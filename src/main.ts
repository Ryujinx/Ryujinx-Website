import { createApp } from "vue";

import { router } from "./routes";
import { i18n } from "@/i18n";

import App from "./App.vue";

createApp(App).use(router).use(i18n).mount("#app");
