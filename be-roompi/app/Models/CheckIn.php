<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class CheckIn
 *
 * @property int $id_checkin
 * @property int $pinjam_idpinjam
 * @property Carbon $tanggal_checkin
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @property Pinjam $pinjam
 * @property Collection|Checkout[] $checkouts
 *
 * @package App\Models
 */
class CheckIn extends Model
{
    protected $table = 'check_ins';
    protected $primaryKey = 'id_checkin';

    protected $casts = [
        'pinjam_idpinjam' => 'int',
        'tanggal_checkin' => 'datetime'
    ];

    protected $fillable = [
        'pinjam_idpinjam',
        'tanggal_checkin'
    ];


    public function pinjam()
    {
        return $this->belongsTo(Pinjam::class, 'pinjam_idpinjam');
    }

    public function checkout()
    {
        return $this->hasOne(Checkout::class, 'checkin_idcheckin');
    }

}
