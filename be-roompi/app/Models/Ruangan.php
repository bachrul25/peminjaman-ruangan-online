<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Ruangan
 * 
 * @property int $id_room
 * @property int $id_category
 * @property string $name_room
 * @property string $alamat
 * @property int $kapasitas
 * @property int $harga
 * 
 * @property Tipe $tipe
 * @property Collection|Pinjam[] $pinjams
 *
 * @package App\Models
 */
class Ruangan extends Model
{
	protected $table = 'ruangan';
	protected $primaryKey = 'id_room';
	public $timestamps = false;

	protected $casts = [
		'id_category' => 'int',
		'kapasitas' => 'int',
		'harga' => 'int'
	];

	protected $fillable = [
		'id_category',
		'name_room',
		'alamat',
		'kapasitas',
		'harga'
	];

	public function tipe()
	{
		return $this->belongsTo(Tipe::class, 'id_category');
	}

	public function pinjams()
	{
		return $this->hasMany(Pinjam::class, 'id_room');
	}
}
