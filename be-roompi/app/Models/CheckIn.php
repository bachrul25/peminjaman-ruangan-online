<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Database\Seeders\CheckoutSeeder;
use Database\Seeders\PinjamSeeder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class CheckIn
 * 
 * @property int $id_checkin
 * @property int $id_pinjam
 * @property Carbon $tanggal_checkin
 * 
 * @property Pinjam $pinjam
 * @property Collection|Checkout[] $checkouts
 *
 * @package App\Models
 */
class CheckIn extends Model
{
	protected $table = 'check_in';
	protected $primaryKey = 'id_checkin';
	public $timestamps = false;

	protected $casts = [
		'id_pinjam' => 'int',
		'tanggal_checkin' => 'datetime'
	];

	protected $fillable = [
		'id_pinjam',
		'tanggal_checkin'
	];

	public function pinjam()
	{
		return $this->belongsTo(Pinjam::class, 'id_pinjam');
	}

	public function checkouts()
	{
		return $this->hasMany(CheckoutSeeder::class, 'id_checkin');
	}
}
