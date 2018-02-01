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
        react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom'
        },
        'react-redux': {
            root: 'ReactRedux',
            commonjs2: 'react-redux',
            commonjs: 'react-redux',
            amd: 'react-redux'
        },
        redux: {
            root: 'Redux',
            commonjs2: 'redux',
            commonjs: 'redux',
            amd: 'redux'
        },
        'redux-form': {
            root: 'ReactReduxForm',
            commonjs2: 'redux-form',
            commonjs: 'redux-form',
            amd: 'redux-form'
        }
        // 'prop-types': 'commonjs prop-types',
        // 'redux"': 'commonjs redux"',
        // 'react-redux"': 'commonjs react-redux',
        // 'redux-act': 'commonjs redux-act',
        // 'redux-act-async': 'commonjs redux-act-async',
        // 'redux-form': 'commonjs redux-form',
        // 'react-router-redux': 'commonjs react-router-redux',
        // 'query-string': 'commonjs query-string'
    }
};

