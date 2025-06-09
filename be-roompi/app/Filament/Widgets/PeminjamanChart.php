<?php

namespace App\Filament\Widgets;

use App\Models\Pinjam;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class PeminjamanChart extends ChartWidget
{
    protected static ?string $heading = 'Trend Peminjaman 30 Hari Terakhir';
    protected static ?int $sort = 2; // Urutan widget

    protected function getData(): array
    {
        $data = Pinjam::select(DB::raw('DATE(tanggal_pinjam) as date'), DB::raw('count(*) as count'))
            ->where('tanggal_pinjam', '>=', Carbon::now()->subDays(30))
            ->groupBy('date')
            ->orderBy('date', 'ASC')
            ->get();

        return [
            'datasets' => [
                [
                    'label' => 'Peminjaman',
                    'data' => $data->pluck('count')->toArray(),
                    'backgroundColor' => 'rgba(59, 130, 246, 0.2)',
                    'borderColor' => 'rgb(59, 130, 246)',
                    'tension' => 0.4,
                ],
            ],
            'labels' => $data->pluck('date')->map(fn($date) => Carbon::parse($date)->format('d M'))->toArray(),
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }
}
