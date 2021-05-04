const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: "production",
    output: {
        filename: 'app.bundle.js',
        assetModuleFilename: 'assets/[hash][ext][query]',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                type: 'asset/resource',
                test: /\.(png|jpg)$/i,
            }
        ]
    },
    optimization:{
        // minimize: false,
        minimizer: [
            new CssMinimizerPlugin(), 
            new TerserPlugin()
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body',
            // minify: true
        }),
        // new CopyPlugin({
        //     patterns: [
        //         { from: "src/img", to: "img/" },
        //     ]
        // }),
        new MiniCssExtractPlugin()
    ]
}