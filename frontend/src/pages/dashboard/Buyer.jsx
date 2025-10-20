import React from 'react'
import { ArrowUpRight, BanknoteIcon, Bell, BookOpenIcon, Clock, MessageCircle, Package, ShoppingCart, TrendingUp, Users } from 'lucide-react'

import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"

import { Separator } from "@/components/ui/separator"
import AppSidebar from "@/components/modules/sellerDashboard/AppSidebar"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getGreeting } from '@/utils/greeting'
import { formatTanggalIndo } from '@/utils/formatDate'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const Buyer = () => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <div className="w-full flex items-center justify-between">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1" />
                            <Separator
                                orientation="vertical"
                                className="mr-2 data-[orientation=vertical]:h-4"
                            />
                            <p>{getGreeting()}, {"Zaid bin Amar"}!</p>
                        </div>
                        <div className="flex items-center justify-center gap-4 pr-5">
                            <p>{formatTanggalIndo()}</p>
                        </div>
                    </div>
                </header>

                <div className="flex flex-1 flex-col gap-6 p-6 bg-gray-50 min-h-screen">
                    {/* Stats Cards */}
                    <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                        <div className="flex items-center justify-between">
                            <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Pesanan Baru</p>
                            <p className="text-2xl font-bold text-gray-900">24</p>
                            </div>
                            <div className="p-3 bg-blue-50 rounded-xl">
                            <ShoppingCart className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                        </div>
                        
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                        <div className="flex items-center justify-between">
                            <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Pesanan Berlangsung</p>
                            <p className="text-2xl font-bold text-gray-900">12</p>
                            </div>
                            <div className="p-3 bg-orange-50 rounded-xl">
                            <Clock className="w-6 h-6 text-orange-600" />
                            </div>
                        </div>
                        </div>
                        
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                        <div className="flex items-center justify-between">
                            <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Total Produk</p>
                            <p className="text-2xl font-bold text-gray-900">156</p>
                            </div>
                            <div className="p-3 bg-green-50 rounded-xl">
                            <Package className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                        </div>
                        
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                        <div className="flex items-center justify-between">
                            <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Chat Baru</p>
                            <p className="text-2xl font-bold text-gray-900">8</p>
                            </div>
                            <div className="p-3 bg-purple-50 rounded-xl">
                            <MessageCircle className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                        </div>
                    </div>
                    
                    {/* Main Chart Section */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex-1">
                        <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">Total Transaksi</h2>
                            <p className="text-sm text-gray-600 mt-1">Ringkasan transaksi bulan ini</p>
                        </div>
                        <div className="p-3 bg-indigo-50 rounded-xl">
                            <TrendingUp className="w-6 h-6 text-indigo-600" />
                        </div>
                        </div>
                        
                        {/* Chart Placeholder */}
                        <div className="h-64 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-200">
                        <div className="text-center">
                            <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                            <p className="text-gray-500 font-medium">Grafik Transaksi</p>
                            <p className="text-sm text-gray-400">Data akan ditampilkan di sini</p>
                        </div>
                        </div>
                        
                        {/* Summary Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        <div className="text-center p-4 bg-gray-50 rounded-xl">
                            <p className="text-sm text-gray-600">Total Hari Ini</p>
                            <p className="text-lg font-semibold text-gray-900">Rp 2.450.000</p>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-xl">
                            <p className="text-sm text-gray-600">Total Minggu Ini</p>
                            <p className="text-lg font-semibold text-gray-900">Rp 15.200.000</p>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-xl">
                            <p className="text-sm text-gray-600">Total Bulan Ini</p>
                            <p className="text-lg font-semibold text-gray-900">Rp 45.800.000</p>
                        </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default Buyer