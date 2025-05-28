<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CheckIn extends Model
{
    use HasFactory;
    protected $table = 'check_ins';
    protected $primaryKey = 'id_checkin';
    protected $guarded = [];
    public function pinjams()
    {
        return $this->belongsTo(Pinjam::class, 'pinjam_idpinjam', 'id_pinjam');
    }
    public function checkouts()
    {
        return $this->hasMany(CheckOut::class, 'checkin_idcheckin', 'id_checkin');
    }
}
