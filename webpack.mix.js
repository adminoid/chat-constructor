const mix = require('laravel-mix');
const webpack = require('webpack');
const path = require('path');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
  .ts('resources/customer/ts/index.ts', 'public/js/customer.js').sourceMaps()
  .ts('resources/app/ts/index.ts', 'public/js/app.js').sourceMaps()
  .sass('resources/customer/sass/index.sass', 'public/css/customer.css')
  .sass('resources/app/sass/index.sass', 'public/css/app.css')
  .webpackConfig({
    resolve: {
      extensions: ['.js', '.ts', '.vue', '.json'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@customer': path.join(__dirname, '/resources/customer')
      },
    },
    devtool: '#inline-cheap-module-source-map',
    output: {
      devtoolModuleFilenameTemplate: '[absolute-resource-path]',
      devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
    },
    module: {
      rules: [
        {
          test: /\.pug$/,
          oneOf: [
            // this applies to `<template lang="pug">` in Vue components
            {
              resourceQuery: /^\?vue/,
              use: ['pug-plain-loader']
            },
            // this applies to pug imports inside JavaScript
            {
              use: ['raw-loader', 'pug-plain-loader']
            }
          ]
        },
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          options: { appendTsSuffixTo: [/\.vue$/] },
          exclude: /node_modules/,
        },
      ]
    },
    plugins: [
      new webpack.ProvidePlugin({
        Promise: 'imports-loader?this=>global!exports-loader?global.Promise!es6-promise',
        fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
      })
    ]
  });

