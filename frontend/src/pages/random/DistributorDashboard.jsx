import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Package, 
  Truck, 
  MapPin, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  Users,
  BarChart3,
  Plus,
  Search,
  Bell,
  Settings,
  TrendingUp,
  ShoppingCart,
  Building2,
  DollarSign,
  Activity
} from 'lucide-react';

const DistributorDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState(5);
  
  // Data distribusi untuk demonstrasi
  const [orders, setOrders] = useState([
    { id: 'ORD001', customer: 'Toko Maju Mandiri', location: 'Jakarta Pusat', status: 'processing', amount: 12500000, items: 45, date: '2025-06-24' },
    { id: 'ORD002', customer: 'Supermarket Fresh', location: 'Bekasi', status: 'shipped', amount: 8750000, items: 32, date: '2025-06-23' },
    { id: 'ORD003', customer: 'Minimarket 24 Jam', location: 'Depok', status: 'delivered', amount: 6200000, items: 28, date: '2025-06-22' },
    { id: 'ORD004', customer: 'Warung Berkah', location: 'Tangerang', status: 'pending', amount: 3400000, items: 15, date: '2025-06-24' },
  ]);

  const [customers, setCustomers] = useState([
    { id: 'CUST001', name: 'Toko Maju Mandiri', type: 'Retailer', location: 'Jakarta Pusat', monthlyVolume: 45000000, lastOrder: '2025-06-24', status: 'active' },
    { id: 'CUST002', name: 'Supermarket Fresh', type: 'Supermarket', location: 'Bekasi', monthlyVolume: 32000000, lastOrder: '2025-06-23', status: 'active' },
    { id: 'CUST003', name: 'Minimarket 24 Jam', type: 'Convenience Store', location: 'Depok', monthlyVolume: 18500000, lastOrder: '2025-06-22', status: 'active' },
    { id: 'CUST004', name: 'Warung Berkah', type: 'Traditional Store', location: 'Tangerang', monthlyVolume: 8200000, lastOrder: '2025-06-20', status: 'inactive' },
  ]);

  const [products, setProducts] = useState([
    { id: 'PROD001', name: 'Minyak Goreng Premium 2L', category: 'Makanan', stock: 450, price: 32000, demand: 'high' },
    { id: 'PROD002', name: 'Beras Premium 5kg', category: 'Makanan', stock: 280, price: 68000, demand: 'high' },
    { id: 'PROD003', name: 'Sabun Mandi Cair 500ml', category: 'Kebersihan', stock: 320, price: 15000, demand: 'medium' },
    { id: 'PROD004', name: 'Deterjen Bubuk 1kg', category: 'Kebersihan', stock: 150, price: 22000, demand: 'medium' },
  ]);

  const [territories, setTerritories] = useState([
    { id: 'TER001', name: 'Jakarta & Sekitarnya', customers: 42, revenue: 485000000, coverage: 'Jakarta, Bekasi, Depok, Tangerang' },
    { id: 'TER002', name: 'Jawa Barat Utara', customers: 28, revenue: 320000000, coverage: 'Karawang, Purwakarta, Subang' },
    { id: 'TER003', name: 'Jawa Barat Selatan', customers: 35, revenue: 410000000, coverage: 'Bogor, Sukabumi, Cianjur' },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      case 'shipped': return <Truck className="w-4 h-4" />;
      case 'processing': return <Activity className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const getDemandColor = (demand) => {
    switch (demand) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Building2 className="w-8 h-8 text-indigo-600" />
                <h1 className="text-2xl font-bold text-gray-900">DistribuPro</h1>
                <Badge variant="outline" className="text-indigo-600 border-indigo-200">
                  Distributor Dashboard
                </Badge>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input placeholder="Cari pesanan, pelanggan..." className="pl-10 w-64" />
              </div>
              <Button variant="outline" size="sm" className="relative">
                <Bell className="w-4 h-4" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-100 text-sm font-medium">Total Pesanan</p>
                  <p className="text-3xl font-bold">2,847</p>
                  <p className="text-indigo-100 text-sm">+18% dari bulan lalu</p>
                </div>
                <ShoppingCart className="w-12 h-12 text-indigo-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Pendapatan Bulan Ini</p>
                  <p className="text-3xl font-bold">1.2M</p>
                  <p className="text-green-100 text-sm">+24% growth</p>
                </div>
                <DollarSign className="w-12 h-12 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Pelanggan Aktif</p>
                  <p className="text-3xl font-bold">105</p>
                  <p className="text-blue-100 text-sm">92% retention rate</p>
                </div>
                <Users className="w-12 h-12 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Area Distribusi</p>
                  <p className="text-3xl font-bold">3</p>
                  <p className="text-purple-100 text-sm">Jawa Barat & Jakarta</p>
                </div>
                <MapPin className="w-12 h-12 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Pesanan</TabsTrigger>
            <TabsTrigger value="customers">Pelanggan</TabsTrigger>
            <TabsTrigger value="products">Produk</TabsTrigger>
            <TabsTrigger value="territories">Wilayah</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>Tren Penjualan</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg border-2 border-dashed border-indigo-200">
                    <div className="text-center">
                      <BarChart3 className="w-16 h-16 text-indigo-400 mx-auto mb-2" />
                      <p className="text-indigo-600 font-medium">Grafik Tren Penjualan</p>
                      <p className="text-sm text-gray-500">Chart.js integration</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5" />
                    <span>Peta Distribusi</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border-2 border-dashed border-green-200">
                    <div className="text-center">
                      <MapPin className="w-16 h-16 text-green-400 mx-auto mb-2" />
                      <p className="text-green-600 font-medium">Peta Area Distribusi</p>
                      <p className="text-sm text-gray-500">Google Maps API integration</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">94.5%</div>
                  <p className="text-gray-600">Order Fulfillment Rate</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">2.3 Hari</div>
                  <p className="text-gray-600">Rata-rata Waktu Pengiriman</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">98.2%</div>
                  <p className="text-gray-600">Customer Satisfaction</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Manajemen Pesanan</h2>
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                <Plus className="w-4 h-4 mr-2" />
                Pesanan Baru
              </Button>
            </div>

            <div className="grid gap-4">
              {orders.map((order) => (
                <Card key={order.id} className="hover:shadow-lg transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(order.status)}
                          <div>
                            <p className="font-semibold text-lg">{order.id}</p>
                            <p className="text-sm text-gray-600">{order.customer}</p>
                            <p className="text-xs text-gray-500">{order.location}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-lg">{formatCurrency(order.amount)}</p>
                          <p className="text-sm text-gray-600">{order.items} items</p>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">{order.date}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="customers" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Manajemen Pelanggan</h2>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Tambah Pelanggan
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {customers.map((customer) => (
                <Card key={customer.id} className="hover:shadow-lg transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {customer.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-lg">{customer.name}</p>
                          <p className="text-sm text-gray-600">{customer.type}</p>
                          <p className="text-xs text-gray-500">{customer.location}</p>
                        </div>
                      </div>
                      <Badge className={customer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {customer.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Volume Bulanan:</span>
                        <span className="font-semibold">{formatCurrency(customer.monthlyVolume)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Last Order:</span>
                        <span className="font-semibold">{customer.lastOrder}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Manajemen Produk</h2>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Tambah Produk
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                        <Package className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.category}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Harga:</span>
                        <span className="font-semibold">{formatCurrency(product.price)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Stok:</span>
                        <span className="font-semibold">{product.stock} unit</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Demand:</span>
                        <Badge className={getDemandColor(product.demand)}>
                          {product.demand}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="territories" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Manajemen Wilayah Distribusi</h2>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                Tambah Wilayah
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {territories.map((territory) => (
                <Card key={territory.id} className="hover:shadow-lg transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-lg">{territory.name}</p>
                        <p className="text-sm text-gray-600">{territory.customers} pelanggan</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Revenue:</p>
                        <p className="font-semibold text-xl text-green-600">{formatCurrency(territory.revenue)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Coverage Area:</p>
                        <p className="text-sm">{territory.coverage}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DistributorDashboard;