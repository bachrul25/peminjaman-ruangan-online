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
        DB::table('users')->updateOrInsert(
            ['email' => 'asep@example.com'], // Cek email
            [
                'name' => 'Asep',
                'password' => Hash::make('asep01'),
                'role' => 'admin',
                'telepon' => '081234567890',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );

        DB::table('users')->updateOrInsert(
            ['email' => 'joko@example.com'],
            [
                'name' => 'Joko',
                'password' => Hash::make('joko02'),
                'role' => 'member',
                'telepon' => '089876543210',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );
    }
}
