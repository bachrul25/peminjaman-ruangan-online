<?php

namespace App\Http\Controllers;

use App\Models\Ruangan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

use function Pest\Laravel\json;

class RuanganController extends Controller
{
    // Show all data
    public function index(){
        $ruangan = Ruangan::with('tipe')->get();

        if ($ruangan->isEmpty()) {
            return response()->json([
                "success" => false,
                "message" => "Resource not found!",
                "data" => []
            ], 404);
        }

        return response()->json([
            "success" => true,
            "message" => "Get all resource",
            "data" => $ruangan
        ], 200);
    }

    // Upload data
    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'tipe_idtipe' => 'required|exists:tipes,id_tipe',
            'nama_ruangan' => 'required|string|max:255',
            'alamat' => 'required|string',
            'kapasitas' => 'required|integer|min:1',
            'harga' => 'required|integer|min:0',
            'foto_ruangan' => 'required|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'message' => $validator->errors()
            ], 422);
        }

        $image = $request->file('foto_ruangan');
        $image->store('ruangan', 'public');

        $ruangan = Ruangan::create([
            'tipe_idtipe' => $request->tipe_idtipe,
            'nama_ruangan' => $request->nama_ruangan,
            'alamat' => $request->alamat,
            'kapasitas' => $request->kapasitas,
            'harga' => $request->harga,
            'foto_ruangan' => $request->foto_ruangan->hashName()
        ]);

        return response()->json([
            'success' => true,
            'message' => 'room data has been successfully created!',
            'data' => $ruangan
        ], 201);
    }

    // Show data by id
    public function Show(string $id){
        $ruangan = Ruangan::find($id);
        if (!$ruangan) {
            return response()->json([
                'success' => false,
                'message' => 'Data not found!'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Get detail data room',
            'data' => $ruangan
        ], 200);
    }

    // Update data by id
    public function update( Request $request, string $id){
        $ruangan = Ruangan::find($id);
        if (!$ruangan) {
            return response()->json([
                'success' => false,
                'message' => 'Data not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'tipe_idtipe' => 'required|exists:tipes,id_tipe',
            'nama_ruangan' => 'required|string|max:50',
            'alamat' => 'required|string',
            'kapasitas' => 'required|integer',
            'harga' => 'required|integer',
            'foto_ruangan' => 'required|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        $data = [
            'tipe_idtipe' => $request->tipe_idtipe,
            'nama_ruangan' => $request->nama_ruangan,
            'alamat' => $request->alamat,
            'kapasitas' => $request->kapasitas,
            'harga' => $request->harga
        ];

        // Handle image
        if ($request->hasFile('foto_ruangan')){
            $image = $request->file('foto_ruangan');
            $image->store('ruangan', 'public');

            if ($ruangan->foto_ruangan){
                Storage::disk('public')->delete('ruangan/' . $ruangan->foto_ruangan);
            }

            $data['foto_ruangan'] = $image->hashName();
        }

        $ruangan->update($data);
        return response()->json([
            'success' => true,
            'message' => 'Data has been updated!',
            'data' => $ruangan
        ], 200);
    }

    public function destroy(string $id){
        $ruangan = Ruangan::find($id);
        if (!$ruangan) {
            return response()->json([
                'success' => false,
                'message' => ' Data not found'
            ], 404);
        }

        if ($ruangan->foto_ruangan){
            // Delete from storage
            Storage::disk('public')->delete('ruangan/' . $ruangan->foto_ruangan);
        }

        $ruangan->delete();
        return response()->json([
            'success' => true,
            'message' => 'Delete data successfully'
        ], 200);
    }
}
