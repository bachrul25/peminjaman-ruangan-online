<?php

namespace App\Http\Controllers;

use App\Models\CheckIn;
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

        $isAlreadyCheckedIn = CheckIn::where('pinjam_idpinjam', $request->pinjam_idpinjam)->exists();
        if ($isAlreadyCheckedIn) {
            return response()->json([
                'message' => 'Peminjaman ini sudah melakukan check-in sebelumnya',
            ], 409);
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

    /**
     * Menampilkan detail check-in dengan mencari pinjam_idpinjam dari peminjaman yang cocok untuk mengecek apakah peminjaman tersebut sudah check-in atau belum --Rakha .
     */
    public function show($id)
    {
        $checkIn = CheckIn::with([
            'pinjam:id_pinjam,user_iduser,ruangan_idruangan,sesi_idsesi,tanggal_pinjam',
            'pinjam.user:id_user,name,email,telepon',
            'pinjam.ruangan:id_ruangan,nama_ruangan,alamat,kapasitas',
            'pinjam.sesi:id_sesi,nama,start_time,end_time'
        ])
            ->select('id_checkin', 'pinjam_idpinjam', 'tanggal_checkin')
            ->where('pinjam_idpinjam', $id)
            ->first(); // Mengambil satu data check-in berdasarkan pinjam_idpinjam

        if (!$checkIn) {
            return response()->json([
                'message' => 'Data check-in berdasarkan pinjam_idpinjam tidak ditemukan',
            ], 404);
        }

        return response()->json([
            'message' => 'Detail check-in ditemukan',
            'data' => $checkIn,
        ]);
    }

}
