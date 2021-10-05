const path = require('path');

module.exports = {
  transpileDependencies: ["vuetify"],
  configureWebpack:{
    resolve: {
      alias: {
        '@': path.join(__dirname, '/src/'),
        '@assets': path.join(__dirname, '/src/assets/'),
        '@services': path.join(__dirname, '/src/services/')
      }
    },
  },
};
