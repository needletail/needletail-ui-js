const UnminifiedWebpackPlugin = require('unminified-webpack-plugin');

module.exports = {
    mode: 'production',
    target: 'web',
    entry: {
        'needletail-ui': ['./src/Css/needletail.scss', './src/Needletail.ts'],
    },
    output: {
        path: __dirname,
        filename: '[name].min.js',
        libraryTarget: 'umd',
    },
    plugins: [
        new UnminifiedWebpackPlugin(),
    ],
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
