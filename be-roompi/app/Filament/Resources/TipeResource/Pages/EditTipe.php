<?php

namespace App\Filament\Resources\TipeResource\Pages;

use App\Filament\Resources\TipeResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditTipe extends EditRecord
{
    protected static string $resource = TipeResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
