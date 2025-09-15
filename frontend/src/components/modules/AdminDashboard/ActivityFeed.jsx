import React from 'react'
import { Activity } from 'lucide-react'

const ActivityFeed = () => {
    const activities = [
        { id: 1, type: 'order', message: 'Pesanan #1234 berhasil dibuat', time: '2 menit lalu', color: 'bg-blue-500' },
        { id: 2, type: 'delivery', message: 'Pengiriman #5678 sedang dalam perjalanan', time: '15 menit lalu', color: 'bg-green-500' },
        { id: 3, type: 'user', message: 'User baru "John Doe" terdaftar', time: '1 jam lalu', color: 'bg-purple-500' },
        { id: 4, type: 'product', message: 'Stok produk "Laptop Gaming" diperbarui', time: '2 jam lalu', color: 'bg-orange-500' },
        { id: 5, type: 'supplier', message: 'Supplier "Tech Corp" mengirim konfirmasi', time: '3 jam lalu', color: 'bg-indigo-500' },
    ]

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Aktivitas Terbaru</h3>
                <Activity className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
                {activities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                        <div className={`${activity.color} w-2 h-2 rounded-full mt-2 flex-shrink-0`}></div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ActivityFeed