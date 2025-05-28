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
            return response()->json($validator->errors(), 400);
        }

        // Cek apakah peminjaman sudah checkin sebelumnya
        $existingCheckIn = CheckIn::where('pinjam_idpinjam', $request->pinjam_idpinjam)->first();
        if ($existingCheckIn) {
            return response()->json(['message' => 'Peminjaman ini sudah melakukan check-in sebelumnya'], 400);
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

    public function show($id)
    {
        $checkIn = CheckIn::with([
            'pinjams.users',
            'pinjams.ruangans',
            'pinjams.sesis'
        ])->find($id);

        if (!$checkIn) {
            return response()->json(['message' => 'Data check-in tidak ditemukan'], 404);
        }

        return response()->json($checkIn);
    }
}
