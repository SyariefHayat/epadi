import { useNavigate } from 'react-router-dom'
import React, { useState, useCallback } from 'react'

import Navbar from '@/components/modules/auth/Navbar'
import DefaultLayout from '@/components/layouts/DefaultLayout'

const SignUp = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedRole, setSelectedRole] = useState('');

    const roles = [
        {
            id: 'petani',
            title: 'Petani',
            description: 'Saya ingin menjual hasil panen dan bergabung dengan komunitas petani',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ),
            route: '/signup/farmer',
            color: 'bg-green-500',
            borderColor: 'border-green-200',
            focusColor: 'ring-green-500'
        },
        {
            id: 'distributor',
            title: 'Distributor',
            description: 'Saya ingin mendistribusikan produk pertanian ke berbagai wilayah',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            route: '/signup/distributor',
            color: 'bg-blue-500',
            borderColor: 'border-blue-200',
            focusColor: 'ring-blue-500'
        },
        {
            id: 'investor',
            title: 'Investor',
            description: 'Saya ingin berinvestasi dalam sektor pertanian dan agribisnis',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            route: '/signup/investor',
            color: 'bg-purple-500',
            borderColor: 'border-purple-200',
            focusColor: 'ring-purple-500'
        },
        {
            id: 'pembeli',
            title: 'Pembeli',
            description: 'Saya ingin membeli produk pertanian langsung dari petani',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
            ),
            route: '/signup/buyer',
            color: 'bg-orange-500',
            borderColor: 'border-orange-200',
            focusColor: 'ring-orange-500'
        }
    ];

    const handleRoleSelect = useCallback((roleId) => {
        setSelectedRole(roleId);
    }, []);

    const handleContinue = useCallback(async () => {
        if (!selectedRole || isLoading) return;
        
        setIsLoading(true);
        
        try {
            const selectedRoleData = roles.find(role => role.id === selectedRole);
            
            if (selectedRoleData) {
                await new Promise(resolve => setTimeout(resolve, 1500));
                navigate(selectedRoleData.route);
            }
        } catch (error) {
            console.error('Navigation error:', error);
            setIsLoading(false);
        }
    }, [selectedRole, isLoading, navigate]);

    const handleKeyDown = useCallback((event, roleId) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleRoleSelect(roleId);
        }
    }, [handleRoleSelect]);

    return (
        <DefaultLayout>
            <div className="bg-gray-50 w-full min-h-screen">
                <Navbar />
                <main className="min-h-screen flex items-center justify-center px-4 pt-20 pb-8">
                    <div className="w-full max-w-2xl">
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                            <header className="text-center mb-8">
                                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                    </svg>
                                </div>
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                    Pilih Peran Anda
                                </h1>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Bergabunglah dengan ekosistem pertanian digital. Pilih peran yang sesuai dengan kebutuhan Anda
                                </p>
                            </header>

                            <div className="space-y-4 mb-8" role="radiogroup" aria-labelledby="role-selection">
                                <h2 id="role-selection" className="sr-only">Pilih peran Anda</h2>
                                {roles.map((role) => (
                                    <div
                                        key={role.id}
                                        onClick={() => handleRoleSelect(role.id)}
                                        className={`
                                            relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg
                                            ${selectedRole === role.id 
                                                ? `${role.borderColor} ${role.focusColor} ring-2 bg-gray-50` 
                                                : 'border-gray-200 hover:border-gray-300'
                                            }
                                        `}
                                    >
                                        <div className="flex items-start space-x-4">
                                            <div className={`${role.color} text-white p-3 rounded-lg flex-shrink-0`}>
                                                {role.icon}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                    {role.title}
                                                </h3>
                                                <p className="text-gray-600 text-sm leading-relaxed">
                                                    {role.description}
                                                </p>
                                            </div>
                                            <div className="flex-shrink-0">
                                                <div className={`
                                                    w-6 h-6 rounded-full border-2 transition-all duration-200
                                                    ${selectedRole === role.id 
                                                        ? `bg-green-500 border-green-500` 
                                                        : 'border-gray-300'
                                                    }
                                                `}>
                                                    {selectedRole === role.id && (
                                                        <svg className="w-4 h-4 text-white m-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={handleContinue}
                                disabled={!selectedRole || isLoading}
                                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:hover:scale-100 shadow-lg hover:shadow-xl disabled:shadow-none flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 cursor-pointer"
                                aria-describedby={!selectedRole ? "button-help" : undefined}
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>Memproses...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Lanjutkan</span>
                                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </>
                                )}
                            </button>
                            
                            {!selectedRole && (
                                <p id="button-help" className="text-xs text-gray-500 text-center mt-2">
                                    Silakan pilih peran terlebih dahulu
                                </p>
                            )}

                            <footer className="mt-6 pt-6 border-t border-gray-100">
                                <p className="text-xs text-gray-500 text-center">
                                    Sudah punya akun? 
                                    <a 
                                        href="/login" 
                                        className="text-green-600 hover:text-green-700 font-medium ml-1 focus:outline-none focus:underline"
                                    >
                                        Masuk di sini
                                    </a>
                                </p>
                                <p className="text-xs text-gray-400 text-center mt-2">
                                    Dengan mendaftar, Anda menyetujui 
                                    <a 
                                        href="/terms" 
                                        className="text-green-600 hover:text-green-700 font-medium mx-1 focus:outline-none focus:underline"
                                    >
                                        Syarat & Ketentuan
                                    </a> 
                                    dan 
                                    <a 
                                        href="/privacy" 
                                        className="text-green-600 hover:text-green-700 font-medium ml-1 focus:outline-none focus:underline"
                                    >
                                        Kebijakan Privasi
                                    </a>
                                </p>
                            </footer>
                        </div>
                    </div>
                </main>
            </div>
        </DefaultLayout>
    )
}

export default SignUp