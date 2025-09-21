import React, { useState, useEffect } from 'react'

import { 
    Package, 
    Shield, 
    Truck, 
    Users,
} from 'lucide-react'

import StatsCard from './StatsCard'
import WeeklyStats from './WeeklyStats'
import ActivityFeed from './ActivityFeed'
import DistributionChart from './DistributionChart'
import MonthlyPerformance from './MonthlyPerformance'

const DashboardContent = () => {
    const [dashboardStats, setDashboardStats] = useState([
        { title: 'Total Users', value: '0', icon: Users, color: 'bg-blue-500', trend: '+0%' },
        { title: 'Total Produk', value: '0', icon: Package, color: 'bg-green-500', trend: '+0%' },
        { title: 'Distribusi Aktif', value: '0', icon: Truck, color: 'bg-orange-500', trend: '+0%' },
        { title: 'Supplier', value: '0', icon: Shield, color: 'bg-purple-500', trend: '+0%' },
    ])

    useEffect(() => {
        const timer = setTimeout(() => {
            setDashboardStats([
                { title: 'Total Users', value: '1,234', icon: Users, color: 'bg-blue-500', trend: '+12%' },
                { title: 'Total Produk', value: '5,678', icon: Package, color: 'bg-green-500', trend: '+8%' },
                { title: 'Distribusi Aktif', value: '89', icon: Truck, color: 'bg-orange-500', trend: '+15%' },
                { title: 'Supplier', value: '156', icon: Shield, color: 'bg-purple-500', trend: '+5%' },
            ])
        }, 1000)

        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Admin</h2>
                <p className="text-gray-600">Ringkasan sistem rantai pasok distribusi</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {dashboardStats.map((stat, index) => (
                    <StatsCard
                        key={index} 
                        title={stat.title}
                        value={stat.value}
                        icon={stat.icon}
                        color={stat.color}
                        trend={stat.trend}
                    />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <WeeklyStats />
                <DistributionChart />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <MonthlyPerformance />
                <ActivityFeed />
            </div>
        </div>
    )
}

export default DashboardContent