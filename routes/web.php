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

    if(Auth::check()) {
        return redirect('/cabinet');
    } else {
        return view('auth.login');
    }

});

Auth::routes(['verify' => true]);

Route::get('/cabinet', 'CabinetController@index')->name('cabinet');

Route::group(['prefix' => 'private', 'middleware' => 'auth'], static function()
{

    Route::resource('bots', 'BotsController', ['only' => [
        'index', 'store', 'update', 'destroy'
    ]]);

    Route::resource('bots.blocks', 'BlocksController', ['only' => [
        'index', 'store', 'update', 'destroy',
    ]]);

    Route::post('connector/save-target', 'ConnectorController@saveTarget');

    Route::get('block/{id}', 'BlocksController@getBlockData');

    Route::get('client-input-types', 'ClientInputTypesController@getClientInputTypes');

    Route::get('messages/create-new/{blockId}', 'MessagesController@createMessage');

    Route::get('messages/delete/{messageId}', 'MessagesController@deleteMessage');

    Route::post('save-extended-block-data', 'BlocksController@saveExtendedBlockData');

});

