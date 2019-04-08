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

Route::get('/', function () {
    return view('home');
});

Auth::routes(['verify' => true]);

//Route::get('/', function () {
//    return view('customer.index');
//});

Route::get('/cabinet', 'CabinetController@index')->name('cabinet');

//Route::prefix('admin')->group(function () {
//    Route::get('users', function () {
//         Matches The "/admin/users" URL
//    });
//});

Route::prefix('private')->middleware(['auth:web'])->group(function () {

    Route::resource('bots', 'BotsController');

});
