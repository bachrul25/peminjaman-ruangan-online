<?php
namespace App\Http\Controllers;

use App\Models\Sesi;
use Illuminate\Http\Request;

class SesiController extends Controller
{
    public function index()
    {
        return response()->json(Sesi::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:100',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
        ]);

        $sesi = Sesi::create($validated);

        return response()->json(['message' => 'Sesi berhasil ditambahkan', 'data' => $sesi], 201);
    }

    public function show(Sesi $sesi)
    {
        return response()->json($sesi);
    }

    public function update(Request $request, Sesi $sesi)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:100',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
        ]);

        $sesi->update($validated);

        return response()->json(['message' => 'Sesi berhasil diperbarui', 'data' => $sesi]);
    }

    public function destroy(Sesi $sesi)
    {
        $sesi->delete();

        return response()->json(['message' => 'Sesi berhasil dihapus']);
    }
}
