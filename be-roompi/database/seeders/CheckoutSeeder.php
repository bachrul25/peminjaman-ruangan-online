<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CheckoutSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('checkouts')->insert([
            [
                'checkin_idcheckin' => 1,
                'waktu_checkout' => '2025-05-07',
                'denda' => 0,
                'keterangan' => null,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'checkin_idcheckin' => 2,
                'waktu_checkout' => '2025-05-08',
                'denda' => 0,
                'keterangan' => null,
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);
    }
}
