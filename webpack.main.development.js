const webpackMainBase = require('./webpack.main.base');

module.exports = {
    ...webpackMainBase,
    mode: 'development',
    entry: {
        main: './src/main_dev.ts'
    }
};