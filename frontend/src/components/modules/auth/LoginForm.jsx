import { z } from "zod"
import { toast } from "sonner"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, LogIn } from 'lucide-react'
import { zodResolver } from "@hookform/resolvers/zod"

import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { apiInstanceExpress } from "@/service/apiInstance"

const userSigninSchema = z.object({
    NIK: z.string()
        .length(16, { message: "NIK harus 16 digit" })
        .regex(/^[0-9]+$/, { message: "NIK hanya boleh berisi angka" }),
    password: z.string()
        .min(8, { message: "Password minimal 8 karakter" })
        .regex(/[A-Z]/, { message: "Password harus mengandung setidaknya satu huruf besar" })
        .regex(/[a-z]/, { message: "Password harus mengandung setidaknya satu huruf kecil" })
        .regex(/[0-9]/, { message: "Password harus mengandung setidaknya satu angka" }),
});

const LoginForm = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    
    const navigate = useNavigate()

    const form = useForm({
        resolver: zodResolver(userSigninSchema),
        defaultValues: {
        NIK: "",
        password: "",
        }
    });

    const handleSignin = async (data) => {
        setIsLoading(true);

        try {
            const response = await apiInstanceExpress.post("/sign-in", data);
            if (response.status === 200) {
                toast.success("Login berhasil!");

                setTimeout(() => {
                    navigate(`/dashboard/${response.data.data.role}`);
                }, 2000)
            }
        } catch (error) {
            toast.error(`Login gagal. ${error.response.data.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <LogIn className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Login ke Akun Anda
                </h1>
                <p className="text-gray-600 text-sm leading-relaxed">
                Masukkan NIK dan password Anda untuk mengakses akun dan mulai berbelanja.
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSignin)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="NIK"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium text-gray-700">
                                NIK
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="Masukkan NIK 16 digit"
                                        maxLength={16}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex items-center justify-between mb-1">
                                    <FormLabel className="text-sm font-medium text-gray-700">
                                        Password
                                    </FormLabel>
                                    <a
                                        href="/forgot-password"
                                        className="text-sm text-green-600 hover:text-green-700 hover:underline transition-colors duration-200"
                                    >
                                        Lupa password?
                                    </a>
                                </div>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            {...field}
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Masukkan password"
                                            className="w-full px-3 py-2 pr-10 border border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
                                        />
                                        <button
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                            tabIndex={-1}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="w-5 h-5" />
                                            ) : (
                                                <Eye className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="space-y-3">
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:hover:scale-100 shadow-lg hover:shadow-xl disabled:shadow-none flex items-center justify-center cursor-pointer"
                        >
                            {isLoading ? (
                                <>
                                    <svg 
                                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        fill="none" 
                                        viewBox="0 0 24 24"
                                    >
                                        <circle 
                                            className="opacity-25" 
                                            cx="12" 
                                            cy="12" 
                                            r="10" 
                                            stroke="currentColor" 
                                            strokeWidth="4"
                                        />
                                        <path 
                                            className="opacity-75" 
                                            fill="currentColor" 
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                    Masuk...
                                </>
                            ) : (
                                <>
                                    <LogIn className="w-5 h-5 mr-2" />
                                    Masuk
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </Form>

            <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-600 text-center">
                    Belum memiliki akun?{" "}
                    <a 
                        href="/signup" 
                        className="text-green-600 hover:text-green-700 font-medium hover:underline transition-colors duration-200"
                    >
                        Daftar sekarang
                    </a>
                </p>
            </div>
        </div>
    )
}

export default LoginForm