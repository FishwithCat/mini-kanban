const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')


const devProxy = {
    '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
    }
}

module.exports = {
    mode: process.env.ENV || 'development',
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'], // 必须增加 extensions 支持 ts 解析
        modules: ["node_modules", path.resolve(__dirname)], // 确定加载的基础路径
        alias: {
            '@': path.resolve(__dirname, './src'), // 路径别名,
        }
    },
    entry: {
        ui: './src/web/index.tsx'
    },
    devServer: {
        contentBase: '.',
        hot: true,
        proxy: devProxy
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/web/index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/, // 不解析 node_modules
                include: [
                    path.resolve(__dirname, './src/web'),
                    path.resolve(__dirname, './src/model')
                ],
                loader: 'ts-loader'
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                include: [
                    path.resolve(__dirname, './src/web')
                ],
                loader: 'babel-loader'
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader", // compiles Less to CSS
                    options: {
                        javascriptEnabled: true
                    }
                }]
            },
            {
                test: /\.css$/,
                // exclude: /node_modules/, // 不解析 node_modules
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                loader: 'file-loader'
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.ico$/],
                loader: require.resolve('url-loader'),
                options: {
                    limit: 10000, // 将小于 10000 字节的图片认定为小图片
                    // name: 'static/images/[name].[hash:8].[ext]',
                    name: `static/images/[name].[ext]`,
                },
            },
        ]
    }
};
