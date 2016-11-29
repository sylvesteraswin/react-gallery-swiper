import webpack from 'webpack';
import pkg from './package.json';

const webpackExample = {
    cache: true,
    debug: true,
    devtool: 'eval-source-map',
    output: {
        filename: 'build.min.js'
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                query: {
                    plugins: ['transform-runtime'],
                    presets: ['es2015', 'stage-1', 'react']
                }
            }, {
                test: /\.json$/,
                loader: 'json'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.json']
    },
    plugins: [new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('"production"')
            }
        })/*,
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin()*/
        ]
};

export default webpackExample;
