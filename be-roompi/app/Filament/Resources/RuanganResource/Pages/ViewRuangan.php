<?php

namespace App\Filament\Resources\RuanganResource\Pages;

use Filament\Pages\Actions;
use Filament\Resources\Pages\ViewRecord;
use App\Filament\Resources\RuanganResource;
use Filament\Infolists\Infolist;
use Filament\Infolists\Components;
use App\Models\Ruangan;

class ViewRuangan extends ViewRecord
{
    protected static string $resource = RuanganResource::class;

    protected static string $view = 'filament.resources.ruangan-resource.pages.view-ruangan';

    protected function getActions(): array
    {
        return [
            Actions\EditAction::make()
                ->label('Edit Ruangan'),
            Actions\DeleteAction::make()
                ->label('Hapus Ruangan')
                ->before(function (Ruangan $record) {
                    if ($record->pinjams()->exists()) {
                        throw new \Exception('Tidak bisa menghapus ruangan yang sudah memiliki riwayat peminjaman');
                    }
                }),
            Actions\Action::make('kembali')
                ->label('Kembali ke Daftar')
                ->url($this->getResource()::getUrl('index'))
                ->color('secondary'),
        ];
    }

    public function infolist(Infolist $infolist): Infolist
    {
        return $infolist
            ->schema([
                Components\Section::make('Informasi Ruangan')
                    ->schema([
                        Components\Grid::make(3)
                            ->schema([
                                Components\TextEntry::make('nama_ruangan')
                                    ->label('Nama Ruangan')
                                    ->size('lg')
                                    ->weight('bold')
                                    ->columnSpan(2),

                                Components\TextEntry::make('tipe.nama_tipe')
                                    ->label('Tipe Ruangan')
                                    ->badge()
                                    ->color(fn(string $state): string => match ($state) {
                                        'Meeting Room' => 'info',
                                        'Classroom' => 'success',
                                        'Auditorium' => 'warning',
                                        default => 'primary',
                                    }),
                            ]),

                        Components\TextEntry::make('alamat')
                            ->label('Alamat/Lokasi')
                            ->columnSpanFull()
                            ->extraAttributes(['class' => 'bg-gray-50 p-2 rounded']),
                    ])
                    ->collapsible(),

                Components\Section::make('Detail Kapasitas & Harga')
                    ->schema([
                        Components\Grid::make(2)
                            ->schema([
                                Components\TextEntry::make('kapasitas')
                                    ->label('Kapasitas')
                                    ->formatStateUsing(fn($state) => "$state orang")
                                    ->icon('heroicon-o-user-group'),

                                Components\TextEntry::make('harga')
                                    ->label('Harga Sewa')
                                    ->money('IDR', locale: 'id')
                                    ->icon('heroicon-o-currency-dollar'),
                            ]),
                    ])
                    ->collapsible(),

                Components\Section::make('Statistik Peminjaman')
                    ->schema([
                        Components\Grid::make(3)
                            ->schema([
                                Components\TextEntry::make('pinjams_count')
                                    ->label('Total Peminjaman')
                                    ->formatStateUsing(fn($state, Ruangan $record) => "$state kali")
                                    ->icon('heroicon-o-clipboard-document-list')
                                    ->color('primary'),

                                Components\TextEntry::make('last_booking')
                                    ->label('Terakhir Dipinjam')
                                    ->state(function (Ruangan $record) {
                                        $lastBooking = $record->pinjams()->latest()->first();
                                        return $lastBooking ? $lastBooking->tanggal_pinjam->format('d M Y') : 'Belum pernah';
                                    })
                                    ->icon('heroicon-o-calendar-days')
                                    ->color('success'),

                                Components\TextEntry::make('next_booking')
                                    ->label('Peminjaman Berikutnya')
                                    ->state(function (Ruangan $record) {
                                        $nextBooking = $record->pinjams()
                                            ->where('tanggal_pinjam', '>=', now())
                                            ->orderBy('tanggal_pinjam')
                                            ->first();
                                        return $nextBooking ? $nextBooking->tanggal_pinjam->format('d M Y') : 'Tidak ada';
                                    })
                                    ->icon('heroicon-o-calendar')
                                    ->color('warning'),
                            ]),
                    ])
                    ->collapsible()
                    ->hidden(fn(Ruangan $record) => $record->pinjams()->count() === 0),
            ])
            ->columns(1);
    }

    protected function getHeaderWidgets(): array
    {
        return [
            RuanganResource\Widgets\RuanganStats::class,
        ];
    }
}
