import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#2f80ed",
        secondary: "#414649",
        success: "#27AE60",
        danger: "#F2994A",
      },
      dark: {
        secondary: "#E91E63",
      },
    },
  },
  icons: {
    iconfont: "mdiSvg",
  },
});
