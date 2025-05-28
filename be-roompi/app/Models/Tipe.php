<?php

namespace App\Models;

use App\Models\Ruangan;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Tipe extends Model
{
    use HasFactory;

    protected $table = 'tipes';
    protected $primaryKey = 'id_tipe';
    protected $guarded = [];

    public function ruangan()
    {
        return $this->hasMany(Ruangan::class, 'tipe_idtipe', 'id_tipe');
    }
}
