<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pinjams', function (Blueprint $table) {
            $table->id('id_pinjam');
            $table->foreignId('user_iduser')->constrained('users', 'id_user');
            $table->foreignId('ruangan_idruangan')->constrained('ruangans', 'id_ruangan');
            $table->foreignId('sesi_idsesi')->constrained('sesis', 'id_sesi');
            $table->dateTime('tanggal_pinjam');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pinjams');
    }
};
