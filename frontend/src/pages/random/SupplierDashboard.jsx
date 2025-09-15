import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
    Package, 
    ShoppingCart, 
    TrendingUp, 
    Users, 
    AlertTriangle,
    Plus,
    Edit,
    Trash2,
    Eye,
    FileText,
    BarChart3,
    Settings,
    LogOut,
    Search,
    Filter,
    Download
} from "lucide-react"

const SupplierDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview')
    const [searchTerm, setSearchTerm] = useState('')
    
    // Mock data
    const [products, setProducts] = useState([
        { id: 1, name: 'Beras Premium', kategori: 'Pangan', stok: 150, harga: 12000, status: 'Aktif' },
        { id: 2, name: 'Minyak Goreng', kategori: 'Pangan', stok: 75, harga: 15000, status: 'Aktif' },
        { id: 3, name: 'Gula Pasir', kategori: 'Pangan', stok: 25, harga: 13000, status: 'Stok Rendah' },
        { id: 4, name: 'Tepung Terigu', kategori: 'Pangan', stok: 200, harga: 8000, status: 'Aktif' },
    ])

    const [orders, setOrders] = useState([
        { id: 'ORD001', distributor: 'CV Distributor ABC', produk: 'Beras Premium', jumlah: 50, total: 600000, status: 'Pending', tanggal: '2024-06-20' },
        { id: 'ORD002', distributor: 'PT Distributor XYZ', produk: 'Minyak Goreng', jumlah: 30, total: 450000, status: 'Diproses', tanggal: '2024-06-21' },
        { id: 'ORD003', distributor: 'CV Distributor ABC', produk: 'Gula Pasir', jumlah: 20, total: 260000, status: 'Selesai', tanggal: '2024-06-19' },
    ])

    const stats = {
        totalProducts: products.length,
        activeOrders: orders.filter(o => o.status !== 'Selesai').length,
        lowStock: products.filter(p => p.stok < 50).length,
        monthlyRevenue: 2500000
    }

    const MenuItem = ({ icon: Icon, label, tabKey, isActive, onClick }) => (
        <button
            onClick={() => onClick(tabKey)}
            className={`flex items-center gap-3 w-full px-4 py-3 text-left rounded-lg transition-colors ${
                isActive ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100'
            }`}
        >
            <Icon className="h-5 w-5" />
            {label}
        </button>
    )

    const Overview = () => (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold mb-2">Dashboard Overview</h2>
                <p className="text-gray-600">Ringkasan aktivitas supplier Anda</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Produk</p>
                                <p className="text-2xl font-bold">{stats.totalProducts}</p>
                            </div>
                            <Package className="h-8 w-8 text-blue-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Pesanan Aktif</p>
                                <p className="text-2xl font-bold">{stats.activeOrders}</p>
                            </div>
                            <ShoppingCart className="h-8 w-8 text-green-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Stok Rendah</p>
                                <p className="text-2xl font-bold text-orange-600">{stats.lowStock}</p>
                            </div>
                            <AlertTriangle className="h-8 w-8 text-orange-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Pendapatan Bulan Ini</p>
                                <p className="text-2xl font-bold">Rp {stats.monthlyRevenue.toLocaleString()}</p>
                            </div>
                            <TrendingUp className="h-8 w-8 text-emerald-600" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Orders */}
            <Card>
                <CardHeader>
                    <CardTitle>Pesanan Terbaru</CardTitle>
                    <CardDescription>5 pesanan terakhir dari distributor</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {orders.slice(0, 5).map(order => (
                            <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                                <div>
                                    <p className="font-medium">{order.id}</p>
                                    <p className="text-sm text-gray-600">{order.distributor} • {order.produk}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium">Rp {order.total.toLocaleString()}</p>
                                    <span className={`text-xs px-2 py-1 rounded-full ${
                                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                        order.status === 'Diproses' ? 'bg-blue-100 text-blue-800' :
                                        'bg-green-100 text-green-800'
                                    }`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )

    const Products = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold mb-2">Manajemen Produk</h2>
                    <p className="text-gray-600">Kelola katalog produk Anda</p>
                </div>
                <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Tambah Produk
                </Button>
            </div>

            {/* Search and Filter */}
            <div className="flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Cari produk..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                </Button>
            </div>

            {/* Products Table */}
            <Card>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="text-left p-4 font-medium">Produk</th>
                                    <th className="text-left p-4 font-medium">Kategori</th>
                                    <th className="text-left p-4 font-medium">Stok</th>
                                    <th className="text-left p-4 font-medium">Harga</th>
                                    <th className="text-left p-4 font-medium">Status</th>
                                    <th className="text-left p-4 font-medium">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr key={product.id} className="border-b">
                                        <td className="p-4 font-medium">{product.name}</td>
                                        <td className="p-4 text-gray-600">{product.kategori}</td>
                                        <td className="p-4">
                                            <span className={product.stok < 50 ? 'text-orange-600 font-medium' : ''}>
                                                {product.stok}
                                            </span>
                                        </td>
                                        <td className="p-4">Rp {product.harga.toLocaleString()}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded-full text-xs ${
                                                product.status === 'Aktif' ? 'bg-green-100 text-green-800' :
                                                'bg-orange-100 text-orange-800'
                                            }`}>
                                                {product.status}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex gap-2">
                                                <Button variant="ghost" size="sm">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="sm">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="sm" className="text-red-600">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )

    const Orders = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold mb-2">Manajemen Pesanan</h2>
                    <p className="text-gray-600">Kelola pesanan dari distributor</p>
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Export
                </Button>
            </div>

            {/* Order Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardContent className="p-4">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-yellow-600">
                                {orders.filter(o => o.status === 'Pending').length}
                            </p>
                            <p className="text-sm text-gray-600">Pesanan Pending</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-blue-600">
                                {orders.filter(o => o.status === 'Diproses').length}
                            </p>
                            <p className="text-sm text-gray-600">Sedang Diproses</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-green-600">
                                {orders.filter(o => o.status === 'Selesai').length}
                            </p>
                            <p className="text-sm text-gray-600">Pesanan Selesai</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Orders Table */}
            <Card>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="text-left p-4 font-medium">ID Pesanan</th>
                                    <th className="text-left p-4 font-medium">Distributor</th>
                                    <th className="text-left p-4 font-medium">Produk</th>
                                    <th className="text-left p-4 font-medium">Jumlah</th>
                                    <th className="text-left p-4 font-medium">Total</th>
                                    <th className="text-left p-4 font-medium">Status</th>
                                    <th className="text-left p-4 font-medium">Tanggal</th>
                                    <th className="text-left p-4 font-medium">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order.id} className="border-b">
                                        <td className="p-4 font-medium">{order.id}</td>
                                        <td className="p-4">{order.distributor}</td>
                                        <td className="p-4">{order.produk}</td>
                                        <td className="p-4">{order.jumlah}</td>
                                        <td className="p-4">Rp {order.total.toLocaleString()}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded-full text-xs ${
                                                order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                order.status === 'Diproses' ? 'bg-blue-100 text-blue-800' :
                                                'bg-green-100 text-green-800'
                                            }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-gray-600">{order.tanggal}</td>
                                        <td className="p-4">
                                            <div className="flex gap-2">
                                                <Button variant="ghost" size="sm">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                {order.status === 'Pending' && (
                                                    <Button variant="ghost" size="sm" className="text-green-600">
                                                        <span className="text-xs">Proses</span>
                                                    </Button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )

    const Reports = () => (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold mb-2">Laporan & Analitik</h2>
                <p className="text-gray-600">Analisis performa dan laporan penjualan</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="h-5 w-5" />
                            Penjualan Bulanan
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-48 flex items-center justify-center bg-gray-50 rounded-lg">
                            <p className="text-gray-500">Grafik Penjualan Bulanan</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Package className="h-5 w-5" />
                            Produk Terlaris
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {products.slice(0, 4).map((product, index) => (
                                <div key={product.id} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium">
                                            {index + 1}
                                        </div>
                                        <span className="font-medium">{product.name}</span>
                                    </div>
                                    <span className="text-gray-600">{product.stok} unit</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Laporan Keuangan</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-green-50 rounded-lg">
                            <p className="text-sm text-green-600 font-medium">Total Pendapatan</p>
                            <p className="text-2xl font-bold text-green-700">Rp 2,500,000</p>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-600 font-medium">Rata-rata per Pesanan</p>
                            <p className="text-2xl font-bold text-blue-700">Rp 436,667</p>
                        </div>
                        <div className="p-4 bg-purple-50 rounded-lg">
                            <p className="text-sm text-purple-600 font-medium">Margin Keuntungan</p>
                            <p className="text-2xl font-bold text-purple-700">23.5%</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )

    const renderContent = () => {
        switch (activeTab) {
            case 'overview': return <Overview />
            case 'products': return <Products />
            case 'orders': return <Orders />
            case 'reports': return <Reports />
            default: return <Overview />
        }
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-sm border-r">
                <div className="p-6 border-b">
                    <h1 className="text-xl font-bold text-gray-800">Supplier Dashboard</h1>
                    <p className="text-sm text-gray-600">PT Supplier ABC</p>
                </div>
                
                <nav className="p-4 space-y-2">
                    <MenuItem 
                        icon={BarChart3} 
                        label="Overview" 
                        tabKey="overview"
                        isActive={activeTab === 'overview'}
                        onClick={setActiveTab}
                    />
                    <MenuItem 
                        icon={Package} 
                        label="Produk" 
                        tabKey="products"
                        isActive={activeTab === 'products'}
                        onClick={setActiveTab}
                    />
                    <MenuItem 
                        icon={ShoppingCart} 
                        label="Pesanan" 
                        tabKey="orders"
                        isActive={activeTab === 'orders'}
                        onClick={setActiveTab}
                    />
                    <MenuItem 
                        icon={FileText} 
                        label="Laporan" 
                        tabKey="reports"
                        isActive={activeTab === 'reports'}
                        onClick={setActiveTab}
                    />
                    
                    <div className="pt-4 mt-4 border-t">
                        <MenuItem 
                            icon={Settings} 
                            label="Pengaturan" 
                            tabKey="settings"
                            isActive={activeTab === 'settings'}
                            onClick={setActiveTab}
                        />
                        <MenuItem 
                            icon={LogOut} 
                            label="Logout" 
                            tabKey="logout"
                            isActive={false}
                            onClick={() => {}}
                        />
                    </div>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
                {renderContent()}
            </div>
        </div>
    )
}

export default SupplierDashboard