const path = require("path");
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
    return ({
        entry: {
            PixiController: './src/PixiController.js',
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist'),
        },
        devServer: {
            compress: true,
            static: false,
            client: {
                logging: "warn",
                overlay: {
                    errors: true,
                    warnings: false,
                },
                progress: true,
            },
            port: 8000, host: '0.0.0.0'
        },
        devtool: argv.mode === "development" ? "source-map" : void 0,
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: 'babel-loader'
                }
            ]
        },
        plugins: [
            new CopyPlugin({
                patterns: [
                    { from: 'src/icons/', to: "icons/" }
                ],
            }),
            new HtmlWebpackPlugin({
                template: 'src/index.html'
            })
        ]
    })
};