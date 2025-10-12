import z from 'zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import EachUtils from '@/utils/EachUtils';
import { auth } from '@/services/firebase';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';
import { LIST_ROLE } from '@/constants/listRole';
import Navbar from '@/components/modules/auth/Navbar';
import { apiInstanceExpress } from '@/services/apiInstance';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import PasswordField from '@/components/modules/auth/PasswordField';

const SignupSchema = z.object({
    NIK: z.string()
        .length(16, { message: "NIK harus 16 digit" })
        .regex(/^[0-9]+$/, { message: "NIK hanya boleh berisi angka" }),
    fullName: z.string().min(1, { message: "Nama lengkap harus diisi" }),
    province: z.string().min(1, { message: "Provinsi harus dipilih" }),
    regency: z.string().min(1, { message: "Kota harus dipilih" }),
    district: z.string().min(1, { message: "Kecamatan harus dipilih" }),
    village: z.string().min(1, { message: "Desa harus dipilih" }),
    password: z.string()
        .min(8, { message: "Password minimal 8 karakter" })
        .regex(/[A-Z]/, { message: "Harus ada huruf besar" })
        .regex(/[a-z]/, { message: "Harus ada huruf kecil" }),
    confirmPassword: z.string().min(1, { message: "Konfirmasi password harus diisi" }),
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Konfirmasi password tidak cocok",
});

