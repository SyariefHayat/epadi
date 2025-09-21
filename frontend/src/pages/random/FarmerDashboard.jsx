import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Package, 
  ShoppingCart, 
  DollarSign, 
  Bell, 
  MessageSquare,
  Cloud,
  Thermometer,
  Droplets,
  Plus,
  Eye,
  Send,
  Calendar,
  Users,
  Star,
  AlertTriangle
} from 'lucide-react';

const FarmerDashboard = () => {
  const [stats, setStats] = useState({
    totalSales: 156750000,
    cornStock: 2500,
    activeOrders: 12,
    monthlyRevenue: 89500000
  });

  const [recentActivities] = useState([
    { id: 1, type: 'order', message: 'Pesanan baru 500kg Padi pipilan dari PT Charoen', time: '5 menit lalu', status: 'new' },
    { id: 2, type: 'payment', message: 'Pembayaran Rp 12.5jt diterima dari CV Makmur Jaya', time: '1 jam lalu', status: 'completed' },
    { id: 3, type: 'shipment', message: 'Pengiriman 300kg ke Surabaya telah sampai', time: '3 jam lalu', status: 'delivered' },
    { id: 4, type: 'inquiry', message: 'Inquiry harga untuk 1 ton Padi pakan dari Bali', time: '5 jam lalu', status: 'pending' }
  ]);

  const [weatherData] = useState({
    temperature: 32,
    humidity: 75,
    condition: 'Cerah Berawan',
    forecast: 'Hujan ringan sore hari'
  });

  const [marketPrices] = useState([
    { variety: 'Padi Pipilan Kering', price: 4200, change: +150, region: 'Jawa Timur' },
    { variety: 'Padi Pakan Ternak', price: 3800, change: -50, region: 'Lampung' },
    { variety: 'Padi Konsumsi', price: 4500, change: +200, region: 'Jawa Tengah' }
  ]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const StatCard = ({ title, value, icon: Icon, color, subtitle }) => (
    <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-lg ${color.replace('text-', 'bg-').replace('-600', '-100')}`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
      </div>
    </div>
  );

  const ActivityItem = ({ activity }) => {
    const getStatusColor = (status) => {
      switch(status) {
        case 'new': return 'bg-blue-100 text-blue-800';
        case 'completed': return 'bg-green-100 text-green-800';
        case 'delivered': return 'bg-purple-100 text-purple-800';
        case 'pending': return 'bg-yellow-100 text-yellow-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    return (
      <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
        <div className={`w-2 h-2 rounded-full mt-2 ${activity.status === 'new' ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
        <div className="flex-1">
          <p className="text-sm text-gray-900">{activity.message}</p>
          <p className="text-xs text-gray-500">{activity.time}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
          {activity.status}
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Petani Padi</h1>
              <p className="text-gray-600">Selamat datang kembali, Pak Budi Santoso</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <MessageSquare className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total Penjualan"
            value={formatCurrency(stats.totalSales)}
            icon={TrendingUp}
            color="text-green-600"
            subtitle="↗ +12% dari bulan lalu"
          />
          <StatCard 
            title="Stok Padi"
            value={`${stats.cornStock.toLocaleString()} kg`}
            icon={Package}
            color="text-blue-600"
            subtitle="Tersedia 5 varietas"
          />
          <StatCard 
            title="Pesanan Aktif"
            value={stats.activeOrders}
            icon={ShoppingCart}
            color="text-purple-600"
            subtitle="3 menunggu konfirmasi"
          />
          <StatCard 
            title="Pendapatan Bulan Ini"
            value={formatCurrency(stats.monthlyRevenue)}
            icon={DollarSign}
            color="text-orange-600"
            subtitle="Target: 100jt"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Aksi Cepat</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 text-left border rounded-lg hover:bg-green-50 hover:border-green-200 transition-colors">
                <div className="flex items-center space-x-3">
                  <Plus className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Tambah Produk Padi</span>
                </div>
              </button>
              <button className="w-full flex items-center justify-between p-3 text-left border rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors">
                <div className="flex items-center space-x-3">
                  <Eye className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">Lihat Pesanan Baru</span>
                </div>
                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">3</span>
              </button>
              <button className="w-full flex items-center justify-between p-3 text-left border rounded-lg hover:bg-purple-50 hover:border-purple-200 transition-colors">
                <div className="flex items-center space-x-3">
                  <Send className="w-5 h-5 text-purple-600" />
                  <span className="font-medium">Kirim Penawaran</span>
                </div>
              </button>
              <button className="w-full flex items-center justify-between p-3 text-left border rounded-lg hover:bg-orange-50 hover:border-orange-200 transition-colors">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-orange-600" />
                  <span className="font-medium">Jadwal Panen</span>
                </div>
              </button>
            </div>
          </div>

          {/* Weather Widget */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-sm text-white p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Cuaca Hari Ini</h3>
              <Cloud className="w-6 h-6" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Thermometer className="w-5 h-5" />
                  <span>Suhu</span>
                </div>
                <span className="text-2xl font-bold">{weatherData.temperature}°C</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Droplets className="w-5 h-5" />
                  <span>Kelembaban</span>
                </div>
                <span className="font-semibold">{weatherData.humidity}%</span>
              </div>
              <div className="pt-2 border-t border-blue-400">
                <p className="text-sm opacity-90">{weatherData.condition}</p>
                <p className="text-xs opacity-75 mt-1">{weatherData.forecast}</p>
              </div>
            </div>
          </div>

          {/* Market Prices */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Harga Pasar Terkini</h3>
            <div className="space-y-3">
              {marketPrices.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{item.variety}</p>
                    <p className="text-xs text-gray-500">{item.region}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">Rp {item.price.toLocaleString()}</p>
                    <p className={`text-xs ${item.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {item.change > 0 ? '+' : ''}{item.change}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Aktivitas Terbaru</h3>
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              Lihat Semua
            </button>
          </div>
          <div className="space-y-1">
            {recentActivities.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performa Penjualan</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Target Bulanan</span>
                <span className="font-semibold">89.5jt / 100jt</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{width: '89.5%'}}></div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">15</p>
                  <p className="text-sm text-gray-600">Hari Tersisa</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">89.5%</p>
                  <p className="text-sm text-gray-600">Target Tercapai</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Rating & Feedback</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
                </div>
                <span className="text-lg font-bold">4.8</span>
                <span className="text-gray-600">(127 review)</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Kualitas Produk</span>
                  <span className="font-medium">4.9/5</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Ketepatan Waktu</span>
                  <span className="font-medium">4.7/5</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Komunikasi</span>
                  <span className="font-medium">4.8/5</span>
                </div>
              </div>
              <div className="pt-2 border-t">
                <p className="text-sm text-gray-600 italic">"Padi berkualitas tinggi, selalu tepat waktu pengiriman"</p>
                <p className="text-xs text-gray-500 mt-1">- PT Charoen Pokphand</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;