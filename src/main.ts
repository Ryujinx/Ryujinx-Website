import { createApp } from "vue";

import { router } from "./routes";
import { i18n } from "@/i18n";

import App from "./App.vue";
import GButton from "@/common/components/generic/GButton.vue";

const app = createApp(App);

app.use(router).use(i18n);
app.component("GButton", GButton);

app.mount("#app");
