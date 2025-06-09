<?php

namespace App\Filament\Widgets;

use App\Models\Pinjam;
use App\Models\Ruangan;
use App\Models\User;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Total Pengguna', User::count()) //
                ->description('Semua pengguna terdaftar')
                ->descriptionIcon('heroicon-m-users')
                ->color('primary'),
            Stat::make('Total Ruangan', Ruangan::count()) //
                ->description('Jumlah ruangan yang dikelola')
                ->descriptionIcon('heroicon-m-building-office-2')
                ->color('warning'),
            Stat::make('Total Peminjaman', Pinjam::count()) //
                ->description('Seluruh riwayat peminjaman')
                ->descriptionIcon('heroicon-m-calendar-days')
                ->color('success'),
        ];
    }
}
