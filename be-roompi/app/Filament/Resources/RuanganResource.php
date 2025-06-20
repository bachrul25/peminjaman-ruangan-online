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
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Textarea;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextInput;
use Filament\Tables\Columns\ImageColumn;
use Filament\Forms\Components\FileUpload;
use Filament\Tables\Filters\SelectFilter;
use Illuminate\Database\Eloquent\Builder;
use App\Filament\Resources\RuanganResource\Pages;
use App\Filament\Resources\RuanganResource\RelationManagers\PinjamsRelationManager;

class RuanganResource extends Resource
{
    protected static ?string $model = Ruangan::class;

    protected static ?string $navigationIcon = 'heroicon-o-building-office';
    protected static ?string $navigationGroup = 'Manajemen Data';
    protected static ?int $navigationSort = 1;
    protected static ?string $navigationLabel = 'Data Ruangan';
    protected static ?string $modelLabel = 'Ruangan';
    protected static ?string $slug = 'ruangan';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Informasi Ruangan')
                    ->schema([
                        Select::make('tipe_idtipe')
                            ->label('Tipe Ruangan')
                            ->relationship('tipe', 'nama')
                            ->required()
                            ->searchable()
                            ->preload()
                            ->native(false),

                        TextInput::make('nama_ruangan')
                            ->label('Nama Ruangan')
                            ->required()
                            ->maxLength(50)
                            ->unique(ignoreRecord: true)
                            ->columnSpan(2),

                        Textarea::make('alamat')
                            ->label('Alamat/Lokasi')
                            ->required()
                            ->maxLength(500)
                            ->columnSpanFull(),
                    ])
                    ->columns(2),

                Section::make('Detail Kapasitas & Harga')
                    ->schema([
                        TextInput::make('kapasitas')
                            ->label('Kapasitas (orang)')
                            ->numeric()
                            ->required()
                            ->minValue(1)
                            ->step(1),

                        TextInput::make('harga')
                            ->label('Harga Sewa')
                            ->prefix('Rp')
                            ->numeric()
                            ->required()
                            ->minValue(0)
                            ->step(1000),

                        FileUpload::make('foto_ruangan')
                            ->image()
                            ->imageEditor()
                            ->disk('public')
                            ->directory('foto-ruangan')
                            ->label('Foto Ruangan')
                            ->required(),


                        TextInput::make('rating')
                            ->label('Rating')
                            ->numeric()
                            ->step(0.1)
                            ->minValue(0)
                            ->maxValue(5)
                            ->default(0)
                            ->required(),
                    ])
                    ->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('nama_ruangan')
                    ->label('Nama Ruangan')
                    ->searchable()
                    ->sortable()
                    ->description(fn(Ruangan $record) => $record->alamat)
                    ->wrap(),

                TextColumn::make('tipe.nama_tipe')
                    ->label('Tipe')
                    ->sortable()
                    ->badge()
                    ->color(fn(string $state): string => match ($state) {
                        'Meeting Room' => 'info',
                        'Classroom' => 'success',
                        'Auditorium' => 'warning',
                        default => 'primary',
                    }),

                TextColumn::make('kapasitas')
                    ->label('Kapasitas')
                    ->sortable()
                    ->formatStateUsing(fn(string $state): string => "$state orang"),

                TextColumn::make('harga')
                    ->label('Harga')
                    ->money('IDR', locale: 'id')
                    ->sortable()
                    ->color('success'),

                TextColumn::make('pinjams_count')
                    ->label('Total Peminjaman')
                    ->counts('pinjams')
                    ->sortable()
                    ->extraAttributes(['class' => 'text-right']),


                ImageColumn::make('foto_ruangan')
                    ->label('Foto')
                    ->disk('public')
                    ->height(80),

                TextColumn::make('rating')
                    ->label('Rating')
                    ->sortable()
                    ->searchable(),

                TextColumn::make('created_at')
                    ->label('Dibuat')
                    ->dateTime('d M Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('tipe_idtipe')
                    ->label('Filter by Tipe')
                    ->relationship('tipe', 'nama')
                    ->searchable()
                    ->preload(),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make()
                    ->before(function (Ruangan $record) {
                        // Cek apakah ruangan memiliki peminjaman
                        if ($record->pinjams()->exists()) {
                            throw new \Exception('Tidak bisa menghapus ruangan yang sudah memiliki riwayat peminjaman');
                        }
                    }),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make()
                    ->before(function ($records) {
                        foreach ($records as $record) {
                            if ($record->pinjams()->exists()) {
                                throw new \Exception("Ruangan {$record->nama_ruangan} tidak bisa dihapus karena memiliki riwayat peminjaman");
                            }
                        }
                    }),
            ])
            ->emptyStateHeading('Belum ada data ruangan')
            ->emptyStateDescription('Silakan tambahkan data ruangan terlebih dahulu.')
            ->emptyStateActions([
                Tables\Actions\CreateAction::make()
                    ->label('Tambah Ruangan'),
            ])
            ->defaultSort('nama_ruangan', 'asc')
            ->persistFiltersInSession()
            ->persistSearchInSession();
    }

    public static function getRelations(): array
    {
        return [
            PinjamsRelationManager::class,
        ];
    }

    public static function getWidgets(): array
    {
        return [
            \App\Filament\Resources\RuanganResource\Widgets\RuanganStats::class,
        ];
    }


    public static function getPages(): array
    {
        return [
            'index' => Pages\ListRuangans::route('/'),
            'create' => Pages\CreateRuangan::route('/create'),
            'view' => Pages\ViewRuangan::route('/{record}'),
            'edit' => Pages\EditRuangan::route('/{record}/edit'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->withCount('pinjams');
    }
}
