const path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    MiniCssExtractPlugin  = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',

    entry: './src/index.tsx',

    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },

    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'moment': 'moment',
        'react-bootstrap': 'ReactBootstrap',
        'es6-promise': 'ES6Promise',
        'react-router': 'ReactRouter',
        'react-router-dom': 'ReactRouterDOM'
    },

    plugins: [
        new HtmlWebpackPlugin({ template: 'src/index.html' }),
        new MiniCssExtractPlugin()
    ],

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss?$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.scss'],

        modules: [
            path.resolve(__dirname, './src'),
            'node_modules'
        ]
    },

    devServer: {
        historyApiFallback: true
    },

    devtool: 'source-map'
};