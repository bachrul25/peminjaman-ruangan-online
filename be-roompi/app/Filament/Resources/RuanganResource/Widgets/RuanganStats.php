<?php

namespace App\Filament\Resources\RuanganResource\Widgets;

use App\Models\Ruangan;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Card;

class RuanganStats extends StatsOverviewWidget
{
    protected function getCards(): array
    {
        $ruanganId = request()->route('record');
        $ruangan = Ruangan::find($ruanganId);

        if (!$ruangan) {
            return [
                Card::make('Total Peminjaman', 0),
                Card::make('Peminjaman Disetujui', 0),
                Card::make('Peminjaman Ditolak', 0),
            ];
        }
    }
}
