var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/Client.js',
    mode: process.env.APP_ENV,
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'needletail-ui.js',
        libraryTarget: 'umd'
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    corejs: 3,
                                    useBuiltIns: 'usage',
                                    targets: {
                                        browsers: ['last 2 versions', 'ie >= 10']
                                    }
                                }
                            ]
                        ]
                    }
                }
            },
            {
                test: /(\.html)$/,
                use: {
                    loader: 'html-loader'
                }
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};
