<?php

namespace App\Filament\Resources;

use Filament\Forms;
use App\Models\Tipe;
use Filament\Tables;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use App\Filament\Resources\TipeResource\Pages\ManageTipes;

class TipeResource extends Resource
{
    protected static ?string $model = Tipe::class;

    protected static ?string $navigationIcon = 'heroicon-o-tag';
    protected static ?string $modelLabel = 'Tipe';
    protected static ?string $navigationLabel = 'Data Tipe';
    protected static ?string $navigationGroup = 'Manajemen Data';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('nama')
                ->label('Nama Tipe')
                ->required()
                ->maxLength(80)
                ->columnSpanFull(),

            Forms\Components\Textarea::make('deskripsi')
                ->label('Deskripsi')
                ->required()
                ->columnSpanFull(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('id_tipe')
                ->label('ID')
                ->sortable(),

            Tables\Columns\TextColumn::make('nama')
                ->label('Nama Tipe')
                ->searchable(),

            Tables\Columns\TextColumn::make('created_at')
                ->label('Dibuat')
                ->dateTime()
                ->sortable()
                ->toggleable(isToggledHiddenByDefault: true),

            Tables\Columns\TextColumn::make('updated_at')
                ->label('Diperbarui')
                ->dateTime()
                ->sortable()
                ->toggleable(isToggledHiddenByDefault: true),
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

    public static function getPages(): array
    {
        return [
            'index' => ManageTipes::route('/'),
        ];
    }
}
