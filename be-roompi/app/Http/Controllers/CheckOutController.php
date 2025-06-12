<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\CheckIn;
use App\Models\Checkout;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CheckOutController extends Controller
{
    /**
     * Menyimpan data checkout baru dan menghitung denda.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            // Validasi berdasarkan foreign key di tabel checkouts dan primary key di tabel check_ins
            'checkin_idcheckin' => 'required|exists:check_ins,id_checkin',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validasi gagal',
                'errors' => $validator->errors()
            ], 422); // 422 Unprocessable Entity adalah status yang tepat untuk error validasi
        }

        // Cek duplikasi checkout dengan lebih efisien menggunakan exists()
        $isAlreadyCheckedOut = Checkout::where('checkin_idcheckin', $request->checkin_idcheckin)->exists();
        if ($isAlreadyCheckedOut) {
            return response()->json(['message' => 'Check-in ini sudah melakukan checkout sebelumnya'], 409); // 409 Conflict
        }

        // Eager load semua relasi yang dibutuhkan untuk menghindari Lazy Loading saat menghitung denda
        $checkIn = CheckIn::with(['pinjam.sesi', 'pinjam.ruangan'])
            ->find($request->checkin_idcheckin);

        // Validasi jika data check-in atau peminjaman tidak ada
        if (!$checkIn || !$checkIn->pinjam) {
            return response()->json(['message' => 'Data peminjaman terkait check-in tidak ditemukan'], 404);
        }

        // --- Logika Perhitungan Denda ---
        $pinjam = $checkIn->pinjam;
        $sesi = $pinjam->sesi;
        $ruangan = $pinjam->ruangan;
        $denda = 0;
        $keterangan_denda = null;

        // Membuat objek Carbon untuk waktu selesai sesi dengan lebih aman
        $waktuSelesaiSesi = Carbon::parse($pinjam->tanggal_pinjam)->setTimeFromTimeString($sesi->end_time);
        $waktuCheckout = Carbon::now();

        if ($waktuCheckout->isAfter($waktuSelesaiSesi)) {
            // Dihitung per jam. Keterlambatan beberapa menit/detik akan dihitung sebagai 1 jam.
            $jamTerlambat = $waktuCheckout->diffInHours($waktuSelesaiSesi) + 1;
            // Denda 10% dari harga ruangan, dikalikan jumlah jam terlambat
            $dendaPerJam = $ruangan->harga * 0.1;
            $denda = $dendaPerJam * $jamTerlambat;
            $keterangan_denda = 'Terlambat selama ' . $jamTerlambat . ' jam.';
        }

        // Simpan data checkout ke database
        $checkout = Checkout::create([
            'checkin_idcheckin' => $request->checkin_idcheckin,
            'waktu_checkout' => $waktuCheckout,
            'denda' => $denda,
            'keterangan' => $keterangan_denda,
        ]);

        return response()->json([
            'message' => 'Checkout berhasil dicatat',
            'data' => $checkout
        ], 201);
    }

    /**
     * Menampilkan detail checkout dengan data relasi yang spesifik (LEBIH CEPAT).
     */
    public function show($id)
    {
        // Menggunakan eager loading dengan memilih kolom spesifik untuk performa maksimal
        $checkout = Checkout::with([
            'check_in:id_checkin,pinjam_idpinjam,tanggal_checkin',
            'check_in.pinjam:id_pinjam,user_iduser,ruangan_idruangan,sesi_idsesi,tanggal_pinjam',
            'check_in.pinjam.user:id_user,name,email,telepon',
            'check_in.pinjam.ruangan:id_ruangan,nama_ruangan,harga',
            'check_in.pinjam.sesi:id_sesi,nama,start_time,end_time'
        ])
            ->where('checkin_idcheckin', $id)
            ->first();

        if (!$checkout) {
            return response()->json(['message' => 'Data checkout tidak ditemukan'], 404);
        }

        return response()->json(['data' => $checkout]);
    }
}
