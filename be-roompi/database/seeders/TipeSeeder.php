<?php

namespace Database\Seeders;

use App\Models\Tipe;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class TipeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $data = [
            [
                'nama' => 'Rapat',
                'deskripsi' => 'Ruang untuk rapat kecil 5-10 orang',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'Konferensi',
                'deskripsi' => 'Ruang besaruntuk konferensi atau seminar',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];


        Tipe::insert($data);
    }
}
