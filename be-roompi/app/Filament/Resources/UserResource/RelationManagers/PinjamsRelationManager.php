<?php

namespace App\Filament\Resources\UserResource\RelationManagers;

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
    protected static ?string $recordTitleAttribute = 'tanggal_pinjam';

    // public function form(Form $form): Form
    // {
    //     return $form
    //         ->schema([
    //             Forms\Components\TextInput::make('tanggal_pinjam')
    //                 ->required()
    //                 ->maxLength(255),
    //         ]);
    // }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('tanggal_pinjam')
            ->columns([
                TextColumn::make('tanggal_pinjam')
                    ->label('Tanggal Pinjam')
                    ->date()
                    ->sortable(),
                TextColumn::make('ruangan.nama_ruangan')
                    ->label('Ruangan')
                    ->searchable(),

                TextColumn::make('sesi.nama_sesi')
                    ->label('Sesi')
                    ->searchable(),
            ])
            ->filters([
                //
            ])
            ->headerActions([
                Tables\Actions\CreateAction::make(),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
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
