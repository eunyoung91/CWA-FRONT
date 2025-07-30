const { defineConfig } = require('@vue/cli-service')
const fs = require('fs')
const path = require('path')

module.exports = defineConfig({
  devServer: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'ssl', 'localhost-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'ssl', 'localhost-cert.pem')),
    },
    host: 'localhost',
    port: 8099,
    hot: false,        // HMR 비활성화
    liveReload: false, 
    historyApiFallback: true,
    client: {
      webSocketURL: 'auto://0.0.0.0/ws', 
      overlay: false
    }
  },
  transpileDependencies: true
})
