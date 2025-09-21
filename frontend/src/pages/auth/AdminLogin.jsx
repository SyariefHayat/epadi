import React from 'react'
import AdminLoginForm from '@/components/modules/auth/AdminLoginForm'

const AdminLogin = () => {
    return (
        <section className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-100">
            <div className="w-full max-w-md">
                <AdminLoginForm />
            </div>
        </section>
    )
}

export default AdminLogin