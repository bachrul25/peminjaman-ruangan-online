<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ViewDetailPinjam
 * 
 * @property int $id_pinjam
 * @property string $nama_user
 * @property string $email
 * @property string $telepon
 * @property string $name_room
 * @property string $alamat
 * @property int $kapasitas
 * @property int $harga
 * @property string $sesi_nama
 * @property Carbon $start_time
 * @property Carbon $end_time
 * @property Carbon $tanggal_pinjam
 *
 * @package App\Models
 */
class ViewDetailPinjam extends Model
{
	protected $table = 'view_detail_pinjam';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'id_pinjam' => 'int',
		'kapasitas' => 'int',
		'harga' => 'int',
		'start_time' => 'datetime',
		'end_time' => 'datetime',
		'tanggal_pinjam' => 'datetime'
	];

	protected $fillable = [
		'id_pinjam',
		'nama_user',
		'email',
		'telepon',
		'name_room',
		'alamat',
		'kapasitas',
		'harga',
		'sesi_nama',
		'start_time',
		'end_time',
		'tanggal_pinjam'
	];
}
