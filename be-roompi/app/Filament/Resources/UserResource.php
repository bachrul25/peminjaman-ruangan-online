<?php

namespace App\Filament\Resources;

// use Filament\Forms;
use App\Models\User;
use Filament\Tables;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Toggle;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextInput;
use Filament\Notifications\Notification;
// use Illuminate\Database\Eloquent\Builder;
// use Filament\Tables\Filters\TrashedFilter;
use Filament\Forms\Components\DateTimePicker;
use App\Filament\Resources\UserResource\Pages;
// use Illuminate\Database\Eloquent\SoftDeletingScope;
// use App\Filament\Resources\UserResource\RelationManagers;

class UserResource extends Resource
{
    protected static ?string $model = User::class;

    protected static ?string $navigationIcon = 'heroicon-o-user-group';
    protected static ?string $navigationLabel = 'Manajemen User';
    protected static ?string $navigationGroup = 'Admin Panel';
    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('name')
                    ->label('Nama Lengkap')
                    ->required()
                    ->maxLength(255),

                TextInput::make('email')
                    ->email()
                    ->required()
                    ->unique(ignoreRecord: true),

                TextInput::make('telepon')
                    ->label('Nomor Telepon')
                    ->tel() // Ini akan memvalidasi input sebagai nomor telepon
                    ->nullable(), // Sesuai dengan migration yang nullable

                Select::make('role')
                    ->label('Role')
                    ->options([
                        'admin' => 'Admin',
                        'user' => 'User',
                    ])
                    ->required(),

                DateTimePicker::make('email_verified_at')
                    ->label('Email Terverifikasi')
                    ->seconds(false),
            ])
            ->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')->searchable()->sortable(),
                TextColumn::make('email')->sortable(),
                TextColumn::make('telepon')
                    ->label('Telepon')
                    ->searchable(),
                TextColumn::make('role')->badge()->colors([
                    'primary' => 'admin',
                    'gray' => 'user',
                ]),
                // ...
                IconColumn::make('email_verified_at')
                    ->label('Terverifikasi')
                    ->boolean()
                    ->trueIcon('heroicon-o-check-badge') // Ikon jika sudah terverifikasi
                    ->falseIcon('heroicon-o-x-circle')   // Ikon jika belum terverifikasi
                    ->trueColor('success')
                    ->falseColor('danger'),
                // ...
                TextColumn::make('created_at')
                    ->label('Dibuat')
                    ->dateTime()->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('role')
                    ->options([
                        'admin' => 'Admin',
                        'user' => 'User',
                    ]),
                // Tables\Filters\TrashedFilter::make(),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make()
                    ->after(
                        fn($record) =>
                        Notification::make()
                            ->title('User dihapus')
                            ->body("{$record->name} berhasil dihapus.")
                            ->success()
                            ->send()
                    ),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    Tables\Actions\ForceDeleteBulkAction::make(),
                    Tables\Actions\RestoreBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            // Buatkan RelationManager untuk Pinjam jika ingin dikelola di tab relasi
            \App\Filament\Resources\UserResource\RelationManagers\PinjamsRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListUsers::route('/'),
            'create' => Pages\CreateUser::route('/create'),
            'edit' => Pages\EditUser::route('/{record}/edit'),
        ];
    }

    // public static function getEloquentQuery(): Builder
    // {
    //     // return parent::getEloquentQuery()
    //     //     ->withoutGlobalScopes([
    //     //         SoftDeletingScope::class,
    //     //     ]);
    // }
}
