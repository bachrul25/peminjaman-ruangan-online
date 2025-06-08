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
            ],
            [
                'tipe_idtipe' => 1,
                'nama_ruangan' => 'Ruang Diskusi A',
                'alamat' => 'Gedung B Lantai 3',
                'kapasitas' => 8,
                'harga' => 150000,
                'foto_ruangan' => 'ruang_diskusi_a.jpg',
                'rating' => 4.2,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'tipe_idtipe' => 1,
                'nama_ruangan' => 'Ruang Meeting Sunrise',
                'alamat' => 'Gedung A Lantai 1',
                'kapasitas' => 10,
                'harga' => 180000,
                'foto_ruangan' => 'ruang_meeting_sunrise.jpg',
                'rating' => 4.3,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'tipe_idtipe' => 1,
                'nama_ruangan' => 'Ruang Kolaborasi',
                'alamat' => 'Gedung C Lantai 2',
                'kapasitas' => 6,
                'harga' => 130000,
                'foto_ruangan' => 'ruang_kolaborasi.jpg',
                'rating' => 4.1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'tipe_idtipe' => 2,
                'nama_ruangan' => 'Aula Merdeka',
                'alamat' => 'Gedung Utama Lantai 2',
                'kapasitas' => 120,
                'harga' => 1600000,
                'foto_ruangan' => 'aula_merdeka.jpg',
                'rating' => 4.6,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'tipe_idtipe' => 2,
                'nama_ruangan' => 'Ruang Seminar Alpha',
                'alamat' => 'Gedung D Lantai 1',
                'kapasitas' => 80,
                'harga' => 1100000,
                'foto_ruangan' => 'ruang_seminar_alpha.jpg',
                'rating' => 4.0,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'tipe_idtipe' => 2,
                'nama_ruangan' => 'Auditorium B',
                'alamat' => 'Gedung B Lantai 1',
                'kapasitas' => 150,
                'harga' => 1800000,
                'foto_ruangan' => 'auditorium_b.jpg',
                'rating' => 4.7,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'tipe_idtipe' => 1,
                'nama_ruangan' => 'Ruang Inovasi',
                'alamat' => 'Gedung C Lantai 1',
                'kapasitas' => 12,
                'harga' => 200000,
                'foto_ruangan' => 'ruang_inovasi.jpg',
                'rating' => 4.4,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'tipe_idtipe' => 1,
                'nama_ruangan' => 'Ruang Eksekutif',
                'alamat' => 'Gedung A Lantai 3',
                'kapasitas' => 8,
                'harga' => 250000,
                'foto_ruangan' => 'ruang_eksekutif.jpg',
                'rating' => 4.8,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'tipe_idtipe' => 2,
                'nama_ruangan' => 'Ruang Presentasi',
                'alamat' => 'Gedung D Lantai 2',
                'kapasitas' => 70,
                'harga' => 1000000,
                'foto_ruangan' => 'ruang_presentasi.jpg',
                'rating' => 4.2,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'tipe_idtipe' => 1,
                'nama_ruangan' => 'Ruang Konsultasi',
                'alamat' => 'Gedung B Lantai 2',
                'kapasitas' => 5,
                'harga' => 120000,
                'foto_ruangan' => 'ruang_konsultasi.jpg',
                'rating' => 4.0,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'tipe_idtipe' => 2,
                'nama_ruangan' => 'Hall Nusantara',
                'alamat' => 'Gedung E Lantai Dasar',
                'kapasitas' => 200,
                'harga' => 2000000,
                'foto_ruangan' => 'hall_nusantara.jpg',
                'rating' => 4.9,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'tipe_idtipe' => 1,
                'nama_ruangan' => 'Ruang Inspirasi',
                'alamat' => 'Gedung C Lantai 4',
                'kapasitas' => 9,
                'harga' => 160000,
                'foto_ruangan' => 'ruang_inspirasi.jpg',
                'rating' => 4.1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'tipe_idtipe' => 2,
                'nama_ruangan' => 'Ruang Workshop',
                'alamat' => 'Gedung F Lantai 1',
                'kapasitas' => 50,
                'harga' => 800000,
                'foto_ruangan' => 'ruang_workshop.jpg',
                'rating' => 4.3,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'tipe_idtipe' => 2,
                'nama_ruangan' => 'Auditorium C',
                'alamat' => 'Gedung G Lantai 2',
                'kapasitas' => 130,
                'harga' => 1750000,
                'foto_ruangan' => 'auditorium_c.jpg',
                'rating' => 4.6,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'tipe_idtipe' => 1,
                'nama_ruangan' => 'Ruang Startup',
                'alamat' => 'Gedung B Lantai 4',
                'kapasitas' => 7,
                'harga' => 140000,
                'foto_ruangan' => 'ruang_startup.jpg',
                'rating' => 4.2,
                'created_at' => now(),
                'updated_at' => now()
            ],
        ]);
    }
}
