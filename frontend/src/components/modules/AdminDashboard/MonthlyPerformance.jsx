import React from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const MonthlyPerformance = () => {
    const data = [
        { month: 'Jan', revenue: 45000, orders: 120 },
        { month: 'Feb', revenue: 52000, orders: 140 },
        { month: 'Mar', revenue: 48000, orders: 125 },
        { month: 'Apr', revenue: 61000, orders: 165 },
        { month: 'May', revenue: 58000, orders: 155 },
        { month: 'Jun', revenue: 67000, orders: 180 },
    ]

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Performa Bulanan</h3>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip
                            contentStyle={{ 
                                backgroundColor: 'white', 
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px'
                            }}
                        />
                        <Bar dataKey="revenue" fill="#3b82f6" name="Revenue (Rp)" />
                        <Bar dataKey="orders" fill="#10b981" name="Pesanan" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default MonthlyPerformance