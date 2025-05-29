<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'name' => 'Asep',
                'email' => 'asep@example.com',
                'password' => Hash::make('asep01'),
                'role' => 'admin',
                // 'telepon' => '081234567890',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Joko',
                'email' => 'joko@example.com',
                'password' => Hash::make('joko02'),
                'role' => 'member',
                // 'telepon' => '089876543210',
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);
    }
}
