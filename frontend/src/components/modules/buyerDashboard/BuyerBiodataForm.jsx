import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { ChevronDownIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useRef, useState } from "react";
import { User, MapPin, ShoppingCart, Loader2, Image as ImageIcon } from "lucide-react";

import { 
    Popover, 
    PopoverContent, 
    PopoverTrigger 
} from "@/components/ui/popover"

import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import EachUtils from "@/utils/EachUtils";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { apiInstanceExpress } from "@/services/apiInstance";

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const BuyerBiodata = z.object({
    fullName: z.string().min(1, "Nama lengkap wajib diisi"),
    buyerProfilePhoto: z.any()
        .optional()
        .refine((file) => !file || file instanceof File, "File foto tidak valid")
        .refine((file) => !file || file.size <= MAX_FILE_SIZE, "Ukuran foto maksimal 2MB")
        .refine(
            (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
            "Format foto harus JPG/PNG/WebP"
        ),

    dateOfBirth: z.coerce.date({ invalid_type_error: "Tanggal lahir tidak valid" }),
    gender: z.enum(["Laki-laki", "Perempuan"], { required_error: "Jenis kelamin wajib dipilih" }),
    phone: z.string()
        .regex(/^[0-9]{10,15}$/, "Nomor HP harus 10-15 digit angka")
        .optional()
        .or(z.literal("")),
    
    postalCode: z.string().min(1, "Kode pos wajib diisi"),
    province: z.string().min(1, "Provinsi wajib diisi"),
    provinceCode: z.string().optional(),
    city: z.string().min(1, "Kota/Kabupaten wajib diisi"),
    cityCode: z.string().optional(),
    subDistrict: z.string().min(1, "Kecamatan wajib diisi"),
    subDistrictCode: z.string().optional(),
    ward: z.string().min(1, "Kelurahan/Desa wajib diisi"),
    wardCode: z.string().optional(),
    address: z.string().min(1, "Alamat wajib diisi"),

    purchasingCapacity: z.coerce.number().min(0, "Kapasitas pembelian tidak boleh negatif"),
});

const BuyerBiodataForm = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    
    const [isLoading, setIsLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [dobOpen, setDobOpen] = useState(false);

    const [provinces, setProvinces] = useState([]);
    const [regencies, setRegencies] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [villages, setVillages] = useState([]);

    const [provId, setProvId] = useState(null);
    const [regId, setRegId] = useState(null);
    const [distId, setDistId] = useState(null);

    const fileRef = useRef(null);
    const { userData } = useAuth();

    const form = useForm({
        resolver: zodResolver(BuyerBiodata),
        defaultValues: {
            fullName: "",
            buyerProfilePhoto: undefined,

            dateOfBirth: undefined,
            gender: "",
            phone: "",

            postalCode: "",
            province: "",
            provinceCode: "",
            city: "",
            cityCode: "",
            subDistrict: "",
            subDistrictCode: "",
            ward: "",
            wardCode: "",
            address: "",

            purchasingCapacity: 0,
        },
    });

    useEffect(() => {
        return () => {
            if (previewUrl && previewUrl.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    const handleSubmit = async (data) => {
        setIsLoading(true);

        try {
            const token = await currentUser.getIdToken();
            const fd = new FormData();

            fd.append("fullName", data.fullName);
            if (data.buyerProfilePhoto) fd.append("buyerProfilePhoto", data.buyerProfilePhoto);
            fd.append("dateOfBirth", data.dateOfBirth.toISOString());
            fd.append("gender", data.gender);
            if (data.phone) fd.append("phone", data.phone);

            fd.append("postalCode", data.postalCode);
            fd.append("province", data.province);
            if (data.provinceCode) fd.append("provinceCode", data.provinceCode);
            fd.append("city", data.city);
            if (data.cityCode) fd.append("cityCode", data.cityCode);
            fd.append("subDistrict", data.subDistrict);
            if (data.subDistrictCode) fd.append("subDistrictCode", data.subDistrictCode);
            fd.append("ward", data.ward);
            if (data.wardCode) fd.append("wardCode", data.wardCode);
            fd.append("address", data.address);

            fd.append("purchasingCapacity", String(data.purchasingCapacity));
            fd.append("createdBy", userData._id);

            const response = await apiInstanceExpress.post("/buyer/biodata/create", fd, {
                headers: { 
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                },
            });

            if (response.status === 201) {
                toast.success("Biodata pembeli berhasil disimpan");
                setTimeout(() => {
                    navigate("/admin/dashboard");
                }, 1500);
            }
        } catch (error) {
            console.error("Error:", error?.response?.data?.message || error?.message);
            toast.error(error?.response?.data?.message || "Terjadi kesalahan saat menyimpan");
        } finally {
            setIsLoading(false);
        }
    };

    const openPicker = () => {
        if (!isLoading) fileRef.current?.click();
    };

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json");
                const data = await res.json();
                setProvinces(data);
            } catch (e) {
                toast.error("Gagal memuat daftar provinsi");
            }
        })();
    }, []);

    useEffect(() => {
        if (!provId) return;
        (async () => {
            try {
                const res = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provId}.json`);
                const data = await res.json();
                setRegencies(data);
            } catch (e) {
                toast.error("Gagal memuat daftar kota/kabupaten");
            }
        })();
    }, [provId]);

    useEffect(() => {
        if (!regId) return;
        (async () => {
            try {
                const res = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${regId}.json`);
                const data = await res.json();
                setDistricts(data);
            } catch (e) {
                toast.error("Gagal memuat daftar kecamatan");
            }
        })();
    }, [regId]);

    useEffect(() => {
        if (!distId) return;
        (async () => {
            try {
                const res = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${distId}.json`);
                const data = await res.json();
                setVillages(data);
            } catch (e) {
                toast.error("Gagal memuat daftar kelurahan/desa");
            }
        })();
    }, [distId]);

    return (
        <div className="min-h-screen bg-gray-50/50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Biodata Pembeli</h1>
                    <p className="text-gray-600">
                        Lengkapi informasi biodata pembeli hasil panen
                    </p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-b border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <User className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-900">Data Personal</h2>
                                </div>
                            </div>

                            <div className="p-8 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="buyerProfilePhoto"
                                        render={({ field }) => (
                                            <FormItem className="md:col-span-2">
                                                <FormLabel className="text-sm font-medium text-gray-700">
                                                    Foto Profil (opsional)
                                                </FormLabel>

                                                <div className="flex items-center gap-4">
                                                    <div
                                                        role="button"
                                                        tabIndex={isLoading ? -1 : 0}
                                                        aria-disabled={isLoading}
                                                        onClick={openPicker}
                                                        onKeyDown={(e) => {
                                                            if (!isLoading && (e.key === "Enter" || e.key === " ")) {
                                                                e.preventDefault();
                                                                openPicker();
                                                            }
                                                        }}
                                                        className={[
                                                            "w-1/2 h-52 rounded-xl border border-gray-200 overflow-hidden bg-gray-50",
                                                            "flex items-center justify-center",
                                                            isLoading
                                                                ? "cursor-not-allowed opacity-70"
                                                                : "cursor-pointer hover:ring-2 hover:ring-blue-200",
                                                        ].join(" ")}
                                                        title={isLoading ? "Sedang menyimpan..." : "Klik untuk pilih foto"}
                                                    >
                                                        {previewUrl ? (
                                                            <img
                                                                src={previewUrl}
                                                                alt="Foto Profil"
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <ImageIcon className="w-6 h-6 text-gray-400" />
                                                        )}
                                                    </div>

                                                    <input
                                                        ref={fileRef}
                                                        type="file"
                                                        accept={ACCEPTED_IMAGE_TYPES.join(",")}
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            field.onChange(file ?? undefined);
                                                            if (file) {
                                                                const url = URL.createObjectURL(file);
                                                                setPreviewUrl(url);
                                                            }
                                                        }}
                                                        disabled={isLoading}
                                                        className="hidden"
                                                    />
                                                </div>

                                                <p className="text-xs text-gray-500 mt-1">
                                                    Klik kotak untuk memilih foto. Maks 2MB. Format: JPG/PNG/WebP.
                                                </p>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="fullName"
                                        render={({ field }) => (
                                            <FormItem className="md:col-span-2">
                                                <FormLabel className="text-sm font-medium text-gray-700">
                                                    Nama Lengkap
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Nama lengkap pembeli"
                                                        {...field}
                                                        disabled={isLoading}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="dateOfBirth"
                                        render={({ field }) => {
                                            const selectedDate =
                                                field.value instanceof Date
                                                    ? field.value
                                                    : field.value
                                                    ? new Date(field.value)
                                                    : undefined;

                                            return (
                                                <FormItem>
                                                    <FormLabel className="text-sm font-medium text-gray-700">
                                                        Tanggal Lahir
                                                    </FormLabel>
                                                    <Popover
                                                        open={dobOpen}
                                                        onOpenChange={(o) => {
                                                            if (!isLoading) setDobOpen(o);
                                                        }}
                                                    >
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                                type="button"
                                                                id="dateOfBirth"
                                                                variant="outline"
                                                                disabled={isLoading}
                                                                className="w-full justify-between border-gray-200 font-normal"
                                                            >
                                                                {selectedDate
                                                                    ? selectedDate.toLocaleDateString("id-ID", {
                                                                        day: "2-digit",
                                                                        month: "long",
                                                                        year: "numeric",
                                                                    })
                                                                    : "Pilih tanggal"}
                                                                <ChevronDownIcon className="ml-2 h-4 w-4 opacity-60" />
                                                            </Button>
                                                        </PopoverTrigger>

                                                        <PopoverContent
                                                            className="w-auto p-0"
                                                            align="start"
                                                        >
                                                            <Calendar
                                                                mode="single"
                                                                captionLayout="dropdown"
                                                                selected={selectedDate}
                                                                disabled={(date) => date > new Date()}
                                                                fromYear={1950}
                                                                toYear={new Date().getFullYear()}
                                                                onSelect={(date) => {
                                                                    if (!date) return;
                                                                    field.onChange(date);
                                                                    setDobOpen(false);
                                                                }}
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </FormItem>
                                            );
                                        }}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="gender"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-sm font-medium text-gray-700">
                                                    Jenis Kelamin
                                                </FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                    disabled={isLoading}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors cursor-pointer">
                                                            <SelectValue placeholder="Pilih jenis kelamin" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Laki-laki" className="cursor-pointer">
                                                            Laki-laki
                                                        </SelectItem>
                                                        <SelectItem value="Perempuan" className="cursor-pointer">
                                                            Perempuan
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem className="md:col-span-2">
                                                <FormLabel className="text-sm font-medium text-gray-700">
                                                    Nomor HP (Opsional)
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Contoh: 08123456789"
                                                        className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                                                        {...field}
                                                        disabled={isLoading}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-8 py-6 border-b border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-green-100 rounded-lg">
                                        <MapPin className="h-5 w-5 text-green-600" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-900">Data Alamat</h2>
                                </div>
                            </div>

                            <div className="p-8 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="province"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-sm font-medium text-gray-700">Provinsi</FormLabel>
                                                <Select
                                                    disabled={isLoading || provinces.length === 0}
                                                    value={field.value}
                                                    onValueChange={(val) => {
                                                        field.onChange(val);
                                                        const found = provinces.find(p => p.name === val);
                                                        if (found) {
                                                            setProvId(found.id);
                                                            form.setValue("provinceCode", found.id);
                                                        }
                                                        setRegencies([]); setDistricts([]); setVillages([]);
                                                        setRegId(null); setDistId(null);
                                                        form.setValue("city", "");
                                                        form.setValue("cityCode", "");
                                                        form.setValue("subDistrict", "");
                                                        form.setValue("subDistrictCode", "");
                                                        form.setValue("ward", "");
                                                        form.setValue("wardCode", "");
                                                    }}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                                                            <SelectValue placeholder="Pilih provinsi" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <EachUtils 
                                                            of={provinces}
                                                            render={(item, index) => (
                                                                <SelectItem key={index} value={item.name} className="cursor-pointer">
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
                                        name="city"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-sm font-medium text-gray-700">Kota/Kabupaten</FormLabel>
                                                <Select
                                                    disabled={isLoading || regencies.length === 0}
                                                    value={field.value}
                                                    onValueChange={(val) => {
                                                        field.onChange(val);
                                                        const found = regencies.find(r => r.name === val);
                                                        if (found) {
                                                            setRegId(found.id);
                                                            form.setValue("cityCode", found.id);
                                                        }
                                                        setDistricts([]); setVillages([]);
                                                        setDistId(null);
                                                        form.setValue("subDistrict", "");
                                                        form.setValue("subDistrictCode", "");
                                                        form.setValue("ward", "");
                                                        form.setValue("wardCode", "");
                                                    }}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                                                            <SelectValue placeholder="Pilih kota/kabupaten" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <EachUtils 
                                                            of={regencies}
                                                            render={(item, index) => (
                                                                <SelectItem key={index} value={item.name} className="cursor-pointer">
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
                                        name="subDistrict"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-sm font-medium text-gray-700">Kecamatan</FormLabel>
                                                <Select
                                                    disabled={isLoading || districts.length === 0}
                                                    value={field.value}
                                                    onValueChange={(val) => {
                                                        field.onChange(val);
                                                        const found = districts.find(d => d.name === val);
                                                        if (found) {
                                                            setDistId(found.id);
                                                            form.setValue("subDistrictCode", found.id);
                                                        }
                                                        setVillages([]);
                                                        form.setValue("ward", "");
                                                        form.setValue("wardCode", "");
                                                    }}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                                                            <SelectValue placeholder="Pilih kecamatan" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <EachUtils 
                                                            of={districts}
                                                            render={(item, index) => (
                                                                <SelectItem key={index} value={item.name} className="cursor-pointer">
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
                                        name="ward"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-sm font-medium text-gray-700">Kelurahan/Desa</FormLabel>
                                                <Select
                                                    disabled={isLoading || villages.length === 0}
                                                    value={field.value}
                                                    onValueChange={(val) => {
                                                        field.onChange(val);
                                                        const found = villages.find(v => v.name === val);
                                                        if (found) {
                                                            form.setValue("wardCode", found.id);
                                                        }
                                                    }}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                                                            <SelectValue placeholder="Pilih kelurahan/desa" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <EachUtils 
                                                            of={villages}
                                                            render={(item, index) => (
                                                                <SelectItem key={index} value={item.name} className="cursor-pointer">
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
                                        name="postalCode"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-sm font-medium text-gray-700">Kode Pos</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Masukkan kode pos"
                                                        className="w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                                                        {...field}
                                                        disabled={isLoading}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="address"
                                        render={({ field }) => (
                                            <FormItem className="md:col-span-2">
                                                <FormLabel className="text-sm font-medium text-gray-700">
                                                    Alamat Lengkap
                                                </FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Masukkan alamat lengkap (nama jalan, RT/RW, dll)"
                                                        className="min-h-[100px] border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors resize-none"
                                                        {...field}
                                                        disabled={isLoading}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-8 py-6 border-b border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-purple-100 rounded-lg">
                                        <ShoppingCart className="h-5 w-5 text-purple-600" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-900">Data Pembelian</h2>
                                </div>
                            </div>

                            <div className="p-8 space-y-6">
                                <FormField
                                    control={form.control}
                                    name="purchasingCapacity"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-medium text-gray-700">
                                                Kemampuan Membeli (Rupiah)
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Contoh: 50000000"
                                                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                                                    {...field}
                                                    disabled={isLoading}
                                                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                                />
                                            </FormControl>
                                            <p className="text-xs text-gray-500 mt-1">
                                                Masukkan nilai dalam Rupiah tanpa pemisah ribuan
                                            </p>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-4 pt-6">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate("/admin/dashboard")}
                                disabled={isLoading}
                                className="px-8 py-2 border-gray-300 hover:bg-gray-50"
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="px-8 py-2 bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Menyimpan...
                                    </>
                                ) : (
                                    "Simpan Biodata"
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default BuyerBiodataForm;