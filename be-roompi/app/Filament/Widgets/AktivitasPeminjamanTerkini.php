<?php

namespace App\Filament\Widgets;

use App\Models\Pinjam;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

class AktivitasPeminjamanTerkini extends BaseWidget
{
    protected static ?int $sort = 4;
    protected int|string|array $columnSpan = 'full';

    // app/Filament/Widgets/AktivitasPeminjamanTerkini.php

    public function table(Table $table): Table
    {
        return $table
            ->query(
                // Mengambil 5 data Pinjam terbaru
                Pinjam::query()->latest('tanggal_pinjam')->limit(5)
            )
            ->heading('Aktivitas Peminjaman Terkini')
            ->columns([
                Tables\Columns\TextColumn::make('ruangan.nama_ruangan')
                    ->label('Ruangan'),

                Tables\Columns\TextColumn::make('user.name')
                    ->label('Peminjam'),

                Tables\Columns\TextColumn::make('sesi.nama')
                    ->label('Sesi')
                    ->badge(),

                Tables\Columns\TextColumn::make('tanggal_pinjam')
                    ->dateTime('d M Y, H:i')
                    ->label('Tanggal Pinjam'),

                // TETAP SAMA: Memanggil relasi 'checkin' dari model Pinjam
                Tables\Columns\IconColumn::make('status_checkin_custom')
                    ->label('Status Check-in')
                    ->boolean()
                    ->state(fn($record): bool => $record->checkin()->exists())
                    ->trueIcon('heroicon-o-check-circle')
                    ->trueColor('success')
                    ->falseIcon('heroicon-o-x-circle')
                    ->falseColor('danger'),

                // DISESUAIKAN: Memanggil relasi 'checkout' dari model CheckIn
                Tables\Columns\IconColumn::make('status_checkout_custom')
                    ->label('Status Check-Out')
                    ->boolean()
                    ->state(function ($record): bool {
                        $firstCheckIn = $record->checkin->first();
                        // Memeriksa apakah check-in ada, lalu memanggil relasi 'checkout()'
                        return $firstCheckIn ? $firstCheckIn->checkout()->exists() : false;
                    })
                    ->trueIcon('heroicon-o-check-circle')
                    ->trueColor('primary')
                    ->falseIcon('heroicon-o-x-circle')
                    ->falseColor('warning'),

                // DISESUAIKAN: Mengambil denda dari relasi 'checkout'
                Tables\Columns\TextColumn::make('denda_custom')
                    ->label('Denda')
                    ->money('IDR')
                    ->state(fn($record) => $record->checkin?->checkout?->denda)
                    ->badge()
                    ->color('danger'),
                ])
            // ... (bagian ->columns([...]) tetap sama) ...

            // GANTI appendActions MENJADI actions
            ->actions([
                Tables\Actions\ActionGroup::make([
                    Tables\Actions\ViewAction::make()
                        ->url(fn($record) => \App\Filament\Resources\PinjamResource::getUrl('view', ['record' => $record])),

                    Tables\Actions\Action::make('Check In')
                        ->icon('heroicon-s-arrow-right-on-rectangle')
                        ->url(fn($record) => \App\Filament\Resources\CheckInResource::getUrl('create', ['pinjam_id' => $record->id_pinjam]))
                        ->visible(fn($record): bool => !$record->checkin()->exists()),

                    Tables\Actions\Action::make('Check Out')
                        ->icon('heroicon-s-arrow-left-on-rectangle')
                        ->color('success')
                        ->url(function ($record) {
                            $firstCheckIn = $record->checkin->first();
                            return $firstCheckIn ? \App\Filament\Resources\CheckoutResource::getUrl('create', ['checkin_id' => $firstCheckIn->id_checkin]) : '#';
                        })
                        ->visible(function ($record): bool {
                            $firstCheckIn = $record->checkin->first();
                            return $firstCheckIn && !$firstCheckIn->checkout()->exists();
                        }),
                ]),
            ]);
    }
}
