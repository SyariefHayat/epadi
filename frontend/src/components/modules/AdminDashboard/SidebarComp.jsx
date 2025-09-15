import React from 'react'
import { 
    BarChart3, 
    LogOut, 
    Package, 
    Settings, 
    Truck, 
    Users 
} from 'lucide-react'

const SidebarComp = ({ activeTab, setActiveTab, onLogout }) => {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
        { id: 'users', label: 'Kelola User', icon: Users },
        { id: 'products', label: 'Produk', icon: Package },
        { id: 'distribution', label: 'Distribusi', icon: Truck },
        { id: 'settings', label: 'Pengaturan', icon: Settings },
    ]

    const handleMenuClick = (itemId) => {
        if (itemId === 'logout') {
            onLogout?.()
        } else {
            setActiveTab(itemId)
        }
    }

    return (
        <div className="w-64 bg-white shadow-lg border-r border-gray-200 h-screen flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-600 p-2 rounded-lg">
                        <Package className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Rantai Pasok</h1>
                        <p className="text-sm text-gray-500">Admin Panel</p>
                    </div>
                </div>
            </div>
            
            {/* Navigation Menu */}
            <nav className="p-4 flex-1">
                <div className="space-y-1">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleMenuClick(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                                activeTab === item.id 
                                ? 'bg-blue-50 text-blue-700 font-medium shadow-sm border border-blue-100' 
                                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                        >
                            <item.icon className="h-5 w-5" />
                            <span>{item.label}</span>
                        </button>
                    ))}
                </div>
            </nav>

            {/* Logout Button */}
            <div className="p-4 border-t border-gray-100">
                <button
                    onClick={() => handleMenuClick('logout')}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                    <LogOut className="h-5 w-5" />
                    <span>Keluar</span>
                </button>
            </div>
        </div>
    )
}

export default SidebarComp