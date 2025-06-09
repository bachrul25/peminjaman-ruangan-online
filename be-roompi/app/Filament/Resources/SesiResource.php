<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SesiResource\Pages;
use App\Models\Sesi;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Forms\Components\Section; // Import Section
use Filament\Forms\Components\Grid; // Import Grid

class SesiResource extends Resource
{
    protected static ?string $model = Sesi::class;

    protected static ?string $navigationIcon = 'heroicon-o-clock';
    protected static ?string $modelLabel = 'Pengaturan Sesi';
    protected static ?string $navigationGroup = 'Manajemen Ruangan';
    protected static ?int $navigationSort = 3;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Detail Sesi')
                    ->description('Atur jadwal sesi peminjaman yang tersedia.')
                    ->schema([
                        Forms\Components\TextInput::make('nama') //
                            ->required()
                            ->maxLength(100) //
                            ->label('Nama Sesi (cth: Sesi Pagi)'),
                        Grid::make(2)->schema([
                            Forms\Components\TimePicker::make('start_time') //
                                ->required()
                                ->label('Waktu Mulai'),
                            Forms\Components\TimePicker::make('end_time') //
                                ->required()
                                ->label('Waktu Selesai'),
                        ])
                    ])
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('nama') //
                    ->label('Nama Sesi')
                    ->searchable()
                    ->sortable()
                    ->badge(),
                Tables\Columns\TextColumn::make('start_time') //
                    ->time('H:i')
                    ->icon('heroicon-s-arrow-right-circle')
                    ->label('Mulai'),
                Tables\Columns\TextColumn::make('end_time') //
                    ->time('H:i')
                    ->icon('heroicon-s-arrow-left-circle')
                    ->color('danger')
                    ->label('Selesai'),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make()->iconButton(),
                Tables\Actions\DeleteAction::make()->iconButton(),
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
            'index' => Pages\ListSesis::route('/'),
            'create' => Pages\CreateSesi::route('/create'),
            'edit' => Pages\EditSesi::route('/{record}/edit'),
        ];
    }
}
