import { TrendingUp, TrendingDown } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
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

    // Calculate overall trend
    const positiveGrowthCount = processedData.filter(item => item.isPositive).length;
    const overallTrend = {
        isUp: positiveGrowthCount >= 2,
        count: positiveGrowthCount,
        total: processedData.length
    };

    const isEmpty = processedData.every(item => item.growth === 0);

    return (
        <Card className="sm:col-span-3">
            <CardHeader>
                <CardTitle>Pertumbuhan Pengguna</CardTitle>
                <CardDescription>
                    Persentase pertumbuhan dari bulan sebelumnya
                </CardDescription>
            </CardHeader>
            <CardContent className="h-full">
                {isEmpty ? (
                    <div className="flex items-center justify-center h-44">
                        <p className="text-muted-foreground">Belum ada data pertumbuhan</p>
                    </div>
                ) : (
                    <ChartContainer config={chartConfig} className="w-full h-44">
                        <BarChart accessibilityLayer data={processedData}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="category"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 8)}
                            />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${value}%`}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={({ active, payload, label }) => {
                                    if (active && payload && payload.length) {
                                        const data = payload[0].payload;
                                        return (
                                            <div className="bg-white p-2 border rounded shadow-sm">
                                                <p className="font-medium">{label}</p>
                                                <p className={`text-sm ${data.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                                                    {data.isPositive ? '+' : '-'}{data.growth}% pertumbuhan
                                                </p>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Bar 
                                dataKey="growth" 
                                name="Pertumbuhan (%)" 
                                radius={4}
                                fill={(entry) => entry.fill}
                            />
                        </BarChart>
                    </ChartContainer>
                )}
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    {overallTrend.isUp ? (
                        <>
                            {overallTrend.count} dari {overallTrend.total} kategori mengalami pertumbuhan <TrendingUp className="h-4 w-4 text-green-500" />
                        </>
                    ) : (
                        <>
                            Hanya {overallTrend.count} dari {overallTrend.total} kategori yang tumbuh <TrendingDown className="h-4 w-4 text-red-500" />
                        </>
                    )}
                </div>
            </CardFooter>
        </Card>
    );
};

export default UserBarChart;