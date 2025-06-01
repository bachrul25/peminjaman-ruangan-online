<?php

namespace App\Filament\Resources\PinjamResource\Pages;

use Filament\Pages\Actions;
use Filament\Resources\Pages\ViewRecord;
use App\Filament\Resources\PinjamResource;
use Filament\Infolists\Infolist;
use Filament\Infolists\Components;
use App\Models\Pinjam;

class ViewPinjam extends ViewRecord
{
    protected static string $resource = PinjamResource::class;

    protected function getActions(): array
    {
        return [
            Actions\EditAction::make()
                ->label('Edit Peminjaman'),
            Actions\DeleteAction::make()
                ->label('Hapus Peminjaman'),
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
                Components\Section::make('Informasi Peminjaman')
                    ->schema([
                        Components\Grid::make(3)
                            ->schema([
                                Components\TextEntry::make('user.name')
                                    ->label('Peminjam')
                                    ->size('lg')
                                    ->weight('bold')
                                    ->columnSpan(2),

                                Components\TextEntry::make('status')
                                    ->label('Status')
                                    ->badge()
                                    ->color(fn(string $state): string => match ($state) {
                                        'pending' => 'warning',
                                        'approved' => 'success',
                                        'rejected' => 'danger',
                                        'completed' => 'primary',
                                        default => 'gray',
                                    }),
                            ]),

                        Components\Grid::make(3)
                            ->schema([
                                Components\TextEntry::make('ruangan.nama_ruangan')
                                    ->label('Ruangan')
                                    ->icon('heroicon-o-building-office'),

                                Components\TextEntry::make('tanggal_pinjam')
                                    ->label('Tanggal')
                                    ->date('d M Y')
                                    ->icon('heroicon-o-calendar'),

                                Components\TextEntry::make('sesi.nama')
                                    ->label('Sesi')
                                    ->icon('heroicon-o-clock'),
                            ]),

                        Components\Grid::make(2)
                            ->schema([
                                Components\TextEntry::make('sesi.start_time')
                                    ->label('Jam Mulai')
                                    ->time('H:i'),

                                Components\TextEntry::make('sesi.end_time')
                                    ->label('Jam Selesai')
                                    ->time('H:i'),
                            ]),
                    ])
                    ->collapsible(),

                Components\Section::make('Informasi Check-in')
                    ->schema([
                        Components\TextEntry::make('check_ins_count')
                            ->label('Jumlah Check-in')
                            ->formatStateUsing(fn($state): string => "$state kali"),

                        Components\RepeatableEntry::make('check_ins')
                            ->label('Riwayat Check-in')
                            ->schema([
                                Components\TextEntry::make('waktu_checkin')
                                    ->label('Waktu')
                                    ->dateTime('d M Y H:i'),
                                Components\TextEntry::make('keterangan'),
                            ])
                            ->columns(2),
                    ])
                    ->collapsible()
                    ->hidden(fn(Pinjam $record) => $record->check_ins()->count() === 0),
            ])
            ->columns(1);
    }
}
