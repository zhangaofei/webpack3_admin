'use strict'
// Template version: 1.2.6
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      //
      // '/es-management': {
      //     target:'http://192.168.32.181:8003/es-management/',
      //     changeOrigin: true,
      //     secure: false,
      //     pathRewrite: {                //需要rewrite重写的, 如果在服务器端做了处理则可以不要这段
      //         '^/es-management': ''
      //     }
      // },
      '/api': {

        // target:'http://192.168.5.168:9225/api/',//秋雨ip
        // target:'https://192.168.63.174:9443/api/',
        target:'https://192.168.100.90:9443/api/',
        // target:'https://192.168.32.181:8003/api/',

        // target:'http://192.168.5.187:9226/api/',

        // target:'http://192.168.5.36:9226/api/',
        // target:'http://202.206.108.10:8002/api/',
        // target:'https://192.168.32.181:9443/api/',

        // target:'http://192.168.5.144:9225/api/',

        // target:'http://192.168.5.145:8080/api/',
        changeOrigin: true,
        secure: false,
        pathRewrite: {                //需要rewrite重写的, 如果在服务器端做了处理则可以不要这段
          '^/api': ''
        }
      },
      // 192.168.32.181:8003/es-management/api/appLibrary/list
      '/es-management': {
        // target:'http://192.168.32.181:8003/es-management/',
        target:'http://192.168.100.90:8001/es-management/',
        // target:'https://192.168.32.179:9443/es-management/',
        changeOrigin: true,
        secure: false,
        pathRewrite: {                //需要rewrite重写的, 如果在服务器端做了处理则可以不要这段
          '^/es-management': ''
        }
      },
      '/enlink': {
        target:'https://192.168.100.90:9443/enlink/',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/enlink': ''
        }
      },
      '/logs': {
        // target:'http://192.168.32.181:8002/logs/',
        target:'http://192.168.100.90:9443/logs/',
        changeOrigin: true,
        secure: false,
        pathRewrite: {                //需要rewrite重写的, 如果在服务器端做了处理则可以不要这段
          '^/logs': ''
        }
      },
      '/eslocal': {
        // target:'http://192.168.32.179:9443/eslocal/',
        target:'http://192.168.100.90:8003/eslocal/',
        // target:'http://192.168.32.181:8001/eslocal/',
        changeOrigin: true,
        secure: false,
        pathRewrite: {                //需要rewrite重写的, 如果在服务器端做了处理则可以不要这段
          '^/eslocal': ''
        }
      },
      '/server': {
        // target:'https://192.168.32.181:9443/server/',
        target:'https://192.168.100.90:9443/server/',
        // target:'https://192.168.32.181:8003/server/',
        changeOrigin: true,
        secure: false,
        pathRewrite: {                //需要rewrite重写的, 如果在服务器端做了处理则可以不要这段
          '^/server': ''
        }
      },
      '/resource': {
        target:'https://192.168.100.90:9443/resource/',
        // target:'https://192.168.32.179:9443/resource/',
        // target:'https://192.168.32.181:9443/resource/',
        // target:'https://192.168.32.179:9443/resource/',

        // target:'https://192.168.32.181:8003/resource/',
        changeOrigin: true,
        secure: false,
        pathRewrite: {                //需要rewrite重写的, 如果在服务器端做了处理则可以不要这段
          '^/resource': ''
        }
      }

    },

    // Various Dev Server settings

    // can be overwritten by process.env.HOST
    // if you want dev by ip, please set host: '0.0.0.0'
    host: 'localhost',
    port: 9550, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    errorOverlay: false,
    notifyOnErrors: false,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: false,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: '#cheap-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: '',
    staticPath:'/static/',

    /**
     * You can set by youself according to actual condition
     * You will need to set this if you plan to deploy your site under a sub path,
     * for example GitHub pages. If you plan to deploy your site to https://foo.github.io/bar/,
     * then assetsPublicPath should be set to "/bar/".
     * In most cases please use '/' !!!
     */
    assetsPublicPath: './', // If you are deployed on the root path, please use '/'

    /**
     * Source Maps
     */
    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
