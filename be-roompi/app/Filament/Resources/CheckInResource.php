<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CheckInResource\Pages;
use App\Models\CheckIn;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Forms\Components\Section;

class CheckInResource extends Resource
{
    protected static ?string $model = CheckIn::class;

    protected static ?string $navigationIcon = 'heroicon-o-arrow-left-on-rectangle';
    protected static ?string $navigationGroup = 'Transaksi';
    protected static ?string $navigationLabel = 'Data Check-In';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Proses Check-In')
                    ->schema([
                        Forms\Components\Select::make('pinjam_idpinjam') //
                            ->relationship('pinjam', 'id_pinjam') // Anda bisa kustomisasi titleAttribute di model Pinjam
                            ->required()
                            ->searchable()
                            ->preload()
                            ->label('Pilih Data Peminjaman'),
                        Forms\Components\DateTimePicker::make('tanggal_checkin') //
                            ->required()
                            ->default(now())
                            ->label('Waktu Check-In'),
                    ])
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('pinjam.user.name')
                    ->label('Peminjam')
                    ->searchable(),
                Tables\Columns\TextColumn::make('pinjam.ruangan.nama_ruangan')
                    ->label('Ruangan')
                    ->searchable(),
                Tables\Columns\TextColumn::make('tanggal_checkin') //
                    ->dateTime('d M Y, H:i:s')
                    ->sortable()
                    ->label('Waktu Check-In'),
            ])
            ->filters([
                //
            ])
            ->actions([
                // Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    // Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCheckIns::route('/'),
            'create' => Pages\CreateCheckIn::route('/create'),
            // 'edit' => Pages\EditCheckIn::route('/{record}/edit'),
        ];
    }
}
