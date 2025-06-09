<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CheckoutResource\Pages;
use App\Models\Checkout;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Forms\Components\Section;

class CheckoutResource extends Resource
{
    protected static ?string $model = Checkout::class;

    protected static ?string $navigationIcon = 'heroicon-o-arrow-left-on-rectangle';
    protected static ?string $navigationGroup = 'Transaksi';
    protected static ?string $navigationLabel = 'Data Check-Out';


    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Proses Check-Out')
                    ->schema([
                        Forms\Components\Select::make('checkin_idcheckin') //
                            ->relationship(name: 'checkin', titleAttribute: 'id_checkin') // Ganti titleAttribute jika perlu
                            ->required()
                            ->searchable()
                            ->preload()
                            ->label('Pilih Data Check-In'),
                        Forms\Components\DatePicker::make('waktu_checkout') //
                            ->required()
                            ->default(now())
                            ->label('Tanggal Check-Out'),
                        Forms\Components\TextInput::make('denda') //
                            ->required()
                            ->numeric()
                            ->prefix('Rp')
                            ->default(0), //
                        Forms\Components\Textarea::make('keterangan') //
                            ->label('Keterangan Denda (jika ada)')
                            ->rows(3),
                    ])
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('checkin.pinjam.user.name')
                    ->label('Peminjam')
                    ->searchable(),
                Tables\Columns\TextColumn::make('waktu_checkout') //
                    ->date('d M Y')
                    ->sortable()
                    ->label('Tanggal Check-Out'),
                Tables\Columns\TextColumn::make('denda') //
                    ->money('IDR')
                    ->sortable()
                    ->color(fn(int $state): string => $state > 0 ? 'danger' : 'success')
                    ->badge(),
                Tables\Columns\TextColumn::make('keterangan') //
                    ->limit(40)
                    ->searchable(),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
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
            'index' => Pages\ListCheckouts::route('/'),
            'create' => Pages\CreateCheckout::route('/create'),
            'edit' => Pages\EditCheckout::route('/{record}/edit'),
        ];
    }
}
