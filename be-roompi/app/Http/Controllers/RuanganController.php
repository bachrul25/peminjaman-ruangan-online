<?php

namespace App\Http\Controllers;

use App\Models\Pinjam;
use App\Models\Ruangan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RuanganController extends Controller
{
    // Show all data with pagination and filtering options
    public function index(Request $request)
    {
        $query = Ruangan::with('tipe');

        // Add filters if provided in request
        if ($request->has('tipe_id')) {
            $query->where('tipe_idtipe', $request->tipe_id);
        }

        if ($request->has('min_capacity')) {
            $query->where('kapasitas', '>=', $request->min_capacity);
        }

        if ($request->has('max_price')) {
            $query->where('harga', '<=', $request->max_price);
        }
        // Filter berdasarkan nama tipe (menggantikan kategori)
        if ($request->has('nama_tipe')) {
            $query->whereHas('tipe', function ($q) use ($request) {
                $q->where('nama', 'like', '%' . $request->nama_tipe . '%');
            });
        }

        // Paginate results (default 10 per page)
        $ruangans = $query->paginate($request->per_page ?? 10);

        if ($ruangans->isEmpty()) {
            return response()->json([
                "success" => false,
                "message" => "No rooms found with the given criteria",
                "data" => []
            ], 404);
        }

        return response()->json([
            "success" => true,
            "message" => "Rooms retrieved successfully",
            "data" => $ruangans
        ], 200);
    }

    // Create new room
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'tipe_idtipe' => 'required|exists:tipes,id_tipe',
            'nama_ruangan' => 'required|string|max:50|unique:ruangans,nama_ruangan',
            'alamat' => 'required|string',
            'kapasitas' => 'required|integer|min:1',
            'harga' => 'required|integer|min:0'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $ruangan = Ruangan::create([
                'tipe_idtipe' => $request->tipe_idtipe,
                'nama_ruangan' => $request->nama_ruangan,
                'alamat' => $request->alamat,
                'kapasitas' => $request->kapasitas,
                'harga' => $request->harga
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Room created successfully',
                'data' => $ruangan
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create room',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Show room details
    public function show(string $id)
    {
        $ruangan = Ruangan::with('tipe')->find($id);

        if (!$ruangan) {
            return response()->json([
                'success' => false,
                'message' => 'Room not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Room details retrieved successfully',
            'data' => $ruangan
        ], 200);
    }

    // Update room data
    public function update(Request $request, string $id)
    {
        $ruangan = Ruangan::find($id);

        if (!$ruangan) {
            return response()->json([
                'success' => false,
                'message' => 'Room not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'tipe_idtipe' => 'exists:tipes,id_tipe',
            'nama_ruangan' => 'string|max:50|unique:ruangans,nama_ruangan,' . $id . ',id_ruangan',
            'alamat' => 'string',
            'kapasitas' => 'integer|min:1',
            'harga' => 'integer|min:0'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $ruangan->update($request->all());

            return response()->json([
                'success' => true,
                'message' => 'Room updated successfully',
                'data' => $ruangan
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update room',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Delete room
    public function destroy(string $id)
    {
        $ruangan = Ruangan::find($id);

        if (!$ruangan) {
            return response()->json([
                'success' => false,
                'message' => 'Room not found'
            ], 404);
        }

        try {
            // Check if room has any bookings before deleting
            if ($ruangan->pinjams()->exists()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Cannot delete room because it has existing bookings'
                ], 400);
            }

            $ruangan->delete();

            return response()->json([
                'success' => true,
                'message' => 'Room deleted successfully'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete room',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Get available rooms
    public function availableRooms(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'tanggal' => 'required|date|after_or_equal:today',
            'sesi_id' => 'required|exists:sesis,id_sesi',
            'tipe_id' => 'nullable|exists:tipes,id_tipe',
            'min_capacity' => 'nullable|integer|min:1',
            'max_price' => 'nullable|integer|min:0',
            'nama_tipe' => 'nullable|string' // Validasi untuk nama tipe
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        // Get rooms that are not booked for the given date and session
        $bookedRoomIds = Pinjam::where('tanggal_pinjam', $request->tanggal)
            ->where('sesi_idsesi', $request->sesi_id)
            ->pluck('ruangan_idruangan');

        $query = Ruangan::with('tipe')
            ->whereNotIn('id_ruangan', $bookedRoomIds);

        // Apply additional filters if provided
        if ($request->has('tipe_id')) {
            $query->where('tipe_idtipe', $request->tipe_id);
        }

        if ($request->has('min_capacity')) {
            $query->where('kapasitas', '>=', $request->min_capacity);
        }

        if ($request->has('max_price')) {
            $query->where('harga', '<=', $request->max_price);
        }

        $availableRooms = $query->get();

        return response()->json([
            'success' => true,
            'message' => 'Available rooms retrieved successfully',
            'data' => $availableRooms
        ], 200);
    }
}
