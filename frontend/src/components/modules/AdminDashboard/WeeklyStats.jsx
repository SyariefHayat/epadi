import React from 'react'
import { BarChart3 } from 'lucide-react'

import { 
    CartesianGrid, 
    Line, 
    LineChart, 
    ResponsiveContainer, 
    Tooltip, 
    XAxis, 
    YAxis 
} from 'recharts'

const WeeklyStats = () => {
    const data = [
        { name: 'Sen', orders: 24, deliveries: 20 },
        { name: 'Sel', orders: 32, deliveries: 28 },
        { name: 'Rab', orders: 28, deliveries: 25 },
        { name: 'Kam', orders: 35, deliveries: 32 },
        { name: 'Jum', orders: 42, deliveries: 38 },
        { name: 'Sab', orders: 38, deliveries: 35 },
        { name: 'Min', orders: 25, deliveries: 22 },
    ]

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Statistik Mingguan</h3>
                <BarChart3 className="h-5 w-5 text-gray-400" />
            </div>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip
                            contentStyle={{ 
                                backgroundColor: 'white', 
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px'
                            }}
                        />
                        <Line type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={3} name="Pesanan" />
                        <Line type="monotone" dataKey="deliveries" stroke="#10b981" strokeWidth={3} name="Pengiriman" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default WeeklyStats