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
        Schema::create('ruangans', function (Blueprint $table) {
            $table->id('id_ruangan');
            $table->foreignId('tipe_idtipe')->constrained('tipes', 'id_tipe');
            $table->string('nama_ruangan', 255);
            $table->string('alamat', 255);
            $table->integer('kapasitas');
            $table->integer('harga');
            $table->string('foto_ruangan');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ruangans');
    }
};
