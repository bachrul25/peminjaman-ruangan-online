<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\CheckIn;
use App\Models\CheckOut;
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
        $existingCheckout = CheckOut::where('checkin_idcheckin', $request->checkin_idcheckin)->first();
        if ($existingCheckout) {
            return response()->json(['message' => 'Check-in ini sudah melakukan checkout sebelumnya'], 400);
        }

        $checkIn = CheckIn::with('pinjams')->find($request->checkin_idcheckin);
        $pinjam = $checkIn->pinjams;

        // Hitung denda jika melebihi waktu sesi
        $denda = 0;
        $keterangan = null;

        $sesi = $pinjam->sesis;
        $waktuSelesai = Carbon::parse($pinjam->tanggal_pinjam)->format('Y-m-d') . ' ' . $sesi->end_time;
        $waktuSelesai = Carbon::parse($waktuSelesai);
        $waktuCheckout = Carbon::now();

        if ($waktuCheckout->gt($waktuSelesai)) {
            // Denda 10% dari harga ruangan per jam
            $jamTerlambat = $waktuCheckout->diffInHours($waktuSelesai);
            $denda = $pinjam->ruangans->harga * 0.1 * $jamTerlambat;
            $keterangan = 'Terlambat ' . $jamTerlambat . ' jam';
        }

        $checkout = CheckOut::create([
            'checkin_idcheckin' => $request->checkin_idcheckin,
            'tanggal_checkout' => $waktuCheckout,
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
        $checkout = CheckOut::with([
            'check_ins.pinjams.users',
            'check_ins.pinjams.ruangans',
            'check_ins.pinjams.sesis'
        ])->find($id);

        if (!$checkout) {
            return response()->json(['message' => 'Data checkout tidak ditemukan'], 404);
        }

        return response()->json($checkout);
    }
}
