<?php

namespace App\Http\Controllers;

use App\Models\Ruangan;
use Illuminate\Http\Request;

class RuanganController extends Controller
{
    // Show all data
    public function index(){
        $ruangans = Ruangan::all();

        if ($ruangans->isEmpty()) {
            return response()->json([
                "success" => true,
                "message" => "Resource not found!"
            ], 200);
        }

        return response()->json([
            "success" => true,
            "message" => "Get all resource"
        ], 200);
    }
}
