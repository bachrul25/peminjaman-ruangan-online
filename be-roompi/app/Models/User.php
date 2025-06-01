<?php

namespace App\Models;

use Carbon\Carbon;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Collection;
use App\Models\Pinjam;

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
        return $this->hasMany(Pinjam::class, 'id_user');
    }
}
