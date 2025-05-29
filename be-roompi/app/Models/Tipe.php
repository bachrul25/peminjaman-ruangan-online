<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Tipe
 * 
 * @property int $id_tipe
 * @property string $nama
 * @property string $deskripsi
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Collection|Ruangan[] $ruangans
 *
 * @package App\Models
 */
class Tipe extends Model
{
	protected $table = 'tipes';
	protected $primaryKey = 'id_tipe';

	protected $fillable = [
		'nama',
		'deskripsi'
	];

	public function ruangans()
	{
		return $this->hasMany(Ruangan::class, 'tipe_idtipe');
	}
}
