import React from 'react'

import { 
    Edit, 
    Package, 
    Trash2, 
    Truck 
} from 'lucide-react'

import { Button } from '@/components/ui/button'

const UserCard = ({ user, onEdit, onDelete }) => {
    return (
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:shadow-sm transition-shadow duration-200">
            <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${
                user.role === 'supplier' ? 'bg-blue-50' : 'bg-green-50'
                }`}>
                    {user.role === 'supplier' ? 
                        <Package className="h-5 w-5 text-blue-600" /> :
                        <Truck className="h-5 w-5 text-green-600" />
                    }
                </div>
                <div>
                    <p className="font-semibold text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <div className="flex items-center gap-2 mt-2">
                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                        user.role === 'supplier' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                            {user.role === 'supplier' ? 'Supplier' : 'Distributor'}
                        </span>
                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                        user.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                            {user.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onEdit(user.id)}
                    className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
                >
                    <Edit className="h-4 w-4" />
                </Button>
                <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onDelete(user.id)}
                    className="hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}

export default UserCard