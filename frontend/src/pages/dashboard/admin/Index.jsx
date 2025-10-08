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

const Admin = () => {
    const { currentUser } = useAuth();

    const [farmers, setFarmers] = useState([]);
    const [distributors, setDistributors] = useState([]);
    const [investors, setInvestors] = useState([]);
    const [buyers, setBuyers] = useState([]);

    useEffect(() => {
        if (!currentUser) return;

        const getAllUsers = async () => {
            try {
                const token = await currentUser.getIdToken();
                const response = await apiInstanceExpress.get("admin/get/summary", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    setFarmers(response.data.data.farmers);
                    setDistributors(response.data.data.distributors);
                    setInvestors(response.data.data.investors);
                    setBuyers(response.data.data.buyers);
                };
            } catch (error) {
                console.error(error);
            }
        };

        getAllUsers();
    }, [currentUser])

    const growthData = useMemo(() => ({
        farmers: countGrowth(farmers, 'createdAt'),
        distributors: countGrowth(distributors, 'createdAt'),
        investors: countGrowth(investors, 'createdAt'),
        buyers: countGrowth(buyers, 'createdAt'),
    }), [farmers, distributors, investors, buyers]);

    const totals = {
        farmers: farmers.length,
        distributors: distributors.length,
        investors: investors.length,
        buyers: buyers.length,
    };

    return (
        <DashboardLayout>
            <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Petani
                            </CardTitle>
                            <Users className="h-5 w-5 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totals.farmers}</div>
                            <div className="flex items-center gap-1 mt-1">
                                {growthData.farmers.isPositive ? (
                                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                                ) : (
                                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                                )}
                                <p className={`text-xs line-clamp-1 ${growthData.farmers.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                                    {growthData.farmers.isPositive ? '+' : '-'}{Math.abs(growthData.farmers.value)}% dari bulan kemarin
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Distributor
                            </CardTitle>
                            <Truck className="h-5 w-5 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totals.distributors}</div>
                            <div className="flex items-center gap-1 mt-1">
                                {growthData.distributors.isPositive ? (
                                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                                ) : (
                                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                                )}
                                <p className={`text-xs line-clamp-1 ${growthData.distributors.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                                    {growthData.distributors.isPositive ? '+' : '-'}{Math.abs(growthData.distributors.value)}% dari bulan kemarin
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Investor
                            </CardTitle>
                            <CircleDollarSign className="h-5 w-5 text-purple-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totals.investors}</div>
                            <div className="flex items-center gap-1 mt-1">
                                {growthData.investors.isPositive ? (
                                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                                ) : (
                                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                                )}
                                <p className={`text-xs line-clamp-1 ${growthData.investors.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                                    {growthData.investors.isPositive ? '+' : '-'}{Math.abs(growthData.investors.value)}% dari bulan kemarin
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Pembeli
                            </CardTitle>
                            <ShoppingBag className="h-5 w-5 text-orange-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totals.buyers}</div>
                            <div className="flex items-center gap-1 mt-1">
                                {growthData.buyers.isPositive ? (
                                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                                ) : (
                                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                                )}
                                <p className={`text-xs line-clamp-1 ${growthData.buyers.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                                    {growthData.buyers.isPositive ? '+' : '-'}{Math.abs(growthData.buyers.value)}% dari bulan kemarin
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid auto-rows-min gap-4 grid-cols-4">
                    <UserBarChart growthData={growthData} />

                    <LandPieChart 
                        farmers={farmers}
                        distributors={distributors}
                        investors={investors}
                        buyers={buyers}
                    />
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Admin