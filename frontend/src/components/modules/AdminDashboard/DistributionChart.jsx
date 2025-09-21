import React from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

const DistributionChart = () => {
    const data = [
        { name: 'Jakarta', value: 35, color: '#3b82f6' },
        { name: 'Surabaya', value: 25, color: '#10b981' },
        { name: 'Bandung', value: 20, color: '#f59e0b' },
        { name: 'Medan', value: 12, color: '#ef4444' },
        { name: 'Lainnya', value: 8, color: '#8b5cf6' },
    ]

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Distribusi per Kota</h3>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default DistributionChart