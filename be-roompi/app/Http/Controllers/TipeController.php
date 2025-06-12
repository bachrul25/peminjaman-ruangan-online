<?php

namespace App\Http\Controllers;

use App\Models\Tipe;
use Illuminate\Http\Request;

class TipeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tipes = Tipe::all();
        return view('tipes.index', compact('tipes'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('tipes.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:80',
            'deskripsi' => 'required|string',
        ]);

        Tipe::create($request->all());

        return redirect()->route('tipes.index')
            ->with('success', 'Tipe berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(Tipe $tipe)
    {
        return view('tipes.show', compact('tipe'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tipe $tipe)
    {
        return view('tipes.edit', compact('tipe'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tipe $tipe)
    {
        $request->validate([
            'nama' => 'required|string|max:80',
            'deskripsi' => 'required|string',
        ]);

        $tipe->update($request->all());

        return redirect()->route('tipes.index')
            ->with('success', 'Tipe berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tipe $tipe)
    {
        $tipe->delete();

        return redirect()->route('tipes.index')
            ->with('success', 'Tipe berhasil dihapus');
    }
}
