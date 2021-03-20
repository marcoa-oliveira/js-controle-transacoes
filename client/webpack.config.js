const path = require('path')
//importando babili
const babiliPlugin = require('babili-webpack-plugin')
//começa com nenhum plugin
const extractTextPlugin = require('extract-text-webpack-plugin')
const optimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

let plugins = []

//adiciona html webpack plugin como primeiro na lista
plugins.push({
    hash: true,
    minify: {
        html5: true,
        collapseWhitespace: true,
        removeComments: true
    },
    filename: 'index.html',
    template: `${__dirname}main.html`
})

plugins.push(
    new extractTextPlugin('styles.css')
)

//utilizando webpack.ProvidePlugin
plugins.push(
    new webpack.ProvidePlugin({
        $: 'jquery/dist/jquery.js',
        jQuery: 'jquery/dist/jquery.js' //$ e jQuery são os alias usados pela biblioteca
    })
)

if(process.env.NODE_ENV == 'production'){
    //ATIVANDO SCOPE HOISTING
    plugins.push(new webpack.optimize.ModuleConcatenationPlugin())

    plugins.push(new babiliPlugin())
    //adiciona o plugin ao ambiente de produção
    
    //utilizando CommonsChunkPlugin
    plugins.push(
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.bundle.js'
        })
    )
    
    plugins.push(new optimizeCSSAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorOptions:{
            discardComments:{
                removeAll: true
            }
        },
        canPrint: true
    }))
}

module.exports = {
    entry: {
        app: './app-src/app.js',  //aqui a aplicação tem a build dividida com dois pontos de entrada (app e vendor)
        vendor: ['jquery','bootstrap','reflect-metadata']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        // publicPath: "dist" removido no cap.20.15
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: extractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                }),
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
            }
        ]
    },
    plugins
}