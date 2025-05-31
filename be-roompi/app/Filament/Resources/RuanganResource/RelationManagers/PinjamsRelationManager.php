<?php

namespace App\Filament\Resources\RuanganResource\RelationManagers;

use Filament\Forms;
use Filament\Tables;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Resources\RelationManagers\RelationManager;

class PinjamsRelationManager extends RelationManager
{
    protected static string $relationship = 'pinjams';
    protected static ?string $title = 'Riwayat Peminjaman';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('user.name')
                    ->label('Nama Peminjam')
                    ->relationship('user', 'name') // Asumsi User ada field 'name'
                    ->required()
                    ->searchable(),
                Forms\Components\Select::make('sesi_idsesi')
                    ->label('Sesi')
                    ->relationship('sesi', 'nama_sesi') // Asumsi ada field nama_sesi
                    ->required()
                    ->searchable(),
                Forms\Components\DatePicker::make('tanggal_pinjam')
                    ->label('Tanggal Pinjam')
                    ->required(),
            ])
            ->columns(2);
        ;
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('user.name')
            ->columns([
                TextColumn::make('user.name')->label('Peminjam'),
                TextColumn::make('sesi.nama_sesi')->label('Sesi'),
                TextColumn::make('tanggal_pinjam')->date('d M Y')->sortable(),
                TextColumn::make('created_at')->label('Dibuat')->since(),
            ])
            ->filters([
                //
            ])
            ->headerActions([
                Tables\Actions\CreateAction::make(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }
}
