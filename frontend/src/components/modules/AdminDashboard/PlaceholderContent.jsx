import React from 'react'
import { Card, CardContent } from '@/components/ui/card'

const PlaceholderContent = ({ title, description, icon: Icon }) => {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
                <p className="text-gray-600">{description}</p>
            </div>
            <Card>
                <CardContent className="p-12 text-center">
                    <div className="text-gray-300 mb-6">
                        <Icon className="h-20 w-20 mx-auto" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Coming Soon</h3>
                    <p className="text-gray-600 mb-2">Halaman {title.toLowerCase()} akan dikembangkan di sini</p>
                    <p className="text-sm text-gray-500">Fitur ini bagian dari kerangka sistem yang sedang dalam pengembangan</p>
                </CardContent>
            </Card>
        </div>
    )
}

export default PlaceholderContent