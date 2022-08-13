import { createRouter, createWebHistory } from "vue-router";

import BaseLayout from "@/layouts/BaseLayout.vue";

import Children from "./children";

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
      component: BaseLayout,
      children: Children,
    },
  ],
});
