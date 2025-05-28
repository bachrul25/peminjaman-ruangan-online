<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Pinjam extends Model
{
    use HasFactory;

    protected $table = 'pinjams';
    protected $primaryKey = 'id_pinjam';
    protected $guarded = [];

    public function users()
    {
        return $this->belongsTo(User::class, 'user_iduser', 'id');
    }
    public function ruangans()
    {
        return $this->belongsTo(Ruangan::class, 'ruangan_idruangan', 'id_ruangan');
    }
    public function sesis()
    {
        return $this->belongsTo(Sesi::class, 'sesi_idsesi', 'id_sesi');
    }
    public function check_ins()
    {
        return $this->hasMany(Checkin::class, 'pinjam_idpinjam', 'id_pinjam');
    }

}
