const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  resolve: {
    fallback: {
      crypto: false
    }
  },
  module: {
    parser: {
      javascript: {
        dynamicImportMode: 'eager'
      }
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'ML-KEM.NetCore.Browser.js',
    library: {
      name: 'MLKEMNetCoreBrowser',
      type: 'window'
    },
    clean: true
  }
};
