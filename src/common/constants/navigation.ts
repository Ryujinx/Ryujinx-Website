import { NavigationNode } from "@/types";
import { i18n } from "@/i18n";

console.log()

export const navigations: NavigationNode[] = [
  {
    name : i18n.global.t("navigations.blog"),
    href: import.meta.env.VITE_BLOG_URL as string
  },
  {
    name : i18n.global.t("navigations.download"),
    to: "download"
  },
  {
    name : i18n.global.t("navigations.guide"),
    href: import.meta.env.VITE_GUIDE_URL
  },
  {
    name : i18n.global.t("navigations.faq"),
    href: import.meta.env.VITE_FAQ_URL
  },
  {
    name : i18n.global.t("navigations.compatibility"),
    href: import.meta.env.VITE_COMPATIBILITY_URL
  }
];
