import z from 'zod';
import { toast } from 'sonner';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { User, Tractor } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

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
import Navbar from '@/components/modules/auth/Navbar';
import { apiInstanceExpress } from '@/service/apiInstance';
import DefaultLayout from '@/components/layouts/DefaultLayout';

const UserSignupSchema = z.object({
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

const UserRegistrationForm = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const pathname = window.location.pathname;
    const segments = pathname.split("/"); 
    const role = segments[segments.length - 1];

    const form = useForm({
        resolver: zodResolver(UserSignupSchema),
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
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <DefaultLayout>
            <Navbar />
            <Toaster />

            <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-5 mt-5 bg-gray-100">
                <div className="w-full max-w-xl">
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Tractor className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">Daftar Sebagai Petani</h1>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Bergabunglah dengan komunitas petani digital dan akses berbagai layanan untuk mengembangkan usaha tani Anda.
                            </p>
                        </div>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleSignup)} className="space-y-8">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                        <User className="w-5 h-5 mr-2 text-green-600" />
                                        Akun
                                    </h3>

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
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input 
                                                        type={showPassword ? "text" : "password"} {...field} 
                                                    />
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
                                                    <Input
                                                        type={showPassword ? "text" : "password"} {...field} 
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <Button type="submit" className="bg-green-500 hover:bg-green-600 cursor-pointer w-full" disabled={isLoading}>
                                    {isLoading ? "Mendaftarkan..." : "Daftar"}
                                </Button>
                            </form>
                        </Form>

                        <div className="mt-6 pt-6 border-t border-gray-100">
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
    );
};

export default UserRegistrationForm;