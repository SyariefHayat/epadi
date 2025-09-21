import React from 'react';

import { Toaster } from '@/components/ui/sonner';
import LoginForm from '@/components/modules/auth/LoginForm';

const Login = () => {
    return (
        <section className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-100">
            <Toaster />
            <div className="w-full max-w-md">
                <LoginForm />
            </div>
        </section>
    )
}

export default Login