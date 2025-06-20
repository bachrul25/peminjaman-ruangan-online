<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Pinjam
 *
 * @property int $id_pinjam
 * @property int $user_iduser
 * @property int $ruangan_idruangan
 * @property int $sesi_idsesi
 * @property Carbon $tanggal_pinjam
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @property Ruangan $ruangan
 * @property Sesi $sesi
 * @property User $user
 * @property Collection|CheckIn[] $checkin
 *
 * @package App\Models
 */
class Pinjam extends Model
{
    protected $table = 'pinjams';
    protected $primaryKey = 'id_pinjam';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $casts = [
        'user_iduser' => 'int',
        'ruangan_idruangan' => 'int',
        'sesi_idsesi' => 'int',
        'tanggal_pinjam' => 'datetime'
    ];

    protected $fillable = [
        'user_iduser',
        'ruangan_idruangan',
        'sesi_idsesi',
        'tanggal_pinjam'
    ];

    public function ruangan()
    {
        return $this->belongsTo(Ruangan::class, 'ruangan_idruangan');
    }

    public function sesi()
    {
        return $this->belongsTo(Sesi::class, 'sesi_idsesi');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_iduser', 'id_user');
    }


    public function checkin()
    {
        return $this->hasOne(CheckIn::class, 'pinjam_idpinjam');
    }

}
