import React from 'react'
import { TrendingUp } from 'lucide-react'

const StatsCard = ({ title, value, icon: Icon, color, trend }) => {
    const isPositive = trend.startsWith('+')
    
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
                    <p className="text-3xl font-bold text-gray-900">{value}</p>
                    <div className="flex items-center mt-2">
                        <TrendingUp className={`h-4 w-4 mr-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`} />
                        <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                            {trend}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">dari bulan lalu</span>
                    </div>
                </div>
                <div className={`${color} p-3 rounded-xl`}>
                    <Icon className="h-6 w-6 text-white" />
                </div>
            </div>
        </div>
    )
}

export default StatsCard