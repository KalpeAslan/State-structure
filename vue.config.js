const path = require("path");

module.exports = {
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    resolve: {
      extensions: [".ts", ".js", ".vue", ".json"],
      alias: {
        "@": path.join(__dirname, "/src/"),
        "@assets": path.join(__dirname, "/src/assets/"),
        "@services": path.join(__dirname, "/src/services/"),
        vue$: "vue/dist/vue.esm.js",
      },
    },
  },
    lintOnSave: false

};
