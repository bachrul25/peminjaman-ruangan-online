<?php

namespace App\Filament\Resources\SesiResource\Pages;

use App\Filament\Resources\SesiResource;
use Filament\Actions;
use Filament\Resources\Pages\ManageRecords;

class ManageSesis extends ManageRecords
{
    protected static string $resource = SesiResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
