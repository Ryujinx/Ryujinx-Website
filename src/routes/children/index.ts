const HomePage = () => import("@/views/HomePage.vue");

export default [
  {
    path: "/",
    name: "home",
    component: HomePage
  }
]
