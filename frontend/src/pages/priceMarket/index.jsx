import React from 'react'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import NavBar from '../landing/NavBar'
import Footer from '../landing/Footer'
import DefaultLayout from '@/components/layouts/DefaultLayout'

const marketPrices = [
    {
        id: "RCE001",
        variety: "Beras Pandan Wangi",
        location: "Jakarta",
        price: "Rp 12.000",
        pricePerKg: 12000,
        change: "+1.2%",
        trend: "up",
        quality: "Premium",
        unit: "kg",
        lastUpdated: "2 jam lalu",
    },
    {
        id: "RCE002",
        variety: "Beras IR64",
        location: "Surabaya",
        price: "Rp 10.500",
        pricePerKg: 10500,
        change: "-0.8%",
        trend: "down",
        quality: "Medium",
        unit: "kg",
        lastUpdated: "1 jam lalu",
    },
    {
        id: "RCE003",
        variety: "Beras Cianjur",
        location: "Bandung",
        price: "Rp 13.000",
        pricePerKg: 13000,
        change: "+0.5%",
        trend: "up",
        quality: "Premium",
        unit: "kg",
        lastUpdated: "45 menit lalu",
    },
    {
        id: "RCE004",
        variety: "Beras Mentik Wangi",
        location: "Yogyakarta",
        price: "Rp 11.800",
        pricePerKg: 11800,
        change: "0.0%",
        trend: "stable",
        quality: "Grade A",
        unit: "kg",
        lastUpdated: "30 menit lalu",
    },
    {
        id: "RCE005",
        variety: "Beras Merah",
        location: "Medan",
        price: "Rp 15.000",
        pricePerKg: 15000,
        change: "+2.0%",
        trend: "up",
        quality: "Organik",
        unit: "kg",
        lastUpdated: "3 jam lalu",
    },
    {
        id: "RCE006",
        variety: "Beras Hitam",
        location: "Semarang",
        price: "Rp 20.000",
        pricePerKg: 20000,
        change: "-1.0%",
        trend: "down",
        quality: "Organik Premium",
        unit: "kg",
        lastUpdated: "2 jam lalu",
    },
]

const PriceMarket = () => {
    return (
        <DefaultLayout>
            <NavBar />
            <div className="w-full min-h-screen p-10 bg-gray-50">
                <h1 className="text-2xl font-semibold mb-6">Harga Pasar Padi</h1>
                <Table>
                    <TableCaption>Update terbaru harga Padi di berbagai kota.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[120px]">ID</TableHead>
                            <TableHead>Varietas</TableHead>
                            <TableHead>Lokasi</TableHead>
                            <TableHead>Kualitas</TableHead>
                            <TableHead>Perubahan</TableHead>
                            <TableHead>Harga</TableHead>
                            <TableHead className="text-right">Terakhir Update</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {marketPrices.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.id}</TableCell>
                                <TableCell>{item.variety}</TableCell>
                                <TableCell>{item.location}</TableCell>
                                <TableCell>{item.quality}</TableCell>
                                <TableCell
                                    className={`${
                                        item.trend === "up"
                                        ? "text-green-600"
                                        : item.trend === "down"
                                        ? "text-red-600"
                                        : "text-gray-600"
                                    }`}
                                >
                                    {item.change}
                                </TableCell>
                                <TableCell>{item.price}</TableCell>
                                <TableCell className="text-right">{item.lastUpdated}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={6} className="font-semibold">
                                Rata-rata Harga
                            </TableCell>
                            <TableCell className="text-right">
                                Rp{" "}
                                {Math.round(
                                marketPrices.reduce((acc, cur) => acc + cur.pricePerKg, 0) /
                                    marketPrices.length
                                ).toLocaleString("id-ID")}
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
            <Footer />
        </DefaultLayout>
    )
}

export default PriceMarket