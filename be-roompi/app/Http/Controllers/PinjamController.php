<?php

namespace App\Http\Controllers;

use App\Models\Pinjam;
use App\Models\Ruangan;
use App\Models\Sesi;
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

    // Check room availability
    public function checkAvailability(Request $request)
    {
        $validator = Validator::make($request->all(), [
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

        $isAvailable = $this->isRoomAvailable(
            $request->ruangan_idruangan,
            $request->sesi_idsesi,
            $request->tanggal_pinjam
        );

        return response()->json([
            'success' => true,
            'message' => 'Availability checked',
            'data' => [
                'available' => $isAvailable
            ]
        ], 200);
    }

    // Transaction (add data)
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
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

        // 1. Pemesanan by user login
        $user = auth('sanctum')->user();
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized!'
            ], 401);
        }

        // 2. Check if room is available
        $isAvailable = $this->isRoomAvailable(
            $request->ruangan_idruangan,
            $request->sesi_idsesi,
            $request->tanggal_pinjam
        );

        if (!$isAvailable) {
            return response()->json([
                'success' => false,
                'message' => 'Ruangan tidak tersedia pada tanggal dan sesi yang diminta'
            ], 400);
        }

        // 5. Check if user already has booking for this session
        $existingBooking = Pinjam::where('user_iduser', $user->id_user)
            ->where('sesi_idsesi', $request->sesi_idsesi)
            ->where('tanggal_pinjam', $request->tanggal_pinjam)
            ->first();

        if ($existingBooking) {
            return response()->json([
                'success' => false,
                'message' => 'Anda sudah memiliki pemesanan untuk sesi ini pada tanggal yang sama'
            ], 400);
        }

        $pinjams = Pinjam::create([
            'user_iduser' => $user->id_user,
            'ruangan_idruangan' => $request->ruangan_idruangan,
            'sesi_idsesi' => $request->sesi_idsesi,
            'tanggal_pinjam' => $request->tanggal_pinjam,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Peminjaman berhasil dilakukan, tunggu pesan yang akan dikirimkan oleh admin',
            'data' => $pinjams
        ], 201);
    }

    // Show detail peminjaman
    public function show(string $id)
    {
        $pinjams = Pinjam::with(['user', 'ruangan.tipe', 'sesi'])->find($id);

        if (!$pinjams) {
            return response()->json([
                'success' => false,
                'message' => 'Detail not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Get data peminjaman',
            'data' => $pinjams
        ], 200);
    }

    // Update data peminjaman
    public function update(Request $request, string $id)
    {
        $pinjam = Pinjam::find($id);

        if (!$pinjam) {
            return response()->json([
                'success' => false,
                'message' => 'Data peminjaman tidak ditemukan'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'ruangan_idruangan' => 'exists:ruangans,id_ruangan',
            'sesi_idsesi' => 'exists:sesis,id_sesi',
            'tanggal_pinjam' => 'date|after_or_equal:today'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'data' => $validator->errors()
            ], 422);
        }

        // Check if new data is different
        if ($request->has('ruangan_idruangan') || $request->has('sesi_idsesi') || $request->has('tanggal_pinjam')) {
            $newRuangan = $request->ruangan_idruangan ?? $pinjam->ruangan_idruangan;
            $newSesi = $request->sesi_idsesi ?? $pinjam->sesi_idsesi;
            $newTanggal = $request->tanggal_pinjam ?? $pinjam->tanggal_pinjam;

            // Check availability for new data
            $isAvailable = $this->isRoomAvailable($newRuangan, $newSesi, $newTanggal, $pinjam->id_pinjam);

            if (!$isAvailable) {
                return response()->json([
                    'success' => false,
                    'message' => 'Ruangan tidak tersedia untuk perubahan yang diminta'
                ], 400);
            }
        }

        $pinjam->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Data peminjaman berhasil diperbarui',
            'data' => $pinjam
        ], 200);
    }

    // Delete data peminjam
    public function destroy(string $id)
    {
        $pinjams = Pinjam::find($id);

        if (!$pinjams) {
            return response()->json([
                'success' => false,
                'message' => 'Data not found'
            ], 404);
        }

        $pinjams->delete();
        return response()->json([
            'success' => true,
            'message' => 'Delete data successfully'
        ], 200);
    }

    // Helper function to check room availability
    private function isRoomAvailable($ruanganId, $sesiId, $tanggal, $excludePinjamId = null)
    {
        $query = Pinjam::where('ruangan_idruangan', $ruanganId)
            ->where('sesi_idsesi', $sesiId)
            ->where('tanggal_pinjam', $tanggal);

        if ($excludePinjamId) {
            $query->where('id_pinjam', '!=', $excludePinjamId);
        }

        return $query->count() === 0;
    }
}
