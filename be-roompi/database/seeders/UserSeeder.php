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
                'role' => 'admin',
                'name' => 'Asep',
                'email' => 'asep@example.com',
                'password' => Hash::make('asep01'),
                // 'telepon' => '081234567890',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'role' => 'member',
                'name' => 'Joko',
                'email' => 'joko@example.com',
                'password' => Hash::make('joko02'),
                // 'telepon' => '089876543210',
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);
    }
}
