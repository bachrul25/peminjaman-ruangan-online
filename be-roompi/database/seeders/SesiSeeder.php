<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class SesiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('sesis')->insert([
            [
                'nama' => 'Pagi',
                'start_time' => '08:00:00',
                'end_time' => '12:00:00',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'nama' => 'Siang',
                'start_time' => '13:00:00',
                'end_time' => '17:00:00',
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);
    }
}