const SignUp = () => {
    const { role } = useParams();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const [provinces, setProvinces] = useState([]);
    const [regencies, setRegencies] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [villages, setVillages] = useState([]);

    const [locationNames, setLocationNames] = useState({
        provinceName: "",
        regencyName: "",
        districtName: "",
        villageName: ""
    });

    const roleData = LIST_ROLE.find((item) => item.id === role);

    useEffect(() => {
        if (!roleData) navigate("/role");
    }, [roleData]);

    useEffect(() => {
        fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
            .then(res => res.json())
            .then(setProvinces)
            .catch(() => toast.error("Gagal memuat daftar provinsi"));
    }, []);

    const form = useForm({
        resolver: zodResolver(SignupSchema),
        defaultValues: {
            NIK: "",
            fullName: "",
            province: "",
            regency: "",
            district: "",
            village: "",
            password: "",
            confirmPassword: "",
        },
    });

    useEffect(() => {
        const provId = form.watch("province");
        if (!provId) return;
        fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provId}.json`)
            .then(res => res.json())
            .then(setRegencies)
            .catch(() => toast.error("Gagal memuat daftar kota"));
    }, [form.watch("province")]);

    useEffect(() => {
        const regId = form.watch("regency");
        if (!regId) return;
        fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${regId}.json`)
            .then(res => res.json())
            .then(setDistricts)
            .catch(() => toast.error("Gagal memuat daftar kecamatan"));
    }, [form.watch("regency"), regencies]);

    useEffect(() => {
        const distId = form.watch("district");
        if (!distId) return;
        fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${distId}.json`)
            .then(res => res.json())
            .then(setVillages)
            .catch(() => toast.error("Gagal memuat daftar desa"));
    }, [form.watch("district")]);

    const handleSignup = async (data) => {
        setIsLoading(true);
        
        try {
            const sanitizedFullName = data.fullName
                .toLowerCase()
                .replace(/\s+/g, ".")
                .replace(/[^a-z.]/g, "");
            const fakeEmail = `${sanitizedFullName}@gmail.com`;

            const register = await createUserWithEmailAndPassword(auth, fakeEmail, data.password);
            const user = register.user;
            await updateProfile(user, { displayName: data.fullName });

            const response = await apiInstanceExpress.post("/sign-up", {
                uid: user.uid,
                email: user.email,
                fullName: user.displayName,
                role,
                NIK: data.NIK,

                provinceCode: data.province,
                cityCode: data.regency,
                subDistrictCode: data.district,
                wardCode: data.village,

                province: locationNames.provinceName,
                city: locationNames.regencyName,
                subDistrict: locationNames.districtName,
                ward: locationNames.villageName,
                isActive: true,
            });

            if (response.status === 201) {
                toast.success("Pendaftaran berhasil!");
                await auth.signOut();
                
                setTimeout(() => {
                    navigate("/signin");
                }, 1000);
            }

        } catch (error) {
            if (auth.currentUser) await auth.currentUser.delete();

            let msg = "Pendaftaran gagal.";

            if (error.code === "auth/email-already-in-use") msg = "Email sudah digunakan.";
            else if (error.code === "auth/invalid-email") msg = "Email tidak valid.";
            else if (error.code === "auth/weak-password") msg = "Password terlalu lemah.";

            if (error.response && error.response.status === 403) {
                msg = error.response.data.message || "Wilayah kamu belum dibuka untuk akses sistem";
            }

            toast.error(msg);
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
                            <div className={`w-16 h-16 ${roleData.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                                <roleData.icon className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">Daftar Sebagai {roleData.title}</h1>
                            <p className="text-gray-600 text-sm">{roleData.signup_desc}</p>
                        </div>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleSignup)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="NIK"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>NIK</FormLabel>
                                            <FormControl>
                                                <Input placeholder="1234567890123456" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="fullName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nama Lengkap</FormLabel>
                                            <FormControl>
                                                <Input placeholder="John Doe" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-2 gap-3">
                                    <FormField
                                        control={form.control}
                                        name="province"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel>Provinsi</FormLabel>
                                                <Select 
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                        const selected = provinces.find(p => p.id === value);
                                                        if (selected) {
                                                            setLocationNames(prev => ({
                                                                ...prev,
                                                                provinceName: selected.name
                                                            }));
                                                        }
                                                    }} 
                                                    value={field.value}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Pilih provinsi" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <EachUtils 
                                                            of={provinces}
                                                            render={(item, index) => (
                                                                <SelectItem key={index} value={item.id}>
                                                                    {item.name}
                                                                </SelectItem>
                                                            )}
                                                        />
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="regency"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel>Kota / Kabupaten</FormLabel>
                                                <Select 
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                        const selected = regencies.find(r => r.id === value);
                                                        if (selected) {
                                                            setLocationNames(prev => ({
                                                                ...prev,
                                                                regencyName: selected.name
                                                            }));
                                                        }
                                                    }} 
                                                    value={field.value} 
                                                    disabled={!regencies.length}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Pilih kota" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <EachUtils 
                                                            of={regencies}
                                                            render={(item, index) => (
                                                                <SelectItem key={index} value={item.id}>
                                                                    {item.name}
                                                                </SelectItem>
                                                            )}
                                                        />
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <FormField
                                        control={form.control}
                                        name="district"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel>Kecamatan</FormLabel>
                                                <Select 
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                        const selected = districts.find(d => d.id === value);
                                                        if (selected) {
                                                            setLocationNames(prev => ({
                                                                ...prev,
                                                                districtName: selected.name
                                                            }));
                                                        }
                                                    }} 
                                                    value={field.value} 
                                                    disabled={!districts.length}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Pilih kecamatan" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <EachUtils 
                                                            of={districts}
                                                            render={(item, index) => (
                                                                <SelectItem key={index} value={item.id}>
                                                                    {item.name}
                                                                </SelectItem>
                                                            )}
                                                        />
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="village"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel>Desa</FormLabel>
                                                <Select 
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                        const selected = villages.find(v => v.id === value);
                                                        if (selected) {
                                                            setLocationNames(prev => ({
                                                                ...prev,
                                                                villageName: selected.name
                                                            }));
                                                        }
                                                    }} 
                                                    value={field.value} 
                                                    disabled={!villages.length}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Pilih desa" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <EachUtils 
                                                            of={villages}
                                                            render={(item, index) => (
                                                                <SelectItem key={index} value={item.id}>
                                                                    {item.name}
                                                                </SelectItem>
                                                            )}
                                                        />
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <PasswordField field={field} placeholder="Masukkan Password" />
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
                                                <PasswordField field={field} placeholder="Ulangi Password" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="submit"
                                    className={`${roleData?.color} w-full cursor-pointer`}
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Mendaftarkan..." : "Daftar"}
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default SignUp;