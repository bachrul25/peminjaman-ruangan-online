<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Sesi
 * 
 * @property int $id_sesi
 * @property string $nama
 * @property Carbon $start_time
 * @property Carbon $end_time
 * 
 * @property Collection|Pinjam[] $pinjams
 *
 * @package App\Models
 */
class Sesi extends Model
{
	protected $table = 'sesi';
	protected $primaryKey = 'id_sesi';
	public $timestamps = false;

	protected $casts = [
		'start_time' => 'datetime',
		'end_time' => 'datetime'
	];

	protected $fillable = [
		'nama',
		'start_time',
		'end_time'
	];

	public function pinjams()
	{
		return $this->hasMany(Pinjam::class, 'id_sesi');
	}
}
