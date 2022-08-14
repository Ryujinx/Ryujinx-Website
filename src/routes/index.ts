import { createRouter, createWebHistory } from "vue-router";

import BaseLayout from "@/layouts/BaseLayout.vue";
import BaseHomeLayout from "@/layouts/BaseHomeLayout.vue";
import Children from "./children";
const HomePage = () => import("@/views/HomePage.vue");

export const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "active",
  linkExactActiveClass: "",
  scrollBehavior() {
    window.scrollTo(0, 0);
  },
  routes: [
    {
      path: "/",
      component: BaseHomeLayout,
      children: [
        {
          path: "",
          name: "home",
          component: HomePage
        }
      ]
    },
    {
      path: "/",
      component: BaseLayout,
      children: Children,
    },
  ],
});
