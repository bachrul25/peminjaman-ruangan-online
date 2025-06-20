<?php

namespace App\Filament\Resources\PinjamResource\Pages;

use App\Filament\Resources\PinjamResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditPinjam extends EditRecord
{
    protected static string $resource = PinjamResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
            Actions\ForceDeleteAction::make(),
            Actions\RestoreAction::make(),
        ];
    }

    // protected function mutateFormDataBeforeFill(array $data): array
    // {
    //     unset($data['checkin_count']); // buang field yang tidak perlu
    //     return $data;
    // }




}
