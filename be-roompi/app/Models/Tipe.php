<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Tipe
 * 
 * @property int $id_category
 * @property string $nama
 * @property string $deskripsi
 * 
 * @property Collection|Ruangan[] $ruangans
 *
 * @package App\Models
 */
class Tipe extends Model
{
	protected $table = 'tipe';
	protected $primaryKey = 'id_category';
	public $timestamps = false;

	protected $fillable = [
		'nama',
		'deskripsi'
	];

	public function ruangans()
	{
		return $this->hasMany(Ruangan::class, 'id_category');
	}
}
