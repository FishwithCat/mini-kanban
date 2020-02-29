const webpackMain = require('./webpack.main');
const webpackWeb = require('./webpack.web.production')

module.exports = [
    webpackMain,
    webpackWeb
]