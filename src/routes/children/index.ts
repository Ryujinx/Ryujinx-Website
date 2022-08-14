const HomePage = () => import("@/views/HomePage.vue");
const DownloadPage = () => import("@/views/DownloadPage.vue");
const ContributePage = () => import("@/views/ContributePage.vue");

export default [
  {
    path: "download",
    name: "download",
    component: DownloadPage,
  },
  {
    path: "contribute",
    name: "contribute",
    component: ContributePage,
  },
];
