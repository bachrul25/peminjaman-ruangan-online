<?php

namespace App\Filament\Resources;

use Filament\Forms;
use App\Models\Tipe;
use Filament\Tables;
use App\Models\Ruangan;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use Filament\Forms\Components\Select;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextInput;
use Illuminate\Database\Eloquent\Builder;
use App\Filament\Resources\RuanganResource\Pages;
use App\Filament\Resources\RuanganResource\RelationManagers\PinjamsRelationManager;

class RuanganResource extends Resource
{
    protected static ?string $model = Ruangan::class;

    protected static ?string $navigationIcon = 'heroicon-o-building-library';
    protected static ?string $navigationGroup = '📁 Manajemen Data';
    protected static ?int $navigationSort = 1;
    protected static ?string $navigationLabel = 'Data Ruangan';
    protected static ?string $modelLabel = 'Ruangan';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Select::make('tipe_idtipe')
                ->label('Tipe Ruangan')
                ->relationship('tipe', 'nama_tipe') // asumsi nama field di Tipe
                ->required()
                ->searchable(),

            TextInput::make('nama_ruangan')
                ->label('Nama Ruangan')
                ->required()
                ->maxLength(255),

            TextInput::make('kapasitas')
                ->label('Kapasitas')
                ->numeric()
                ->required(),

            TextInput::make('harga')
                ->label('Harga Sewa')
                ->prefix('Rp')
                ->numeric()
                ->required(),
        ])->columns(2); // responsive grid
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('nama_ruangan')
                    ->label('Nama Ruangan')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('tipe.nama_tipe')
                    ->label('Tipe')
                    ->sortable(),

                TextColumn::make('kapasitas')
                    ->label('Kapasitas')
                    ->sortable(),

                TextColumn::make('harga')
                    ->label('Harga')
                    ->money('IDR', true) // advanced: format jadi Rp
                    ->sortable(),

                TextColumn::make('created_at')
                    ->label('Dibuat')
                    ->dateTime('d M Y'),
            ])
            ->filters([]) // kosong karena tidak ada SoftDeletes
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make()
                    ->requiresConfirmation()
                    ->modalHeading('Yakin ingin menghapus data ini?'),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ])
            ->emptyStateHeading('Belum ada data ruangan')
            ->emptyStateDescription('Silakan tambahkan data ruangan terlebih dahulu.')
            ->emptyStateActions([
                Tables\Actions\CreateAction::make('Tambah Ruangan'),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            PinjamsRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListRuangans::route('/'),
            'create' => Pages\CreateRuangan::route('/create'),
            'edit' => Pages\EditRuangan::route('/{record}/edit'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery(); // Tanpa SoftDeletingScope karena tidak pakai soft delete
    }
}
