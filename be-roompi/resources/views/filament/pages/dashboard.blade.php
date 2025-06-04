<x-filament-panels::page>
    <div class="space-y-6">
        <!-- Summary Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <x-filament::card class="bg-gradient-to-r from-blue-600 to-blue-400 text-white">
                <x-slot name="header" class="text-white font-medium">Total Peminjaman</x-slot>
                <div class="flex items-center justify-between">
                    <div class="text-3xl font-bold">{{ $jumlahPeminjaman }}</div>
                    <x-heroicon-o-document-text class="w-10 h-10 opacity-80" />
                </div>
                <div class="mt-2 text-sm opacity-90">Total semua peminjaman ruangan</div>
            </x-filament::card>

            <x-filament::card class="bg-gradient-to-r from-purple-600 to-purple-400 text-white">
                <x-slot name="header" class="text-white font-medium">Jumlah Ruangan</x-slot>
                <div class="flex items-center justify-between">
                    <div class="text-3xl font-bold">{{ $jumlahRuangan }}</div>
                    <x-heroicon-o-building-office-2 class="w-10 h-10 opacity-80" />
                </div>
                <div class="mt-2 text-sm opacity-90">Ruangan tersedia</div>
            </x-filament::card>

            <x-filament::card class="bg-gradient-to-r from-green-600 to-green-400 text-white">
                <x-slot name="header" class="text-white font-medium">Jumlah Pengguna</x-slot>
                <div class="flex items-center justify-between">
                    <div class="text-3xl font-bold">{{ $jumlahUser }}</div>
                    <x-heroicon-o-users class="w-10 h-10 opacity-80" />
                </div>
                <div class="mt-2 text-sm opacity-90">Pengguna terdaftar</div>
            </x-filament::card>
        </div>

        <!-- Charts Section -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Peminjaman Chart -->
            <x-filament::card>
                <x-slot name="header" class="font-semibold">Trend Peminjaman Bulan Ini</x-slot>
                <div class="h-64">
                    <canvas id="peminjamanChart"></canvas>
                </div>
            </x-filament::card>

            <!-- Ruangan Popularitas -->
            <x-filament::card>
                <x-slot name="header" class="font-semibold">Ruangan Paling Populer</x-slot>
                <div class="h-64">
                    <canvas id="ruanganChart"></canvas>
                </div>
            </x-filament::card>
        </div>

        <!-- Recent Activity -->
        <x-filament::card>
            <x-slot name="header" class="font-semibold">Aktivitas Peminjaman Terkini</x-slot>
            <div class="overflow-x-auto">
                <table class="w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Ruangan</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Peminjam</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Tanggal</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <!-- Sample rows - replace with actual data -->
                        <tr>
                            <td class="px-6 py-4 whitespace-nowrap">Meeting Room A</td>
                            <td class="px-6 py-4 whitespace-nowrap">John Doe</td>
                            <td class="px-6 py-4 whitespace-nowrap">15 Mei 2023</td>
                            <td class="px-6 py-4 whitespace-nowrap"><span
                                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Selesai</span>
                            </td>
                        </tr>
                        <tr>
                            <td class="px-6 py-4 whitespace-nowrap">Auditorium</td>
                            <td class="px-6 py-4 whitespace-nowrap">Jane Smith</td>
                            <td class="px-6 py-4 whitespace-nowrap">16 Mei 2023</td>
                            <td class="px-6 py-4 whitespace-nowrap"><span
                                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Berlangsung</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </x-filament::card>
    </div>

    @push('scripts')
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script>
        // Peminjaman Trend Chart
            const peminjamanCtx = document.getElementById('peminjamanChart').getContext('2d');
            new Chart(peminjamanCtx, {
                type: 'line',
                data: {
                    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
                    datasets: [{
                        label: 'Peminjaman Harian',
                        data: [12, 19, 3, 5, 2, 3, 7, 15, 10, 12, 8, 14, 9, 11, 13],
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        borderColor: 'rgba(59, 130, 246, 1)',
                        borderWidth: 2,
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            // Ruangan Popularity Chart
            const ruanganCtx = document.getElementById('ruanganChart').getContext('2d');
            new Chart(ruanganCtx, {
                type: 'bar',
                data: {
                    labels: ['Meeting A', 'Meeting B', 'Auditorium', 'Training Room', 'Lounge'],
                    datasets: [{
                        label: 'Jumlah Peminjaman',
                        data: [15, 12, 8, 5, 3],
                        backgroundColor: [
                            'rgba(124, 58, 237, 0.7)',
                            'rgba(16, 185, 129, 0.7)',
                            'rgba(59, 130, 246, 0.7)',
                            'rgba(245, 158, 11, 0.7)',
                            'rgba(239, 68, 68, 0.7)'
                        ],
                        borderColor: [
                            'rgba(124, 58, 237, 1)',
                            'rgba(16, 185, 129, 1)',
                            'rgba(59, 130, 246, 1)',
                            'rgba(245, 158, 11, 1)',
                            'rgba(239, 68, 68, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
    </script>
    @endpush
</x-filament-panels::page>