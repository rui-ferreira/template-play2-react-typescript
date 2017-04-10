const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isEnvProd = process.env.NODE_ENV === "production";

module.exports = {
    entry: {
        sample: './src/views/sample.tsx',
        //other entry points here

        vendor: [
            'react', 'react-dom',
            //other vendor deps to bundle here
        ]
    },
    output: {
        path: path.resolve(__dirname, '../public/frontend'),
        publicPath: '/assets/',
        filename: '[name].js',
        library: 'BeckerUSE_[name]',
        libraryTarget: 'umd'
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",

                    use: [
                        // "style-loader",
                        {
                            loader: "typings-for-css-modules-loader",
                            options: {
                                modules: true,
                                importLoaders: 1,
                                camelCase: true,
                                namedExport: true
                            }
                        },
                        "postcss-loader",
                        "sass-loader"
                    ]
                })
            }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
        }),
        new ExtractTextPlugin({
            filename: "[name].css"
        }),
        new webpack.WatchIgnorePlugin([
            /scss\.d\.ts$/
        ]),
    ],

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // },
};

if (isEnvProd) {
    module.exports.devtool = '#source-map';

    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}
