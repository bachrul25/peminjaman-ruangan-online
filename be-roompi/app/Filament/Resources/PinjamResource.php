<?php

namespace App\Filament\Resources;

use Filament\Forms;
use App\Models\Sesi;
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
    protected static ?string $modelLabel = 'Peminjaman';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Select::make('user_iduser')
                    ->label('Peminjam')
                    ->relationship('user', 'name')
                    ->searchable()
                    ->required()
                    ->preload(),

                Select::make('ruangan_idruangan')
                    ->label('Ruangan')
                    ->relationship('ruangan', 'nama_ruangan')
                    ->searchable()
                    ->required()
                    ->preload(),

                Select::make('sesi_idsesi')
                    ->label('Sesi')
                    ->relationship('sesi', 'nama')
                    ->getOptionLabelFromRecordUsing(fn(Sesi $record) => "{$record->nama} ({$record->start_time->format('H:i')} - {$record->end_time->format('H:i')})")
                    ->searchable()
                    ->required()
                    ->preload()
                    ->native(false),

                DatePicker::make('tanggal_pinjam')
                    ->label('Tanggal Pinjam')
                    ->required()
                    ->native(false)
                    ->displayFormat('d/m/Y'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('user.name')
                    ->label('Peminjam')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('ruangan.nama_ruangan')
                    ->label('Ruangan')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('sesi.nama') // Ganti 'nama_sesi' menjadi 'nama'
                    ->label('Sesi')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('sesi.start_time')
                    ->label('Mulai')
                    ->time('H:i')
                    ->sortable(),

                TextColumn::make('sesi.end_time')
                    ->label('Selesai')
                    ->time('H:i')
                    ->sortable(),

                TextColumn::make('tanggal_pinjam')
                    ->label('Tanggal')
                    ->date('d M Y')
                    ->sortable(),

                TextColumn::make('check_ins_count')
                    ->label('Check-in')
                    ->counts('check_ins')
                    ->badge()
                    ->color(fn(int $state): string => match (true) {
                        $state > 0 => 'success',
                        default => 'gray',
                    }),
            ])
            ->defaultSort('tanggal_pinjam', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('ruangan')
                    ->relationship('ruangan', 'nama_ruangan')
                    ->searchable()
                    ->preload(),

                Tables\Filters\SelectFilter::make('sesi')
                    ->relationship('sesi', 'nama')
                    ->searchable()
                    ->preload(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\ViewAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
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
            'view' => Pages\ViewPinjam::route('/{record}'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->with(['user', 'ruangan', 'sesi'])
            ->withCount('check_ins');
    }
}
