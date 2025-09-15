import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Input } from '@/components/ui/input'
import Navbar from '@/components/modules/auth/Navbar'
import DefaultLayout from '@/components/layouts/DefaultLayout'

const Otp = () => {
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const validatePhoneNumber = (phone) => {
        const cleanedPhone = phone.replace(/[\s-]/g, '');
        const phoneRegex = /^(?:\+62|62|0)8[1-9][0-9]{7,10}$/;
        return phoneRegex.test(cleanedPhone);
    };

    const formatPhoneNumber = (value) => {
        const digits = value.replace(/\D/g, '');
        
        if (digits.length <= 4) return digits;
        if (digits.length <= 8) return `${digits.slice(0, 4)}-${digits.slice(4)}`;
        if (digits.length <= 12) return `${digits.slice(0, 4)}-${digits.slice(4, 8)}-${digits.slice(8)}`;
        return `${digits.slice(0, 4)}-${digits.slice(4, 8)}-${digits.slice(8, 12)}`;
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        const formatted = formatPhoneNumber(value);
        setPhoneNumber(formatted);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!phoneNumber.trim()) {
            setError('Nomor telepon wajib diisi');
            return;
        }

        if (!validatePhoneNumber(phoneNumber)) {
            setError('Format nomor telepon tidak valid');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            navigate("/signup/verify-otp");
        } catch (err) {
            setError('Terjadi kesalahan. Silakan coba lagi.');
        } finally {
            setIsLoading(false);
        }
    };

    const isFormValid = phoneNumber.trim() && validatePhoneNumber(phoneNumber);

    return (
        <DefaultLayout>
            <div className="bg-gray-100 w-full min-h-screen">
                <Navbar />
                <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-5 mt-5">
                    <div className="w-full max-w-lg">
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                    Mulai Keanggotaan Anda
                                </h1>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Daftarkan nomor handphone untuk verifikasi cepat dan akses langsung ke sistem distribusi kami
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                        Nomor Telepon
                                    </label>
                                    <div className="relative">
                                        <Input 
                                            id="phone"
                                            type="tel"
                                            value={phoneNumber}
                                            onChange={handlePhoneChange}
                                            placeholder="8xxx-xxxx-xxxx"
                                            className={`h-12 text-base border-2 rounded-lg transition-all duration-200 ${
                                                error 
                                                    ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                                                    : 'border-gray-200 focus:border-green-500 focus:ring-green-200'
                                            } focus:ring-2 focus:outline-none`}
                                            disabled={isLoading}
                                        />
                                        {phoneNumber && validatePhoneNumber(phoneNumber) && (
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    {error && (
                                        <p className="mt-2 text-sm text-red-600 flex items-center">
                                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {error}
                                        </p>
                                    )}
                                    <p className="mt-2 text-xs text-gray-500">
                                        Contoh: 08123456789 atau +628123456789
                                    </p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={!isFormValid || isLoading}
                                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:hover:scale-100 shadow-lg hover:shadow-xl disabled:shadow-none flex items-center justify-center cursor-pointer"
                                >
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Memproses...
                                        </>
                                    ) : (
                                        <>
                                            Kirim Kode Verifikasi
                                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </>
                                    )}
                                </button>
                            </form>

                            <div className="mt-6 pt-6 border-t border-gray-100">
                                <p className="text-xs text-gray-500 text-center">
                                    Sudah punya akun? 
                                    <a href="/login" className="text-green-600 hover:text-green-700 font-medium ml-1">
                                        Masuk di sini
                                    </a>
                                </p>
                                <p className="text-xs text-gray-400 text-center mt-2">
                                    Dengan mendaftar, Anda menyetujui 
                                    <a href="/terms" className="text-green-600 hover:text-green-700 font-medium mx-1">
                                        Syarat & Ketentuan
                                    </a> 
                                    dan 
                                    <a href="/privacy" className="text-green-600 hover:text-green-700 font-medium ml-1">
                                        Kebijakan Privasi
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    )
}

export default Otp