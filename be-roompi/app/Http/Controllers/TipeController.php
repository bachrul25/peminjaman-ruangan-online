<?php
namespace App\Http\Controllers;

use App\Models\Tipe;
use Illuminate\Http\Request;

class TipeController extends Controller
{
    public function index()
    {
        return response()->json(Tipe::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:80',
            'deskripsi' => 'required|string',
        ]);

        $tipe = Tipe::create($validated);

        return response()->json(['message' => 'Tipe berhasil ditambahkan', 'data' => $tipe], 201);
    }

    public function show(Tipe $tipe)
    {
        return response()->json($tipe);
    }

    public function update(Request $request, Tipe $tipe)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:80',
            'deskripsi' => 'required|string',
        ]);

        $tipe->update($validated);

        return response()->json(['message' => 'Tipe berhasil diperbarui', 'data' => $tipe]);
    }

    public function destroy(Tipe $tipe)
    {
        if ($tipe->ruangans()->count()) {
            return response()->json([
                'message' => 'Tidak bisa menghapus tipe karena masih digunakan di data ruangan.'
            ], 400);
        }

        $tipe->delete();
        return response()->json(['message' => 'Tipe berhasil dihapus']);
    }

}
