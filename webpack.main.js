const path = require('path')

module.exports = {
    target: 'electron-main',
    mode: process.env.ENV || 'development',
    entry: {
        main: './src/main.ts'
    },
    output: {
        path: path.resolve(__dirname, '.webpack')
    },
    module: {
        rules: [
            {
                test: /\.node$/,
                use: 'node-loader',
            },
            {
                test: /\.tsx?$/,
                exclude: /(node_modules|\.webpack)/,
                include: [
                    path.resolve(__dirname, './src/server'),
                    path.resolve(__dirname, './src/model')
                ],
                use: {
                    loader: 'ts-loader'
                }
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.ts', '.json'],
        modules: ["node_modules", path.resolve(__dirname)], // 确定加载的基础路径
        alias: {
            '@': path.resolve(__dirname, './src'), // 路径别名
        }
    },
};