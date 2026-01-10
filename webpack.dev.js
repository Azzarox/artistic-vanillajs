const common = require('./webpack.common');
const {merge} = require('webpack-merge')

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: 'template.html',
        }),
    ],
    module: {
        rules: [
            {
                test: /.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
        ],
    },
    experiments: {
        topLevelAwait: true,
    },
});
