<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

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
    protected $table = 'users';
    protected $primaryKey = 'id_user';
    public $timestamps = false;

    protected $hidden = [
        'password'
    ];

    protected $fillable = [
        'role',
        'nama',
        'email',
        'password',
        'telepon'
    ];

    public function pinjams()
    {
        return $this->hasMany(Pinjam::class, 'id_user');
    }
}
