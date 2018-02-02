var path = require('path');
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.js',
        library: 'reduxItemsFilter',
        libraryTarget: 'commonjs2' // THIS IS THE MOST IMPORTANT LINE!
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /(node_modules|build)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }, {
                    loader: 'eslint-loader'
                }]
            }
        ]
    },
    externals: {
        react: 'commonjs react',
        'react-dom': 'react-dom react',
        redux: 'commonjs redux',
        'react-redux': 'commonjs react-redux',
        'prop-types': 'commonjs prop-types',
        'redux-form': 'commonjs redux-form',
        'react-router-redux': 'commonjs react-router-redux',
        'redux-act': 'commonjs redux-act',
        'redux-act-async': 'commonjs redux-act-async',
        'query-string': 'commonjs query-string'
    }
};

