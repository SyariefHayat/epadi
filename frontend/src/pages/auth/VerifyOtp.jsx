import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"

import Navbar from '@/components/modules/auth/Navbar'
import DefaultLayout from '@/components/layouts/DefaultLayout'

const VerifyOtp = () => {
    const [otp, setOtp] = useState("")
    const [timeLeft, setTimeLeft] = useState(60) // 60 seconds
    const [canResend, setCanResend] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate();

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
            return () => clearTimeout(timer)
        } else {
            setCanResend(true)
        }
    }, [timeLeft])

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        
        try {
            if (otp.length === 6) {
                await new Promise(resolve => setTimeout(resolve, 1500));
                // Handle OTP verification logic here
                navigate("/signup/profile-setup")
                console.log("OTP verified successfully:", otp)
            }
        } catch (error) {
            console.error("Error verifying OTP:", error)
            // Handle error (e.g., show notification)
        } finally {
            setIsLoading(false)
        }
    }

    const handleResend = () => {
        setTimeLeft(60)
        setCanResend(false)
        setOtp("")
        // Handle resend OTP logic here
    }

    return (
        <DefaultLayout>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-5 mt-5 bg-gray-100">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
                        <div className="text-center mb-6 sm:mb-8">
                            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                                Verifikasi Kode OTP
                            </h1>
                            <p className="text-gray-600 text-sm leading-relaxed px-2">
                                Kami telah mengirimkan kode verifikasi 6 digit ke nomor handphone Anda. 
                                Masukkan kode untuk melanjutkan.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="flex justify-center px-4 sm:px-0">
                                <InputOTP 
                                    maxLength={6} 
                                    value={otp} 
                                    onChange={setOtp}
                                    className="w-full max-w-sm"
                                >
                                    <InputOTPGroup className="gap-1 sm:gap-2">
                                        <InputOTPSlot 
                                            index={0} 
                                            className="w-10 h-10 sm:w-12 sm:h-12 text-base sm:text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
                                        />
                                        <InputOTPSlot 
                                            index={1} 
                                            className="w-10 h-10 sm:w-12 sm:h-12 text-base sm:text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
                                        />
                                        <InputOTPSlot 
                                            index={2} 
                                            className="w-10 h-10 sm:w-12 sm:h-12 text-base sm:text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
                                        />
                                    </InputOTPGroup>
                                    <InputOTPSeparator className="text-gray-400 mx-1 sm:mx-2" />
                                    <InputOTPGroup className="gap-1 sm:gap-2">
                                        <InputOTPSlot 
                                            index={3} 
                                            className="w-10 h-10 sm:w-12 sm:h-12 text-base sm:text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
                                        />
                                        <InputOTPSlot 
                                            index={4} 
                                            className="w-10 h-10 sm:w-12 sm:h-12 text-base sm:text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
                                        />
                                        <InputOTPSlot 
                                            index={5} 
                                            className="w-10 h-10 sm:w-12 sm:h-12 text-base sm:text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
                                        />
                                    </InputOTPGroup>
                                </InputOTP>
                            </div>

                            <div className="text-center px-4 sm:px-0">
                                <p className="text-sm text-gray-500 mb-2">
                                    Kode akan kedaluwarsa dalam: 
                                    <span className="font-mono font-semibold text-gray-700 ml-1">
                                        {formatTime(timeLeft)}
                                    </span>
                                </p>
                                
                                {canResend ? (
                                    <button
                                        type="button"
                                        onClick={handleResend}
                                        className="text-green-600 hover:text-green-700 text-sm font-medium hover:underline transition-colors duration-200 cursor-pointer"
                                    >
                                        Kirim ulang kode
                                    </button>
                                ) : (
                                    <p className="text-sm text-gray-400">
                                        Belum menerima kode?
                                    </p>
                                )}
                            </div>

                            <div className="px-4 sm:px-0">
                                <button
                                    type="submit"
                                    disabled={otp.length !== 6 || isLoading}
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
                                                {otp.length === 6 ? 'Verifikasi Kode' : `Masukkan ${6 - otp.length} digit lagi`}
                                            </>
                                        )}
                                </button>
                            </div>
                        </form>

                        <div className="mt-6 pt-6 border-t border-gray-100 px-4 sm:px-0">
                            <p className="text-xs text-gray-500 text-center">
                                Dengan melanjutkan, Anda menyetujui 
                                <a href="/terms" className="text-green-600 hover:text-green-700 font-medium ml-1">
                                    Syarat & Ketentuan
                                </a> kami
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    )
}

export default VerifyOtp