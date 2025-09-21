import React from 'react'
import { Plus } from 'lucide-react'

import UserCard from './UserCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const UsersContent = ({ users, onAddUser, onEditUser, onDeleteUser }) => {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Kelola User</h2>
                    <p className="text-gray-600">Manajemen user supplier dan distributor</p>
                </div>
                <Button 
                    onClick={onAddUser} 
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 shadow-sm"
                >
                    <Plus className="h-4 w-4" />
                    Tambah User
                </Button>
            </div>

            <Card>
                <CardContent className="p-6">
                    <div className="space-y-4">
                        {users.map((user) => (
                            <UserCard 
                                key={user.id}
                                user={user}
                                onEdit={onEditUser}
                                onDelete={onDeleteUser}
                            />
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default UsersContent