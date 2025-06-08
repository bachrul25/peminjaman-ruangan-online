<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PinjamController;
use App\Http\Controllers\CheckInController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\RuanganController;
use App\Http\Controllers\CheckOutController;

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
    // Menghasilkan URL: POST /checkin
    Route::post('/', [CheckInController::class, 'store']);

    // Menghasilkan URL: GET /checkin/{id}
    Route::get('/{id}', [CheckInController::class, 'show']);
});


// Route untuk Check-Out (TAMBAHKAN INI)
Route::resource('checkout', CheckOutController::class)->only(['store', 'show']);

// Ruangan Routes
Route::prefix('ruangans')->group(function () {
    Route::get('/', [RuanganController::class, 'index']); // List all + filter
    Route::post('/', [RuanganController::class, 'store']); // Create
    Route::get('/{id}', [RuanganController::class, 'show']); // Show detail
    Route::put('/{id}', [RuanganController::class, 'update']); // Update
    Route::delete('/{id}', [RuanganController::class, 'destroy']); // Delete
    Route::get('/available', [RuanganController::class, 'availableRooms']); // Get available rooms
});
// Route::apiResource('/ruangan', RuanganController::class);
// Route::post('ruangans/available', [RuanganController::class, 'availableRooms']);

// Pinjam Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/pinjam', [PinjamController::class, 'index']);
    Route::post('/pinjam', [PinjamController::class, 'store']);
    Route::post('/pinjam/check-availability', [PinjamController::class, 'checkAvailability']);
    Route::get('/pinjam/{id}', [PinjamController::class, 'show']);
    Route::put('/pinjam/{id}', [PinjamController::class, 'update']);
    Route::delete('/pinjam/{id}', [PinjamController::class, 'destroy']);
});


