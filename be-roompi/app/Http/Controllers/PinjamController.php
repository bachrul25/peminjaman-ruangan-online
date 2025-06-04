<?php

namespace App\Http\Controllers;

use App\Models\Pinjam;
use App\Models\Ruangan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PinjamController extends Controller
{
    // Show all transactions
    public function index(){
         $pinjam = Pinjam::with(['user', 'ruangan.tipe', 'sesi'])->get();

         if ($pinjam->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Data not found'
            ], 404);
         }

         return response()->json([
            'success' => true,
            'message' => 'Get all data',
            'data' => $pinjam
         ], 200);
    }

/**
 * !!!Harus dibuat segera!!!
 *
 * 1. pemesanan by user login✅
 * 2. available or no for ruangan
 * 3. if room is available show it on the page
 * 4. if not avail, tidak bisa pinjam dan tampilkan
 * 5. if member has booking, make the room session not avail
 * 6. Update data peminjaman
 */

    // Transaction (add data)
    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'user_iduser' => 'required|exists:users,id',
            'ruangan_idruangan' => 'required|exists:ruangans,id_ruangan',
            'sesi_idsesi' => 'required|exists:sesis,id_sesi',
            'tanggal_pinjam' => 'required|date|after_or_equal:today'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'data' => $validator->errors()
            ], 422);
        }


        // !!!Cek login, Pemesanan ruangan hanya bisa oleh member yang sedang login!!!
        $user = auth('api')->user();

        if (!$user){
            return response()->json([
                'success' => false,
                'message' => 'Unathorized!'
            ], 401);
        }

        // // !!!Mencari data ruangan dari request!!!
        // $ruangans = Ruangan::find($request->ruangans_id);

        // // Cek avail or not for ruangan
        // if ($ruangans->stock < $request->quantity) {
        //     return response()->json([
        //         'success' => false,
        //         'message' => 'Insufficient stock of goods'
        //     ], 400);
        // }

        $pinjam = Pinjam::create([
            'user_iduser' => $request->user_iduser,
            'ruangan_idruangan' => $request->ruangan_idruangan,
            'sesi_idsesi' => $request->sesi_idsesi,
            'tanggal_pinjam' => $request->tanggal_pinjam,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Peminjaman berhasil dilakukan, tunggu pesan yang akan dikirimkan oleh admin',
            'data' => $pinjam
        ], 201);
    }

    // Show detail peminjaman
    public function show(string $id){
        $pinjam = Pinjam::find($id);
        if (!$pinjam) {
            return response()->json([
                'success' => false,
                'message' => 'Detail not found',
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Get data peminjaman',
            'data' => $pinjam
        ]);
    }

    // Update data peminjaman

    // Delete data peminjam
    public function destroy(string $id){
        $pinjam = Pinjam::find($id);

        if (!$pinjam) {
            return response()->json([
                'success' => false,
                'message' => 'Data not found'
            ], 404);
        }

        $pinjam->delete();
        return response()->json([
            'success' => true,
            'message' => 'Delete data successfully'
        ]);
    }

}
