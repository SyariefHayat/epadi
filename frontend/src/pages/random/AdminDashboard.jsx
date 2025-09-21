import React, { useState } from 'react'


import { 
    Package, 
    Truck, 
    Settings, 
} from "lucide-react"

import UsersContent from '@/components/modules/AdminDashboard/UsersContent'
import DashboardContent from '@/components/modules/AdminDashboard/DashboardContent'
import PlaceholderContent from '@/components/modules/AdminDashboard/PlaceholderContent'
import SidebarComp from '@/components/modules/AdminDashboard/SidebarComp'

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard')
    const [users, setUsers] = useState([
        { id: 1, name: 'PT Supplier ABC', email: 'supplier@supply.com', role: 'supplier', status: 'active' },
        { id: 2, name: 'CV Distributor XYZ', email: 'distributor@supply.com', role: 'distributor', status: 'active' },
        { id: 3, name: 'PT Supplier DEF', email: 'supplier2@supply.com', role: 'supplier', status: 'inactive' },
    ])

    const handleLogout = () => {
        alert('Logout functionality - redirect to login page')
    }

    const handleAddUser = () => {
        alert('Add User functionality - open form modal')
    }

    const handleEditUser = (userId) => {
        alert(`Edit User ID: ${userId} - open edit form`)
    }

    const handleDeleteUser = (userId) => {
        if (confirm('Apakah Anda yakin ingin menghapus user ini?')) {
            setUsers(users.filter(user => user.id !== userId))
        }
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <DashboardContent />
            case 'users':
                return (
                    <UsersContent 
                        users={users}
                        onAddUser={handleAddUser}
                        onEditUser={handleEditUser}
                        onDeleteUser={handleDeleteUser}
                    />
                )
            case 'products':
                return <PlaceholderContent title="Produk" description="Manajemen produk dalam sistem" icon={Package} />
            case 'distribution':
                return <PlaceholderContent title="Distribusi" description="Monitoring dan manajemen distribusi" icon={Truck} />
            case 'settings':
                return <PlaceholderContent title="Pengaturan" description="Konfigurasi sistem dan preferensi" icon={Settings} />
            default:
                return <DashboardContent />
        }
    }

    return (
        <div className="flex h-screen bg-gray-50">
            <SidebarComp
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
                onLogout={handleLogout} 
            />

            <div className="flex-1 overflow-auto">
                <div className="p-8">
                    {renderContent()}
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard