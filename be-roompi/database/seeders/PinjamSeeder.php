<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PinjamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('pinjams')->insert([
            [
                'user_iduser' => 2,
                'ruangan_idruangan' => 1,
                'sesi_idsesi' => 1,
                'tanggal_pinjam' => '2025-05-07 09:00:00',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'user_iduser' => 2,
                'ruangan_idruangan' => 2,
                'sesi_idsesi' => 1,
                'tanggal_pinjam' => '2025-05-08 13:00:00',
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);
    }
}
