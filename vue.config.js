module.exports = {
  baseUrl: './',
  outputDir: 'dist',
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.ejs$/,
          use: 'raw-loader'
        }
      ]
    }
  },
};

