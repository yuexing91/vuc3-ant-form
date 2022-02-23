const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
//  publicPath:'/yuexing91.github.io/vuc3-ant-form',
  lintOnSave: false,
  configureWebpack(config) {
//    config.resolve.alias.vuc3 = path.resolve(__dirname, 'vuc3/')
    if (process.env.NODE_ENV !== 'production') {
      config.entry = ['./example/main.js'];
    } else {
      config.externals = [nodeExternals()];
    }
  },
};
