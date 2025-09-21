import React, { useState } from 'react'
import { Camera, Edit, MapPin, Phone, Mail, Calendar, User, Settings, Heart, ShoppingBag, CreditCard, Bell, Shield, LogOut, Eye, EyeOff } from 'lucide-react'

import Navbar from '@/components/modules/mart/Navbar'
import MartLayout from '@/components/layouts/MartLayout'

const Profile = () => {
    const [activeTab, setActiveTab] = useState('profile')
    const [isEditing, setIsEditing] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [profileData, setProfileData] = useState({
        name: 'Ahmad Rizki',
        email: 'ahmad.rizki@example.com',
        phone: '+62 812-3456-7890',
        address: 'Jl. Merdeka No. 123, Gresik, Jawa Timur',
        birthDate: '1990-05-15',
        gender: 'Laki-laki',
        joinDate: '2023-01-15'
    })

    const handleInputChange = (field, value) => {
        setProfileData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleSave = () => {
        setIsEditing(false)
        console.log('Saving profile data:', profileData)
    }

    const menuItems = [
        { id: 'profile', label: 'Profil Saya', icon: User },
        { id: 'orders', label: 'Pesanan Saya', icon: ShoppingBag },
        { id: 'wishlist', label: 'Wishlist', icon: Heart },
        { id: 'payment', label: 'Metode Pembayaran', icon: CreditCard },
        { id: 'notifications', label: 'Notifikasi', icon: Bell },
        { id: 'security', label: 'Keamanan', icon: Shield },
        { id: 'settings', label: 'Pengaturan', icon: Settings }
    ]

    const orderHistory = [
        { id: 1, date: '2024-12-01', status: 'Selesai', total: 'Rp 150.000', items: 3 },
        { id: 2, date: '2024-11-28', status: 'Dalam Pengiriman', total: 'Rp 89.000', items: 2 },
        { id: 3, date: '2024-11-25', status: 'Selesai', total: 'Rp 235.000', items: 5 }
    ]

    const wishlistItems = [
        { id: 1, name: 'Smartphone Samsung Galaxy', price: 'Rp 3.500.000', image: '/api/placeholder/80/80' },
        { id: 2, name: 'Laptop ASUS VivoBook', price: 'Rp 7.200.000', image: '/api/placeholder/80/80' },
        { id: 3, name: 'Headphone Sony WH-1000XM4', price: 'Rp 4.500.000', image: '/api/placeholder/80/80' }
    ]

    const renderProfileTab = () => (
        <div className="bg-white border border-gray-300">
            {/* Profile Header */}
            <div className="bg-gray-100 p-6 border-b border-gray-300">
                <div className="flex items-center gap-6">
                    <div className="relative">
                        <div className="w-24 h-24 border-2 border-gray-300 bg-gray-50">
                            <img 
                                src="https://github.com/shadcn.png" 
                                alt="Profile" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <button className="absolute bottom-0 right-0 bg-white border border-gray-400 p-1">
                            <Camera className="w-3 h-3 text-gray-600" />
                        </button>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-1">{profileData.name}</h2>
                        <p className="text-gray-600 text-sm mb-1">
                            <Mail className="w-3 h-3 inline mr-1" />
                            {profileData.email}
                        </p>
                        <p className="text-gray-600 text-sm">
                            <Calendar className="w-3 h-3 inline mr-1" />
                            Bergabung sejak {new Date(profileData.joinDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'long' })}
                        </p>
                    </div>
                </div>
            </div>

            {/* Profile Form */}
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-800">Informasi Pribadi</h3>
                    <button
                        onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-400 bg-white text-gray-700 hover:bg-gray-50"
                    >
                        <Edit className="w-4 h-4" />
                        {isEditing ? 'Simpan' : 'Edit'}
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                            <input
                                type="text"
                                value={profileData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                disabled={!isEditing}
                                className="w-full px-3 py-2 border border-gray-300 bg-white disabled:bg-gray-100 disabled:text-gray-600 focus:outline-none focus:border-gray-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                value={profileData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                disabled={!isEditing}
                                className="w-full px-3 py-2 border border-gray-300 bg-white disabled:bg-gray-100 disabled:text-gray-600 focus:outline-none focus:border-gray-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon</label>
                            <input
                                type="tel"
                                value={profileData.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                disabled={!isEditing}
                                className="w-full px-3 py-2 border border-gray-300 bg-white disabled:bg-gray-100 disabled:text-gray-600 focus:outline-none focus:border-gray-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Lahir</label>
                            <input
                                type="date"
                                value={profileData.birthDate}
                                onChange={(e) => handleInputChange('birthDate', e.target.value)}
                                disabled={!isEditing}
                                className="w-full px-3 py-2 border border-gray-300 bg-white disabled:bg-gray-100 disabled:text-gray-600 focus:outline-none focus:border-gray-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Kelamin</label>
                            <select
                                value={profileData.gender}
                                onChange={(e) => handleInputChange('gender', e.target.value)}
                                disabled={!isEditing}
                                className="w-full px-3 py-2 border border-gray-300 bg-white disabled:bg-gray-100 disabled:text-gray-600 focus:outline-none focus:border-gray-500"
                            >
                                <option value="Laki-laki">Laki-laki</option>
                                <option value="Perempuan">Perempuan</option>
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
                            <textarea
                                value={profileData.address}
                                onChange={(e) => handleInputChange('address', e.target.value)}
                                disabled={!isEditing}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 bg-white disabled:bg-gray-100 disabled:text-gray-600 focus:outline-none focus:border-gray-500 resize-none"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    const renderOrdersTab = () => (
        <div className="bg-white border border-gray-300">
            <div className="p-4 border-b border-gray-300 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-800">Riwayat Pesanan</h3>
            </div>
            <div className="p-4">
                <div className="space-y-3">
                    {orderHistory.map((order) => (
                        <div key={order.id} className="border border-gray-200 p-4">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <p className="font-medium text-gray-800">Order #{order.id}</p>
                                    <p className="text-sm text-gray-600">{new Date(order.date).toLocaleDateString('id-ID')}</p>
                                </div>
                                <span className={`px-2 py-1 text-xs border ${
                                    order.status === 'Selesai' ? 'bg-green-50 text-green-700 border-green-200' :
                                    order.status === 'Dalam Pengiriman' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                    'bg-yellow-50 text-yellow-700 border-yellow-200'
                                }`}>
                                    {order.status}
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">{order.items} item</span>
                                <span className="font-semibold text-gray-800">{order.total}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

    const renderWishlistTab = () => (
        <div className="bg-white border border-gray-300">
            <div className="p-4 border-b border-gray-300 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-800">Wishlist Saya</h3>
            </div>
            <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {wishlistItems.map((item) => (
                        <div key={item.id} className="border border-gray-200 p-3">
                            <img src={item.image} alt={item.name} className="w-full h-24 object-cover mb-3 border border-gray-200" />
                            <h4 className="font-medium text-gray-800 mb-2 text-sm">{item.name}</h4>
                            <p className="text-gray-700 font-semibold mb-3 text-sm">{item.price}</p>
                            <button className="w-full bg-gray-800 text-white py-2 text-sm hover:bg-gray-700">
                                Tambah ke Keranjang
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

    const renderSecurityTab = () => (
        <div className="bg-white border border-gray-300">
            <div className="p-4 border-b border-gray-300 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-800">Keamanan Akun</h3>
            </div>
            <div className="p-4">
                <div>
                    <h4 className="font-medium text-gray-800 mb-4">Ubah Password</h4>
                    <div className="space-y-4 max-w-md">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password Lama</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-gray-500 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password Baru</label>
                            <input
                                type="password"
                                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-gray-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password Baru</label>
                            <input
                                type="password"
                                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-gray-500"
                            />
                        </div>
                        <button className="bg-gray-800 text-white px-6 py-2 hover:bg-gray-700">
                            Update Password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

    const renderTabContent = () => {
        switch (activeTab) {
            case 'profile':
                return renderProfileTab()
            case 'orders':
                return renderOrdersTab()
            case 'wishlist':
                return renderWishlistTab()
            case 'security':
                return renderSecurityTab()
            default:
                return (
                    <div className="bg-white border border-gray-300 p-8 text-center">
                        <p className="text-gray-600">Fitur ini akan segera hadir.</p>
                    </div>
                )
        }
    }

    return (
        <MartLayout>
            <div className="min-h-screen bg-white py-6">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Sidebar */}
                    <div className="lg:w-64">
                        <div className="bg-white border border-gray-300">
                            <div className="p-4 border-b border-gray-300 bg-gray-50">
                                <div className="flex items-center gap-3">
                                    <img 
                                        src="https://github.com/shadcn.png" 
                                        alt="Profile" 
                                        className="w-12 h-12 border border-gray-300 object-cover"
                                    />
                                    <div>
                                        <h3 className="font-semibold text-gray-800 text-sm">{profileData.name}</h3>
                                        <p className="text-xs text-gray-600">Member</p>
                                    </div>
                                </div>
                            </div>
                            
                            <nav className="p-2">
                                {menuItems.map((item) => {
                                    const Icon = item.icon
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => setActiveTab(item.id)}
                                            className={`w-full flex items-center gap-3 px-3 py-2 text-left text-sm ${
                                                activeTab === item.id
                                                    ? 'bg-gray-100 text-gray-800 border-l-2 border-gray-800'
                                                    : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                        >
                                            <Icon className="w-4 h-4" />
                                            <span>{item.label}</span>
                                        </button>
                                    )
                                })}
                            </nav>
                            <div className="p-2 border-t border-gray-300">
                                <button className="w-full flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 text-sm">
                                    <LogOut className="w-4 h-4" />
                                    <span>Keluar</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    {/* Main Content */}
                    <div className="flex-1">
                        {renderTabContent()}
                    </div>
                </div>
            </div>
        </MartLayout>
    )
}

export default Profile