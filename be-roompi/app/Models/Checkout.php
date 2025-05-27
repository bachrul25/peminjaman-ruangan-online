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
 * @property int $id_checkin
 * @property Carbon $waktu_checkout
 * 
 * @property CheckIn $check_in
 *
 * @package App\Models
 */
class Checkout extends Model
{
	protected $table = 'checkout';
	protected $primaryKey = 'id_checkout';
	public $timestamps = false;

	protected $casts = [
		'id_checkin' => 'int',
		'waktu_checkout' => 'datetime'
	];

	protected $fillable = [
		'id_checkin',
		'waktu_checkout'
	];

	public function check_in()
	{
		return $this->belongsTo(CheckIn::class, 'id_checkin');
	}
}
