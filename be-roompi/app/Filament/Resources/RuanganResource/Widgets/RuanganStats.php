<?php

namespace App\Filament\Resources\RuanganResource\Widgets;

use App\Models\Pinjam;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

class RuanganStats extends BaseWidget
{
    public ?int $recordId = null; // Injected from View page

    protected int|string|array $columnSpan = 'full';

    public function table(Table $table): Table
    {
        return $table
            ->query(function () {
                return Pinjam::query()
                    ->where('ruangan_idruangan', $this->recordId); // filter berdasarkan ruangan
            })
            ->columns([
                Tables\Columns\TextColumn::make('user.name')->label('Peminjam'),
                Tables\Columns\TextColumn::make('tanggal_pinjam')->label('Tanggal Pinjam')->date(),
                Tables\Columns\TextColumn::make('status')->label('Status')->badge(),
                Tables\Columns\TextColumn::make('created_at')->label('Waktu Permintaan')->dateTime(),
            ])
            ->heading('Riwayat Peminjaman Ruangan')
            ->description('Berikut daftar peminjaman untuk ruangan ini.');
    }
}
