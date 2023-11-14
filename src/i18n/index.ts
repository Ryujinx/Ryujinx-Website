import { createI18n } from "vue-i18n";

import { en } from "@/i18n/locales/en";
import { fr } from "@/i18n/locales/fr";
import { availableLanguages } from "@/common/constants/languages";

let locale = "en";

try {
  const storeValue = localStorage.getItem("lang");

  if (storeValue !== null) {
    const lang = JSON.parse(storeValue as string);
    locale = lang.tag;
  } else {
    if (navigator.language.startsWith("fr")) {
      locale = "fr";
      localStorage.setItem("lang", JSON.stringify(availableLanguages[1]));
    } else {
      localStorage.setItem("lang", JSON.stringify(availableLanguages[0]));
    }
  }
} catch (e) {
  console.error("Invalid lang:" + e);
}

export const i18n = createI18n({
  legacy: false,
  locale: locale,
  fallbackLocale: "en",
  messages: {
    en,
    fr,
  },
});
