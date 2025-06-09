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

    public function table(Table $table): Table
    {
        return $table
            ->query(
                Pinjam::query()->latest()->limit(5)
            )
            ->heading('Aktivitas Peminjaman Terkini')
            ->columns([
                Tables\Columns\TextColumn::make('ruangan.nama_ruangan') //
                    ->label('Ruangan'),
                Tables\Columns\TextColumn::make('user.name') //
                    ->label('Peminjam'),
                Tables\Columns\TextColumn::make('tanggal_pinjam') //
                    ->dateTime('d M Y, H:i')
                    ->label('Tanggal Pinjam'),
                Tables\Columns\IconColumn::make('status_checkin_custom') // Kita gunakan nama unik
                    ->label('Status Check-in')
                    ->boolean()
                    ->state(function ($record): bool {
                        // Memanggil fungsi 'check_ins()' YANG SUDAH ADA di model Anda
                        // dan memeriksa apakah ada data yang berelasi
                        return $record->check_ins()->exists();
                    })
                    ->trueIcon('heroicon-o-check-circle')
                    ->trueColor('success')
                    ->falseIcon('heroicon-o-x-circle')
                    ->falseColor('danger'),
            ]);
    }
}
