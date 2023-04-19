<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use Carbon\CarbonConverterInterface;

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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

//view all (list)
Route::get('/product-list', [ProductController::class, 'index']);
// view item 
Route::get('/product/{id}/show', [ProductController::class, 'show']);
// add a product
Route::post('/product/add', [ProductController::class, 'store']);


//// cart
// add to cart
Route::post('/add-to-cart', [CartController::class, 'addToCart']);
// view all list cart
Route::get('/view-cart', [CartController::class, 'index']);

// update count and total price  in cart
Route::put('/cart/{id}/update', [CartController::class , 'update']);

// delete a item in cart
Route::delete('/cart/{id}/delete', [CartController::class, 'destroy']);

// route show a item (delete it)
Route::get('/cart/{id}/show', [CartController::class, 'show']);


//update many item in cart
// update count and total price  in cart
Route::put('/cart/update', [CartController::class , 'updateManyItem']);

// delete many item in cart
Route::DELETE('/cart/delete', [CartController::class, 'destroyManyItem']);
