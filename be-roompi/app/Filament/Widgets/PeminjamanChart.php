<?php

namespace App\Filament\Widgets;

use App\Models\Pinjam;
use Carbon\Carbon;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Facades\DB;

class PeminjamanChart extends ChartWidget
{
    protected static ?string $heading = 'Trend Peminjaman 30 Hari Terakhir';
    protected static ?int $sort = 2;

    protected function getData(): array
    {
        $tanggalAwal = Carbon::now()->subDays(29)->startOfDay();
        $tanggalAkhir = Carbon::now()->endOfDay();

        // Ambil jumlah peminjaman per tanggal
        $data = Pinjam::select(
            DB::raw('DATE(tanggal_pinjam) as date'),
            DB::raw('COUNT(*) as total')
        )
            ->whereBetween('tanggal_pinjam', [$tanggalAwal, $tanggalAkhir])
            ->groupBy(DB::raw('DATE(tanggal_pinjam)'))
            ->orderBy('date')
            ->get()
            ->keyBy('date');

        // Generate 30 hari terakhir
        $labels = [];
        $values = [];

        for ($date = $tanggalAwal->copy(); $date <= $tanggalAkhir; $date->addDay()) {
            $labels[] = $date->format('d M');
            $values[] = $data->has($date->toDateString())
                ? $data[$date->toDateString()]->total
                : 0;
        }

        return [
            'datasets' => [
                [
                    'label' => 'Peminjaman',
                    'data' => $values,
                    'backgroundColor' => 'rgba(59, 130, 246, 0.2)',
                    'borderColor' => 'rgb(59, 130, 246)',
                    'borderWidth' => 2,
                    'fill' => true,
                    'tension' => 0.4,
                ],
            ],
            'labels' => $labels,
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }
}
