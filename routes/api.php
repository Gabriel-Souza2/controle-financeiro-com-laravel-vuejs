<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::namespace('Api\Auth')->prefix('auth')->group(function () {
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('me', 'AuthController@me');
    Route::post('refresh', 'AuthController@refresh');


});

Route::namespace('Api')->middleware('auth:api')->group(function(){
    Route::delete('/entries/delete/many', 'EntryController@destroyMany')->name('entries.delete_many');
    Route::delete('/categories/delete/many', 'CategoryController@destroyMany')->name('categories.delete_many');
    Route::apiResources([
        'categories' => 'CategoryController',
        'entries' => 'EntryController'
    ]);

});