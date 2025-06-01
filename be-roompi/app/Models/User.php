<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Collection;
// use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;

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
    protected $table = 'users';
    protected $primaryKey = 'id_user'; // pakai primary key custom
    public $timestamps = true;

    protected $casts = [
        'email_verified_at' => 'datetime'
    ];

    protected $hidden = [
        'password',
        'remember_token'
    ];

    protected $fillable = [
        'role',
        'nama',
        'email',
        'email_verified_at',
        'password',
        // 'telepon',
        'remember_token'
    ];

    public function pinjams()
    {
        return $this->hasMany(Pinjam::class, 'id_user'); // atau 'user_iduser' tergantung relasi di tabel Pinjam
    }
}
