const path = require('path');

module.exports = {
    mode: 'production',
    target: 'web',
    entry: ['./src/Css/needletail.scss', './src/Needletail.ts'],
    output: {
        path: __dirname,
        filename: 'needletail-ui.min.js',
        libraryTarget: 'umd',
    },
    optimization: {
        minimize: false
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                exclude: /node_modules/,
                loader: 'html-loader',
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                        options: { outputPath: '', name: '[name].min.css'}
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    }
};