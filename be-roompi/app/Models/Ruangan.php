<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Ruangan
 *
 * @property int $id_ruangan
 * @property int $tipe_idtipe
 * @property string $nama_ruangan
 * @property string $alamat
 * @property int $kapasitas
 * @property int $harga
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
<<<<<<< HEAD
 *
=======

>>>>>>> e797eed9b66abb74bcc0fd3acaea87388b212f65
 * @property Tipe $tipe
 * @property Collection|Pinjam[] $pinjams

 * @package App\Models
 */
class Ruangan extends Model
{
    protected $table = 'ruangans';
    protected $primaryKey = 'id_ruangan';

    protected $casts = [
        'tipe_idtipe' => 'int',
        'kapasitas' => 'int',
        'harga' => 'int'
    ];

<<<<<<< HEAD
	protected $fillable = [
		'tipe_idtipe',
		'nama_ruangan',
		'alamat',
		'kapasitas',
		'harga',
        'foto_ruangan'
	];
=======
    protected $fillable = [
        'tipe_idtipe',
        'nama_ruangan',
        'alamat',
        'kapasitas',
        'harga'
    ];
>>>>>>> e797eed9b66abb74bcc0fd3acaea87388b212f65

    public function tipe()
    {
        return $this->belongsTo(Tipe::class, 'tipe_idtipe');
    }

    public function pinjams()
    {
        return $this->hasMany(Pinjam::class, 'ruangan_idruangan');
    }
}
