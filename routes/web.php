<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', static function () {
    return view('home');
});

Auth::routes(['verify' => true]);

Route::get('/cabinet', 'CabinetController@index')->name('cabinet');

Route::group(['prefix' => 'private', 'middleware' => 'auth'], static function()
{

    // except || only
    Route::resource('bots', 'BotsController', ['only' => [
        'index', 'store', 'update', 'destroy'
    ]]);

    Route::resource('bots.blocks', 'BlocksController', ['only' => [
        'index', 'store', 'update', 'destroy'
    ]]);

});

//Route::prefix('private')->middleware(['auth:web'])->group(function () {
//    // except || only
//    Route::resource('bots', 'BotsController', ['only' => [
//        'index', 'store', 'update', 'destroy'
//    ]]);
//    Route::resource('blocks', 'BlocksController')->except([
//        'index', 'create', 'show', 'edit' // only: 'store', 'update', 'destroy' and 'index'
//    ]);
//    Route::get('bot/{botId?}/blocks', 'BlocksController@index');
//});
