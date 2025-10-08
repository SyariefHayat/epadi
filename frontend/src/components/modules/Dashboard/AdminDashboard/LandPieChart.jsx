
import React, { useEffect, useMemo, useState } from 'react'

import { 
    ArrowDownRight,
    ArrowUpRight,
    CircleDollarSign, 
    ShoppingBag, 
    Truck, 
    Users 
} from 'lucide-react'

import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle 
} from '@/components/ui/card'

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

import { useAuth } from '@/context/AuthContext'
import { apiInstanceExpress } from '@/services/apiInstance'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import UserBarChart from '@/components/modules/Dashboard/AdminDashboard/UserBarChart'

const now = new Date();
const currentMonth = now.getMonth();
const currentYear = now.getFullYear();

const isSameMonth = (date, month, year) => {
    const d = new Date(date);
    return d.getMonth() === month && d.getFullYear() === year;
};

const isCurrentMonth = (date) => isSameMonth(date, currentMonth, currentYear);
const isLastMonth = (date) =>
    currentMonth === 0
        ? isSameMonth(date, 11, currentYear - 1)
        : isSameMonth(date, currentMonth - 1, currentYear);

const countGrowth = (arr, field = 'createdAt') => {
    let current = 0, last = 0;
    for (const item of arr || []) {
        const date = item?.[field];
        if (!date) continue;
        if (isCurrentMonth(date)) current++;
        else if (isLastMonth(date)) last++;
    }
    if (last === 0) return { value: 100, isPositive: current >= 0 };
    const growth = ((current - last) / Math.abs(last)) * 100;
    return { value: Math.abs(growth).toFixed(1), isPositive: growth >= 0 };
};

// Komponen Pie Chart untuk Total Lahan
const LandPieChart = ({ farmers, distributors, investors, buyers }) => {
    const landData = useMemo(() => {
        // Hitung total lahan dari setiap kategori pengguna
        const farmerLand = farmers.reduce((sum, farmer) => sum + (farmer.landArea || 0), 0);
        const distributorLand = distributors.reduce((sum, dist) => sum + (dist.landArea || 0), 0);
        const investorLand = investors.reduce((sum, inv) => sum + (inv.landArea || 0), 0);
        const buyerLand = buyers.reduce((sum, buyer) => sum + (buyer.landArea || 0), 0);

        return [
            { name: 'Petani', value: farmerLand, color: '#22c55e' },
            { name: 'Distributor', value: distributorLand, color: '#3b82f6' },
            { name: 'Investor', value: investorLand, color: '#a855f7' },
            { name: 'Pembeli', value: buyerLand, color: '#f97316' }
        ].filter(item => item.value > 0);
    }, [farmers, distributors, investors, buyers]);

    const totalLand = landData.reduce((sum, item) => sum + item.value, 0);

    return (
        <Card className="col-span-2">
            <CardHeader>
                <CardTitle className="text-base font-medium">
                    Total Lahan Terkumpul
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie
                                    data={landData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={80}
                                    paddingAngle={2}
                                    dataKey="value"
                                >
                                    {landData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    formatter={(value) => `${value.toLocaleString('id-ID')} m²`}
                                />
                                <Legend 
                                    verticalAlign="middle" 
                                    align="right"
                                    layout="vertical"
                                    iconType="circle"
                                    formatter={(value, entry) => (
                                        <span className="text-sm">
                                            {value}: {entry.payload.value.toLocaleString('id-ID')} m²
                                        </span>
                                    )}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="mt-4 text-center">
                    <p className="text-sm text-muted-foreground">Total Keseluruhan</p>
                    <p className="text-2xl font-bold">{totalLand.toLocaleString('id-ID')} m²</p>
                    <p className="text-xs text-muted-foreground mt-1">
                        {(totalLand / 10000).toFixed(2)} hektar
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};