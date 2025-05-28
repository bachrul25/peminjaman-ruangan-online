<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Ruangan extends Model
{
    use HasFactory;

    protected $table = 'ruangans';
    protected $primaryKey = 'id_ruangan';
    protected $guarded = [];

    public function tipes()
    {
        return $this->belongsTo(Tipe::class, 'tipe_idtipe', 'id_tipe');
    }


    public function pinjams()
    {
        return $this->hasMany(Pinjam::class, 'ruangan_idruangan', 'id_ruangan');
    }

}
