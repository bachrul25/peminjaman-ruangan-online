<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RuanganSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('ruangans')->insert([
            [
                'tipe_idtipe' => 1,
                'nama_ruangan' => 'Ruang Summarecon',
                'alamat' => 'Gedung A Lantai 2',
                'kapasitas' => 10,
                'harga' => 200000,
                'foto_ruangan' => 'ruangan_summeracon.jpg',
                'rating' => 4.5,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'tipe_idtipe' => 2,
                'nama_ruangan' => 'Aula Besar',
                'alamat' => 'Gedung Utama Lantai 1',
                'kapasitas' => 100,
                'harga' => 1500000,
                'foto_ruangan' => 'aula_besar.jpg',
                'rating' => 4.0,
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);
    }
}
