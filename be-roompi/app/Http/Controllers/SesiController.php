<?php

namespace App\Http\Controllers;

use App\Models\Sesi;
use Illuminate\Http\Request;

class SesiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sesis = Sesi::all();
        return view('sesis.index', compact('sesis'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('sesis.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:100',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
        ]);

        Sesi::create($request->all());

        return redirect()->route('sesis.index')
            ->with('success', 'Sesi berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(Sesi $sesi)
    {
        return view('sesis.show', compact('sesi'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Sesi $sesi)
    {
        return view('sesis.edit', compact('sesi'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Sesi $sesi)
    {
        $request->validate([
            'nama' => 'required|string|max:100',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
        ]);

        $sesi->update($request->all());

        return redirect()->route('sesis.index')
            ->with('success', 'Sesi berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sesi $sesi)
    {
        $sesi->delete();

        return redirect()->route('sesis.index')
            ->with('success', 'Sesi berhasil dihapus');
    }
}
