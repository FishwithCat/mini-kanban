const webpackMain = require('./webpack.main.production');
const webpackWeb = require('./webpack.web.production')

module.exports = [
    webpackMain,
    webpackWeb
]