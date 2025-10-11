import { TrendingUp, TrendingDown } from "lucide-react";

import { 
    Bar, 
    BarChart, 
    CartesianGrid, 
    XAxis, 
    YAxis, 
    ResponsiveContainer 
} from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    ChartTooltip,
} from "@/components/ui/chart";

const chartConfig = {
    farmers: {
        label: "Petani",
        color: "#22c55e",
    },
    distributors: {
        label: "Distributor",
        color: "#3b82f6",
    },
    investors: {
        label: "Investor",
        color: "#a855f7",
    },
    buyers: {
        label: "Pembeli",
        color: "#f97316",
    },
};

const UserBarChart = ({ growthData }) => {
    const processedData = [
        {
            category: "Petani",
            growth: parseFloat(growthData.farmers.value),
            isPositive: growthData.farmers.isPositive,
            fill: chartConfig.farmers.color,
        },
        {
            category: "Distributor", 
            growth: parseFloat(growthData.distributors.value),
            isPositive: growthData.distributors.isPositive,
            fill: chartConfig.distributors.color,
        },
        {
            category: "Investor",
            growth: parseFloat(growthData.investors.value),
            isPositive: growthData.investors.isPositive,
            fill: chartConfig.investors.color,
        },
        {
            category: "Pembeli",
            growth: parseFloat(growthData.buyers.value),
            isPositive: growthData.buyers.isPositive,
            fill: chartConfig.buyers.color,
        },
    ];

    const positiveGrowthCount = processedData.filter(item => item.isPositive).length;
    const overallTrend = {
        isUp: positiveGrowthCount >= 2,
        count: positiveGrowthCount,
        total: processedData.length
    };

    const isEmpty = processedData.every(item => item.growth === 0);

    return (
        <Card className="col-span-full md:col-span-4 lg:col-span-4">
            <CardHeader className="pb-2">
                <CardTitle className="text-base sm:text-lg">Pertumbuhan Pengguna</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                    Persentase pertumbuhan dari bulan sebelumnya
                </CardDescription>
            </CardHeader>
            <CardContent className="px-2 sm:px-6">
                {isEmpty ? (
                    <div className="flex items-center justify-center h-44 sm:h-56">
                        <p className="text-sm sm:text-base text-muted-foreground">Belum ada data pertumbuhan</p>
                    </div>
                ) : (
                    <div className="w-full h-44 sm:h-56 md:h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart 
                                data={processedData}
                                margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis
                                    dataKey="category"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tick={{ fontSize: 12 }}
                                    interval={0}
                                    angle={window.innerWidth < 640 ? -45 : 0}
                                    textAnchor={window.innerWidth < 640 ? "end" : "middle"}
                                    height={window.innerWidth < 640 ? 60 : 30}
                                />
                                <YAxis
                                    tickLine={false}
                                    axisLine={false}
                                    tick={{ fontSize: 12 }}
                                    tickFormatter={(value) => `${value}%`}
                                    width={40}
                                />
                                <ChartTooltip
                                    cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                                    content={({ active, payload, label }) => {
                                        if (active && payload && payload.length) {
                                            const data = payload[0].payload;
                                            return (
                                                <div className="bg-white p-3 border rounded-lg shadow-lg">
                                                    <p className="font-semibold text-sm mb-1">{label}</p>
                                                    <p className={`text-sm font-medium ${data.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                                                        {data.isPositive ? '+' : ''}{data.growth}% pertumbuhan
                                                    </p>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                <Bar 
                                    dataKey="growth" 
                                    radius={[8, 8, 0, 0]}
                                    maxBarSize={60}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-xs sm:text-sm pt-4">
                <div className="flex items-center gap-2 font-medium leading-none">
                    {overallTrend.isUp ? (
                        <>
                            <TrendingUp className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-green-700">
                                {overallTrend.count} dari {overallTrend.total} kategori mengalami pertumbuhan
                            </span>
                        </>
                    ) : (
                        <>
                            <TrendingDown className="h-4 w-4 text-red-500 flex-shrink-0" />
                            <span className="text-red-700">
                                Hanya {overallTrend.count} dari {overallTrend.total} kategori yang tumbuh
                            </span>
                        </>
                    )}
                </div>
                <div className="text-xs text-muted-foreground leading-relaxed">
                    Data dibandingkan dengan bulan sebelumnya
                </div>
            </CardFooter>
        </Card>
    );
};

export default UserBarChart;