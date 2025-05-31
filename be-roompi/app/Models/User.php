<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;

/**
 * Class User
 * 
 * @property int $id_user
 * @property string $role
 * @property string $nama
 * @property string $email
 * @property string $password
 * @property string $telepon
 * 
 * @property Collection|Pinjam[] $pinjams
 *
 * @package App\Models
 */
class User extends Model
{
	use HasApiTokens,  Notifiable;

	protected $table = 'users';
	protected $primaryKey = 'id_user';
	public $timestamps = false;
	public $incrementing = true;
    protected $keyType = 'int';

	protected $hidden = [
		'password'
	];

	protected $fillable = [
		'role',
		'name',
		'email',
		'password',
		'telepon'
	];

	public function pinjams()
	{
		return $this->hasMany(Pinjam::class, 'id_user');
	}
}
