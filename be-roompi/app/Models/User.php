<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Collection;

/**
 * Class User
 *
 * @property int $id
 * @property string $name
 *
 * @property int $id_user
 * @property string $role
 * @property string $nama
 * @property string $email
 * @property Carbon|null $email_verified_at
 * @property string $password
 * @property string $telepon
 * @property string|null $remember_token
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @property Collection|Pinjam[] $pinjams
 *
 * @package App\Models
 */
class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $table = 'users';
    protected $primaryKey = 'id_user';
    public $timestamps = false;
    public $incrementing = true;
    protected $keyType = 'int';

    protected $hidden = [
        'password',
        'remember_token'
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
        return $this->hasMany(Pinjam::class, 'id_user'); // atau 'user_iduser' tergantung relasi di tabel Pinjam
    }
}
