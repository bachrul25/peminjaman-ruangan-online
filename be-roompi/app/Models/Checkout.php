<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Checkout
 * 
 * @property int $id_checkout
 * @property int $checkin_idcheckin
 * @property Carbon $waktu_checkout
 * @property int $denda
 * @property string|null $keterangan
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property CheckIn $check_in
 *
 * @package App\Models
 */
class Checkout extends Model
{
	protected $table = 'checkouts';
	protected $primaryKey = 'id_checkout';

	protected $casts = [
		'checkin_idcheckin' => 'int',
		'waktu_checkout' => 'datetime',
		'denda' => 'int'
	];

	protected $fillable = [
		'checkin_idcheckin',
		'waktu_checkout',
		'denda',
		'keterangan'
	];

	public function check_in()
	{
		return $this->belongsTo(CheckIn::class, 'checkin_idcheckin');
	}
}
