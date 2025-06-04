<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CheckInController;
use App\Http\Controllers\CheckOutController;
use App\Http\Controllers\PinjamController;
use App\Http\Controllers\RuanganController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');


// Check-in Routes
Route::prefix('checkin')->group(function () {
    Route::post('/', [CheckInController::class, 'store']);
    Route::get('/{id}', [CheckInController::class, 'show']);
});

// Checkout Routes
Route::prefix('checkout')->group(function () {
    Route::post('/', [CheckOutController::class, 'store']);
    Route::get('/{id}', [CheckOutController::class, 'show']);
});

// Ruangan Routes
Route::apiResource('/ruangan', RuanganController::class);

// Pinjam Routes
Route::apiResource('/pinjam', PinjamController::class);
