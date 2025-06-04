<?php

namespace App\Filament\Resources\PinjamResource\Pages;

use App\Filament\Resources\PinjamResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListPinjams extends ListRecords
{
    protected static string $resource = PinjamResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
