'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const webpack = require('webpack')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

function getEntries(globPath) {
    var files = glob.sync(globPath),
        entries = {};

    files.forEach(function(filepath) {
        // 取倒数第二层(view下面的文件夹)做包名
        var split = filepath.split('/');
        var name = split[split.length - 2] + '/' + split[split.length - 1].slice(0, -3);

        entries[name] = filepath;
    });

    return entries;
}

var entries = getEntries(resolve('src/applications/*/index.js'));

let plugins = []
Object.keys(entries).forEach(function(name) {
    // 每个页面生成一个html
    let filename = path.resolve(__dirname, `../dist/${name.split('/')[0]}/index.html`);
    if (name.split('/')[0] == 'index') filename = path.resolve(__dirname, `../dist/index.html`);
    if (process.env.NODE_ENV == 'production') filename = path.resolve(__dirname, `../dist/views/${name.split('/')[0]}.html`)
    var plugin = new HtmlWebpackPlugin({
        filename: filename,
        template: './index.html',
        inject: true,
        chunks: [name, 'manifest', 'vendor'],
        favicon: path.resolve(__dirname, './logo.png'),
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
        },
        chunksSortMode: 'dependency'
    });
    plugins.push(plugin);
});

entries.vendor = ['jquery', 'bootstrap', 'vue'];

module.exports = {
    context: path.resolve(__dirname, '../'),
   /* entry: {
        app: './src/index.js',
        vendor: ['jquery', 'bootstrap', 'vue'],
    },*/
    entry: entries,
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
            'jquery': 'jquery'
        }
    },
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                include: [path.resolve(__dirname, "not_exist_path")],
                loader: "style-loader!css-loader!less-loader"
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    },
    plugins: [
        new webpack.ProvidePlugin({
            vue: 'vue',
            jQuery: 'jquery',
            $: 'jquery'
        }),
        new CleanWebpackPlugin(['target', 'dist', 'lamp'], {
            root: path.resolve(__dirname, '..') // 要指定根目录，不然删不掉
        }),
        ...plugins
    ]
}
