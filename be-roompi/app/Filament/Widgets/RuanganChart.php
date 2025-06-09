<?php

namespace App\Filament\Widgets;

use App\Models\Pinjam;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Facades\DB;

class RuanganChart extends ChartWidget
{
    protected static ?string $heading = 'Ruangan Paling Populer';
    protected static ?int $sort = 3;

    protected function getData(): array
    {
        $data = Pinjam::query()
            ->join('ruangans', 'pinjams.ruangan_idruangan', '=', 'ruangans.id_ruangan') //
            ->select('ruangans.nama_ruangan', DB::raw('count(*) as count')) //
            ->groupBy('ruangans.nama_ruangan') //
            ->orderBy('count', 'DESC')
            ->limit(5)
            ->get();

        return [
            'datasets' => [
                [
                    'label' => 'Jumlah Peminjaman',
                    'data' => $data->pluck('count')->toArray(),
                    'backgroundColor' => [
                        'rgba(124, 58, 237, 0.7)',
                        'rgba(16, 185, 129, 0.7)',
                        'rgba(59, 130, 246, 0.7)',
                        'rgba(245, 158, 11, 0.7)',
                        'rgba(239, 68, 68, 0.7)'
                    ],
                ],
            ],
            'labels' => $data->pluck('nama_ruangan')->toArray(), //
        ];
    }

    protected function getType(): string
    {
        return 'bar';
    }
}
