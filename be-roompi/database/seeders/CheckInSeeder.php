<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CheckInSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('check_ins')->insert([
            [
                'pinjam_idpinjam' => 1,
                'tanggal_checkin' => '2025-05-07 09:10:00',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'pinjam_idpinjam' => 2,
                'tanggal_checkin' => '2025-05-08 13:10:00',
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);
    }
}
