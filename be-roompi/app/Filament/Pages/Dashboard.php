<?php

namespace App\Filament\Pages;

use App\Models\User;
use App\Models\Pinjam;
use App\Models\Ruangan;
use Filament\Pages\Page;

class Dashboard extends Page
{
    protected static ?string $navigationIcon = 'heroicon-o-home';
    protected static string $view = 'filament.pages.dashboard';
    protected static ?string $navigationLabel = 'Dashboard';
    // protected static ?string $navigationGroup = '📊 Laporan';
    protected static ?int $navigationSort = 1;
    public $jumlahPeminjaman;
    public $jumlahRuangan;
    public $jumlahUser;

    public function mount(): void
    {
        $this->jumlahPeminjaman = Pinjam::count();
        $this->jumlahRuangan = Ruangan::count();
        $this->jumlahUser = User::count();
    }

}
