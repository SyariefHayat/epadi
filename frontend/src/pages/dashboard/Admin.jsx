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

                <div className="grid auto-rows-min gap-4 grid-cols-1">
                    <UserBarChart growthData={growthData} />
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Admin