<?php

namespace App\Filament\Resources\PinjamResource\Pages;

use App\Filament\Resources\PinjamResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord; // <-- Pastikan 'use' ini benar

class ViewPinjam extends ViewRecord // <-- Pastikan 'extends' ini benar
{
    protected static string $resource = PinjamResource::class;

    // Opsional: Menambahkan tombol Edit di pojok kanan atas halaman View
    protected function getHeaderActions(): array
    {
        return [
            Actions\EditAction::make(),
        ];
    }
}
