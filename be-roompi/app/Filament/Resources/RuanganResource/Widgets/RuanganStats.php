<?php

namespace App\Filament\Resources\RuanganResource\Widgets;

use App\Models\Ruangan;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

class RuanganStats extends BaseWidget
{
    protected int|string|array $columnSpan = 'full';

    public function table(Table $table): Table
    {
        return $table
            ->query(function () {
                $ruangan = $this->getOwnerRecord();
                return $ruangan->pinjams()->getQuery();
            })
            ->columns([
                Tables\Columns\TextColumn::make('user.name')
                    ->label('Peminjam')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('tanggal_pinjam')
                    ->label('Tanggal Pinjam')
                    ->date('d M Y')
                    ->sortable(),

                Tables\Columns\TextColumn::make('tanggal_selesai')
                    ->label('Tanggal Selesai')
                    ->date('d M Y')
                    ->sortable(),

                Tables\Columns\TextColumn::make('status')
                    ->label('Status')
                    ->badge()
                    ->color(fn(string $state): string => match ($state) {
                        'pending' => 'warning',
                        'approved' => 'success',
                        'rejected' => 'danger',
                        'completed' => 'info',
                        default => 'gray',
                    })
                    ->sortable(),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Waktu Permintaan')
                    ->dateTime('d M Y H:i')
                    ->sortable(),
            ])
            ->heading('Riwayat Peminjaman')
            ->description('Daftar peminjaman untuk ruangan ini')
            ->emptyStateHeading('Belum ada riwayat peminjaman')
            ->emptyStateDescription('Ruangan ini belum pernah dipinjam.')
            ->defaultSort('tanggal_pinjam', 'desc');
    }
}
