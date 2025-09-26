import z from 'zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { EyeOff, Eye } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';

import { 
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';
import { LIST_ROLE } from '@/constants/listRole';
import Navbar from '@/components/modules/auth/Navbar';
import { apiInstanceExpress } from '@/services/apiInstance';
import DefaultLayout from '@/components/layouts/DefaultLayout';

const SignupSchema = z.object({
    fullName: z.string()
        .min(1, { message: "Nama lengkap harus diisi" }),
    NIK: z.string()
        .length(16, { message: "NIK harus 16 digit" })
        .regex(/^[0-9]+$/, { message: "NIK hanya boleh berisi angka" }),
    password: z.string()
        .min(8, { message: "Password minimal 8 karakter" })
        .regex(/[A-Z]/, { message: "Password harus mengandung setidaknya satu huruf besar" })
        .regex(/[a-z]/, { message: "Password harus mengandung setidaknya satu huruf kecil" }),
    confirmPassword: z.string()
        .min(1, { message: "Konfirmasi password harus diisi" }),
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"], 
    message: "Konfirmasi password tidak cocok",
});

const SignUp = () => {
    const { role } = useParams();
    const navigate = useNavigate();

    const roleData = LIST_ROLE.find((item) => item.id === role)

    useEffect(() => {
        if (!roleData) return navigate("/role");
    }, [roleData]);

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm({
        resolver: zodResolver(SignupSchema),
        defaultValues: {
            fullName: "",
            NIK: "",
            password: "",
            confirmPassword: "",
        }
    });

    const handleSignup = async (data) => {
        setIsLoading(true);

        try {
            const payload = {...data, role };
            const response = await apiInstanceExpress.post("/sign-up", payload);

            if (response.status === 201) {
                toast.success("Pendaftaran berhasil! Silahkan login.");

                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            };
        } catch (error) {
            console.error(error);
            toast.error(`${error.response.data.message || 'Gagal mendaftar. Silahkan coba lagi.'}`);
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => setShowPassword(prev => !prev);

    return (
        <DefaultLayout>
            <Navbar />
            <Toaster />

            <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-5 mt-5 bg-gray-100">
                <div className="w-full max-w-xl">
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                        <div className="text-center mb-8">
                            <div className={`w-16 h-16 ${roleData.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                                <roleData.icon className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">Daftar Sebagai {roleData.title}</h1>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {roleData.signup_desc}
                            </p>
                        </div>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleSignup)} className="space-y-8">
                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="NIK" 
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>NIK</FormLabel>
                                                <FormControl>
                                                    <Input type="text" placeholder="1234567890123456" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="fullName"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel>Nama Lengkap</FormLabel>
                                                <FormControl>
                                                    <Input type="text" placeholder="John Doe" {...field} />
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
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input 
                                                            type={showPassword ? "text" : "password"} {...field} 
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

                                    <FormField
                                        control={form.control}
                                        name="confirmPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Konfirmasi Password</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input
                                                            type={showPassword ? "text" : "password"} {...field} 
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
                                </div>

                                <Button 
                                    type="submit" 
                                    className={`${roleData?.color} hover:${roleData.bgColor} cursor-pointer w-full`}
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Mendaftarkan..." : "Daftar"}
                                </Button>
                            </form>
                        </Form>

                        <div className="mt-6 pt-6 border-t-2 border-gray-100">
                            <p className="text-xs text-gray-500 text-center">
                                Dengan melanjutkan, Anda menyetujui
                                <a href="/terms" className={`${roleData.textColor} hover:${roleData.textHover} font-medium ml-1`}>
                                Syarat & Ketentuan
                                </a> kami
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default SignUp;