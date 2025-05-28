<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sesi extends Model
{
    use HasFactory;

    protected $table = 'sesis';
    protected $primaryKey = 'id_sesi';
    protected $guarded = [];

    public function pinjams()
    {
        return $this->hasMany(Pinjam::class, 'sesi_idsesi', 'id_sesi');
    }
}
