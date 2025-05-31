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
 * @property int $id_user
 * @property int $id_room
 * @property int $id_sesi
 * @property Carbon $tanggal_pinjam
 * 
 * @property Sesi $sesi
 * @property User $user
 * @property Ruangan $ruangan
 * @property Collection|CheckIn[] $check_ins
 *
 * @package App\Models
 */
class Pinjam extends Model
{
	protected $table = 'pinjam';
	protected $primaryKey = 'id_pinjam';
	public $timestamps = false;

	protected $casts = [
		'id_user' => 'int',
		'id_room' => 'int',
		'id_sesi' => 'int',
		'tanggal_pinjam' => 'datetime'
	];

	protected $fillable = [
		'id_user',
		'id_room',
		'id_sesi',
		'tanggal_pinjam'
	];

	public function sesi()
	{
		return $this->belongsTo(Sesi::class, 'id_sesi');
	}

	public function user()
	{
		return $this->belongsTo(User::class, 'id_user');
	}

	public function ruangan()
	{
		return $this->belongsTo(Ruangan::class, 'id_room');
	}

	public function check_ins()
	{
		return $this->hasMany(CheckIn::class, 'id_pinjam');
	}
}
