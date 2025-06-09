<?php

namespace App\Filament\Resources\CheckInResource\Pages;

use App\Filament\Resources\CheckInResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateCheckIn extends CreateRecord
{
    protected static string $resource = CheckInResource::class;
}
