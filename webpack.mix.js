const mix = require('laravel-mix');

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

mix.js('resources/js/private.js', 'public/js')
   .sass('resources/sass/private.scss', 'public/css');

mix.webpackConfig({
    module: {
        rules:
        [{
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
        }]
    }
});

