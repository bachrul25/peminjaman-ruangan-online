<?php

namespace App\Filament\Pages;

// Hapus 'use' untuk Model karena tidak lagi digunakan di sini
// use App\Models\User;
// use App\Models\Pinjam;
// use App\Models\Ruangan;

use Filament\Pages\Page;
use App\Filament\Widgets\RuanganChart;
use App\Filament\Widgets\PeminjamanChart;
use App\Filament\Widgets\AktivitasPeminjamanTerkini;
use App\Filament\Widgets\StatsOverview; // <-- IMPORT WIDGET ANDA
use Filament\Pages\Dashboard as BaseDashboard; // <-- IMPORT BASE DASHBOARD

class Dashboard extends BaseDashboard // <-- UBAH EXTENDS KE BaseDashboard
{
    // Properti ini sudah di-handle oleh BaseDashboard, jadi bisa dihapus atau biarkan saja
    protected static ?string $navigationIcon = 'heroicon-o-home';
    protected static string $view = 'filament.pages.dashboard';
    protected static ?string $navigationLabel = 'Dashboard';
    protected static ?int $navigationSort = 1;

    public function getHeaderWidgets(): array
    {
        return [
            StatsOverview::class,
        ];
    }

    public function getFooterWidgets(): array
    {
        // Tampilkan chart dan tabel di body/footer
        return [
            PeminjamanChart::class,
            RuanganChart::class,
            AktivitasPeminjamanTerkini::class,
        ];
    }
}
