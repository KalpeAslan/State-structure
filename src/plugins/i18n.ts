import { en } from "../lang/en";
import { ru } from "../lang/ru";
import VueI18n from "vue-i18n";
import Vue from "vue";

Vue.use(VueI18n);

export const i18n = new VueI18n({
  locale: localStorage.getItem("lang") || "ru",
  messages: {
    ru: {
      ...ru,
    },
    en: {
      ...en,
    },
  },
});
