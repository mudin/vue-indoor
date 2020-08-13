module.exports = {
  chainWebpack: config => {
    config.externals({
      indoorjs: 'indoorjs'
    });
  }
};
