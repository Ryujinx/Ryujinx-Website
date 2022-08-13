const HomePage = () => import("@/views/HomePage.vue");
const DownloadPage = () => import("@/views/DownloadPage.vue");

export default [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "download",
    name: "download",
    component: DownloadPage,
  },
];
