<?php

namespace App\Filament\Resources\TipeResource\Pages;

use App\Filament\Resources\TipeResource;
use Filament\Actions;
use Filament\Resources\Pages\ManageRecords;

class ManageTipes extends ManageRecords
{
    protected static string $resource = TipeResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
