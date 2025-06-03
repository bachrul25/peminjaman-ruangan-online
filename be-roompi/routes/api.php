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

Route::middleware('auth:sanctum')->get('/profile', function (Request $request) {
    return response()->json([
        'success' => true,
        'user' => $request->user()
    ]);
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
Route::post('ruangans/available', [RuanganController::class, 'availableRooms']);

// Pinjam Routes
Route::middleware('auth:api')->group(function () {
    Route::get('/pinjam', [PinjamController::class, 'index']);
    Route::post('/pinjam', [PinjamController::class, 'store']);
    Route::post('/pinjam/check-availability', [PinjamController::class, 'checkAvailability']);
    Route::get('/pinjam/{id}', [PinjamController::class, 'show']);
    Route::put('/pinjam/{id}', [PinjamController::class, 'update']);
    Route::delete('/pinjam/{id}', [PinjamController::class, 'destroy']);
});

