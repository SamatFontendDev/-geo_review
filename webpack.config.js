const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    output: {
        filename: 'main.min.js'
    },
    mode: process.env.NODE_ENV,
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.hbs$/,
                loader: "handlebars-loader"
            }
        ]
    }
};
