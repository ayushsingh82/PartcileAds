const webpack = require('webpack');
const pkg = require('./package.json');
const path = require('path');
const libraryName= pkg.name;
module.exports = {
    entry: path.join(__dirname, "./dist/index.js"),
    output: {
        path: path.join(__dirname, './dist'),
        library: libraryName,
        libraryTarget: 'umd',
        publicPath: '/dist/',
        umdNamedDefine: true
    },
    module: {
        rules : [
        {
            test: /\.(js|jsx)$/,
            use: ["babel-loader"],
            exclude: /node_modules/,
        },
        {
            test: /\.(eot|ttf|woff|woff2)$/,
            use: ["file-loader"],
        },
        {
            test: /\.(pdf|doc|zip)$/,
            use: ["file-loader"],
        }]
    },
    resolve: { 
        alias: { 
            'react': path.resolve(__dirname, './node_modules/react') ,
            'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
            'assets': path.resolve(__dirname, 'assets')
        } 
    },
    externals: {
        // Don't bundle react or react-dom
        react: {
            commonjs: "react",
            commonjs2: "react",
            amd: "React",
            root: "React"
        },
        "react-dom": {
            commonjs: "react-dom",
            commonjs2: "react-dom",
            amd: "ReactDOM",
            root: "ReactDOM"
        }
    }
};