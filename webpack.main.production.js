const webpackMainBase = require('./webpack.main.base');

module.exports = {
    ...webpackMainBase,
    mode: 'production',
    entry: {
        main: './src/main.ts'
    }
};