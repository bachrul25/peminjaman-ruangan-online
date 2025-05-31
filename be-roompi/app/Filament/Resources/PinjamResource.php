<?php

namespace App\Filament\Resources;

use Filament\Forms;
use Filament\Tables;
use App\Models\Pinjam;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use Filament\Forms\Components\Select;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\DatePicker;
use Illuminate\Database\Eloquent\Builder;
use App\Filament\Resources\PinjamResource\Pages;
use App\Filament\Resources\PinjamResource\RelationManagers\CheckInsRelationManager;

class PinjamResource extends Resource
{
    protected static ?string $model = Pinjam::class;

    protected static ?string $navigationIcon = 'heroicon-o-clipboard-document-check';
    protected static ?string $navigationGroup = '📁 Manajemen Data';
    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Select::make('user_iduser')
                    ->label('Peminjam')
                    ->relationship('user', 'name')
                    ->searchable()
                    ->required(),

                Select::make('ruangan_idruangan')
                    ->label('Ruangan')
                    ->relationship('ruangan', 'nama_ruangan')
                    ->searchable()
                    ->required(),

                Select::make('sesi_idsesi')
                    ->label('Sesi')
                    ->relationship('sesi', 'nama_sesi')
                    ->searchable()
                    ->required(),

                DatePicker::make('tanggal_pinjam')
                    ->label('Tanggal Pinjam')
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('user.name')->label('Peminjam'),
                TextColumn::make('ruangan.nama_ruangan')->label('Ruangan'),
                TextColumn::make('sesi.nama_sesi')->label('Sesi'),
                TextColumn::make('tanggal_pinjam')->label('Tanggal')->date(),

                TextColumn::make('check_ins_count')
                    ->label('Jumlah Check-in')
                    ->counts('check_ins')
                    ->badge()
                    ->color('success'),
            ])
            ->filters([
                // TrashedFilter hanya jika model menggunakan SoftDeletes
                // Tables\Filters\TrashedFilter::make(),
            ])
            ->defaultSort('tanggal_pinjam', 'desc')
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    // Tables\Actions\ForceDeleteBulkAction::make(),
                    // Tables\Actions\RestoreBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            CheckInsRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPinjams::route('/'),
            'create' => Pages\CreatePinjam::route('/create'),
            'edit' => Pages\EditPinjam::route('/{record}/edit'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->withCount('check_ins');
    }
}
