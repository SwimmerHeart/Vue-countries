const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {VueLoaderPlugin} = require("vue-loader")


module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash:6].js',
        clean: true
    },
    devServer: {
        open: true,
        port: 8086,
        static: './dist',
        historyApiFallback: true,
        proxy: {
            '/sbr/api': {
                // target: 'https://www.cbr-xml-daily.ru',
                //исп.env переменной(указываем в .env)
                target: process.env.API_CBR,
                //проверка сертификатов
                // secure: false,
                // rejectUnauthorized: false,
                //меняем имена cookie
                // cookieDomainRewrite: { "cbr-xml-daily.ru": "localhost" },
                // withCredentials: true,
                //префикс /api будет удален из запроса
                pathRewrite: { '^/sbr/api': '' },
                changeOrigin: true
            },
        }
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
        extensions: ['.js', '.vue', '.json']
    },
    module: {
        rules: [
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ]
                    }
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loader: {
                        scss: ['vue-style-loader','css-loader','sass-loader']}
                }
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.(eot|ttf|woff|woff2)(\?\S*)?$/,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]",
                },
            },
            {
                test: /\.(png|jpe?g|gif|webm|mp4|svg)$/,
                loader: "file-loader",
                options: {
                    outputPath: "assets",
                    name: "[name].[ext]",
                    esModule: false,
                },
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Contries-Development',
            template: path.resolve(__dirname, "public", "index.html"),
            favicon: "./public/globe.png",
        }),
        new VueLoaderPlugin(),
    ],
}