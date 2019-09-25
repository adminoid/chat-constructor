const mix = require('laravel-mix');
const config = require('./webpack.config');

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
  .ts('resources/customer/ts/index.ts', 'public/js/customer.js')
  .sass('resources/customer/sass/index.sass', 'public/css/customer.css')
  .ts('resources/app/ts/index.ts', 'public/js/app.js')
  .sass('resources/app/sass/index.sass', 'public/css/app.css')
  .js('resources/chat/js/app.js', 'public/js/chat.js')
  .sass('resources/chat/sass/app.sass', 'public/css/chat.css')
  .sourceMaps().webpackConfig(config);

