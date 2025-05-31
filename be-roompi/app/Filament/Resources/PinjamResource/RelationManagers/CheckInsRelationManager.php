<?php

namespace App\Filament\Resources\PinjamResource\RelationManagers;

use Filament\Forms;
use Filament\Tables;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\DatePicker;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Resources\RelationManagers\RelationManager;

class CheckInsRelationManager extends RelationManager
{
    protected static string $relationship = 'check_ins';
    protected static ?string $title = 'Check-in';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                DatePicker::make('tanggal_checkin')->label('Tanggal Check-in')->required(),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('Data Check-in')
            ->columns([
                TextColumn::make('id_checkin'),
                TextColumn::make('tanggal_checkin')->date()->label('Tanggal Check-in'),
                TextColumn::make('created_at')->since()->label('Dibuat'),
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
