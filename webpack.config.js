import webpack from 'webpack';
import pkg from './package.json';
import camelCase from 'camelcase';
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const capitalizeFirstLetter = (string) => {
    return string
        .charAt(0)
        .toUpperCase() + string.slice(1);
};

const webpackConfig = {
    output: {
        filename: pkg.name + '.js',
        library: capitalizeFirstLetter(camelCase(pkg.name)),
        library: 'GallerySwiper',
        libraryTarget: 'umd'
    },
    mode: "production",
    externals: {
        react: {
            root: 'React',
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'react'
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs: 'react-dom',
            commonjs2: 'react-dom',
            amd: 'react-dom'
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            }, {
                test: /\.(scss|css)$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
                // use: ExtractTextPlugin.extract("style-loader", "css-loader")
            }
        ]
    },
    /* resolve: {
        extensions: ['', '.jsx', '.js']
    }, */
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        /*,
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    })*/
    new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "react-gallery-swiper.css"
      })
        /* new ExtractTextPlugin("react-gallery-swiper.css", {allChunks: false}) */
    ]
};

export default webpackConfig;
