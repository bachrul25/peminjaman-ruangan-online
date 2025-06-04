<?php

namespace App\Http\Controllers;

use App\Models\CheckIn;
use App\Models\Pinjam;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CheckInController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'pinjam_idpinjam' => 'required|exists:pinjams,id_pinjam',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validasi gagal',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Cek apakah peminjaman sudah checkin sebelumnya
        $existingCheckIn = CheckIn::where('pinjam_idpinjam', $request->pinjam_idpinjam)->first();
        if ($existingCheckIn) {
            return response()->json([
                'message' => 'Peminjaman ini sudah melakukan check-in sebelumnya',
            ], 409); // Conflict
        }

        $checkIn = CheckIn::create([
            'pinjam_idpinjam' => $request->pinjam_idpinjam,
            'tanggal_checkin' => now(),
        ]);

        return response()->json([
            'message' => 'Check-in berhasil dicatat',
            'data' => $checkIn
        ], 201);
    }

    // Menampilkan detail check-in beserta relasi

    public function show($id)
    {
        $checkIn = CheckIn::with([
            'pinjam.user',
            'pinjam.ruangan',
            'pinjam.sesi'
        ])->find($id);

        if (!$checkIn) {
            return response()->json([
                'message' => 'Data check-in tidak ditemukan',
            ], 404);
        }

        return response()->json([
            'message' => 'Detail check-in ditemukan',
            'data' => $checkIn,
        ]);
    }
}
