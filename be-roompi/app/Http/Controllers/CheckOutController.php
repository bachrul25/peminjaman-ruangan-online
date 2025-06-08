<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\CheckIn;
use App\Models\Checkout;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CheckOutController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'checkin_idcheckin' => 'required|exists:check_ins,id_checkin',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Cek apakah sudah checkout sebelumnya
        $existingCheckout = Checkout::where('checkin_idcheckin', $request->checkin_idcheckin)->first();
        if ($existingCheckout) {
            return response()->json(['message' => 'Check-in ini sudah melakukan checkout sebelumnya'], 400);
        }

        // Ambil data CheckIn dan relasi pinjam
        $checkIn = CheckIn::with('pinjam')->find($request->checkin_idcheckin);
        if (!$checkIn || !$checkIn->pinjam) {
            return response()->json(['message' => 'Data peminjaman tidak ditemukan'], 404);
        }

        $pinjam = $checkIn->pinjam;

        // Hitung denda jika melebihi waktu sesi
        $denda = 0;
        $keterangan = null;

        $sesi = $pinjam->sesi; // relasi sesi dari pinjam
        $endTime = Carbon::parse($sesi->end_time)->format('H:i:s');
        $tanggalPinjam = Carbon::parse($pinjam->tanggal_pinjam)->format('Y-m-d');

        $waktuSelesai = Carbon::parse("$tanggalPinjam $endTime");
        $waktuCheckout = Carbon::now();

        if ($waktuCheckout->gt($waktuSelesai)) {
            $jamTerlambat = $waktuCheckout->diffInHours($waktuSelesai);
            $denda = $pinjam->ruangan->harga * 0.1 * $jamTerlambat;
            $keterangan = 'Terlambat ' . $jamTerlambat . ' jam';
        }

        $checkout = Checkout::create([
            'checkin_idcheckin' => $request->checkin_idcheckin,
            'waktu_checkout' => $waktuCheckout,
            'denda' => $denda,
            'keterangan' => $keterangan,
        ]);

        return response()->json([
            'message' => 'Checkout berhasil dicatat',
            'data' => $checkout,
            'denda' => $denda,
            'keterangan_denda' => $keterangan
        ], 201);
    }

    public function show($id)
    {
        $checkout = Checkout::with([
            'check_in.pinjam.user',
            'check_in.pinjam.ruangan',
            'check_in.pinjam.sesi'
        ])->find($id);

        if (!$checkout) {
            return response()->json(['message' => 'Data checkout tidak ditemukan'], 404);
        }

        return response()->json($checkout);
    }
}
