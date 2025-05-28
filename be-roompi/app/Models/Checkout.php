<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Checkout extends Model
{
    use HasFactory;

    protected $table = 'checkouts';
    protected $primaryKey = 'id_checkout';
    protected $guarded = [];
    public function check_ins()
    {
        return $this->belongsTo(CheckIn::class, 'checkin_idcheckin', 'id_checkin');
    }
}
