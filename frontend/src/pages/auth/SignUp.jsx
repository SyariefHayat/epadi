import { useNavigate } from 'react-router-dom'
import React, { useState, useCallback } from 'react'

import EachUtils from '@/utils/EachUtils'
import { LIST_ROLE } from '@/constants/listRole'
import Navbar from '@/components/modules/auth/Navbar'
import DefaultLayout from '@/components/layouts/DefaultLayout'

const SignUp = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedRole, setSelectedRole] = useState('');

    const handleRoleSelect = useCallback((roleId) => {
        setSelectedRole(roleId);
    }, []);

    const handleContinue = useCallback(async () => {
        if (!selectedRole || isLoading) return;
        
        setIsLoading(true);
        
        try {
            const selectedRoleData = LIST_ROLE.find(role => role.id === selectedRole);
            
            if (selectedRoleData) {
                setTimeout(() => {
                    navigate(selectedRoleData.route);
                }, 1500);
            }
        } catch (error) {
            console.error('Navigation error:', error);
            setIsLoading(false);
        }
    }, [selectedRole, isLoading, navigate]);

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
                                <EachUtils 
                                    of={LIST_ROLE}
                                    render={(item, index) => (
                                        <div
                                            key={index}
                                            onClick={() => handleRoleSelect(item.id)}
                                            className={`
                                                relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg
                                                ${selectedRole === item.id 
                                                    ? `${item.borderColor} ${item.focusColor} ring-2 bg-gray-50` 
                                                    : 'border-gray-200 hover:border-gray-300'
                                                }
                                            `}
                                        >
                                            <div className="flex items-start space-x-4">
                                                <div className={`${item.color} text-white p-3 rounded-lg flex-shrink-0`}>
                                                    <item.icon/>
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                        {item.title}
                                                    </h3>
                                                    <p className="text-gray-600 text-sm leading-relaxed">
                                                        {item.description}
                                                    </p>
                                                </div>
                                                <div className="flex-shrink-0">
                                                    <div className={`
                                                        w-6 h-6 rounded-full border-2 transition-all duration-200
                                                        ${selectedRole === item.id 
                                                            ? `bg-green-500 border-green-500` 
                                                            : 'border-gray-300'
                                                        }
                                                    `}>
                                                        {selectedRole === item.id && (
                                                            <svg className="w-4 h-4 text-white m-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                />
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