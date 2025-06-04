<?php

namespace App\Filament\Pages\Auth;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Pages\Auth\Register as BaseRegister;
use Illuminate\Validation\Rules\Password;

class CustomRegister extends BaseRegister
{
    public function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('name')
                    ->label('Nama Lengkap')
                    ->required()
                    ->maxLength(255),

                TextInput::make('email')
                    ->label('Alamat Email')
                    ->email()
                    ->required()
                    ->maxLength(255)
                    ->unique('users'),

                TextInput::make('password')
                    ->label('Password')
                    ->password()
                    ->required()
                    ->rule(Password::default())
                    ->same('passwordConfirmation'),

                TextInput::make('passwordConfirmation')
                    ->label('Konfirmasi Password')
                    ->password()
                    ->required()
                    ->dehydrated(false),

                TextInput::make('telepon')
                    ->label('Nomor Telepon')
                    ->tel()
                    ->required()
                    ->maxLength(15),
            ])
            ->statePath('data');
    }
}
