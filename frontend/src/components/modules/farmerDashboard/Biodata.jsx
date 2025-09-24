import { z } from "zod";
import { toast } from "sonner";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { User, MapPin, Sprout, Loader2, Image as ImageIcon } from "lucide-react";

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

import { Input } from "@/components/ui/input";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { userDataAtomStorage } from "@/jotai/atoms";
import { apiInstanceExpress } from "@/service/apiInstance";
import EachUtils from "@/utils/EachUtils";


const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const FarmerBiodata = z.object({
    nik: z.string().regex(/^\d{16}$/, "NIK harus 16 digit angka"),
    fullName: z.string().min(1, "Nama lengkap wajib diisi"),
    profilePhoto: z
        .any()
        .optional()
        .refine((file) => !file || file instanceof File, "File foto tidak valid")
        .refine((file) => !file || file.size <= MAX_FILE_SIZE, "Ukuran foto maksimal 2MB")
        .refine(
        (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
        "Format foto harus JPG/PNG/WebP"
        ),

    dateOfBirth: z.coerce.date({ invalid_type_error: "Tanggal lahir tidak valid" }),
    gender: z.enum(["Laki-laki", "Perempuan"], { required_error: "Jenis kelamin wajib dipilih" }),
    phone: z.string().regex(/^[0-9]{10,15}$/, "Nomor HP harus 10-15 digit angka"),

    postalCode: z.string().min(1, "Kode pos wajib diisi"),
    province: z.string().min(1, "Provinsi wajib diisi"),
    city: z.string().min(1, "Kota/Kabupaten wajib diisi"),
    subDistrict: z.string().min(1, "Kecamatan wajib diisi"),
    ward: z.string().min(1, "Kelurahan/Desa wajib diisi"),
    address: z.string().min(1, "Alamat wajib diisi"),

    landArea: z.coerce.number().min(0, "Luas lahan tidak boleh negatif"),
    riceVariety: z.string().min(1, "Varietas padi wajib diisi"),
    estimatedHarvest: z.coerce.number().min(0, "Estimasi panen tidak boleh negatif"),
    howLongBecomeFarmer: z.string().min(1, "Lama menjadi petani wajib diisi"),
    landOwnership: z.string().min(1, "Status kepemilikan lahan wajib diisi"),
    landLocation: z.string().min(1, "Lokasi lahan wajib diisi"),
    plantingSeason: z.string().min(1, "Musim tanam wajib diisi"),
    farmerGroup: z.string().min(1, "Kelompok tani wajib diisi"),
    farmerCardNumber: z.string().optional(),
});

const Biodata = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [dobOpen, setDobOpen] = useState(false);

    const [provinces, setProvinces] = useState([]);
    const [regencies, setRegencies] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [villages, setVillages] = useState([]);

    const [provId, setProvId] = useState(null);
    const [regId, setRegId] = useState(null);
    const [distId, setDistId] = useState(null);

    const fileRef = useRef(null);
    const [userData] = useAtom(userDataAtomStorage);

    const form = useForm({
        resolver: zodResolver(FarmerBiodata),
        defaultValues: {
            nik: userData?.NIK || "",
            fullName: userData?.fullName || "",
            profilePhoto: undefined,

            dateOfBirth: undefined,
            gender: "",
            phone: "",

            postalCode: "",
            province: "",
            city: "",
            subDistrict: "",
            ward: "",
            address: "",

            landArea: 0,
            riceVariety: "",
            estimatedHarvest: 0,
            howLongBecomeFarmer: "",
            landOwnership: "",
            landLocation: "",
            plantingSeason: "",
            farmerGroup: "",
            farmerCardNumber: "",
        },
    });

    const disabledAll = useMemo(() => isLoading || isReadOnly, [isLoading, isReadOnly]);

    useEffect(() => {
        return () => {
            if (previewUrl && previewUrl.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    useEffect(() => {
        let ignore = false;

        const fetchExisting = async () => {
            if (!userData?._id) return;

            try {
                const res = await apiInstanceExpress.get(`/farmer/biodata/${userData._id}`);
                if (ignore) return;

                if (res?.status === 200 && res?.data) {
                    const d = res.data;

                    form.reset({
                        nik: d.nik ?? userData.NIK ?? "",
                        fullName: d.fullName ?? userData.fullName ?? "",
                        profilePhoto: undefined,

                        dateOfBirth: d.dateOfBirth ? new Date(d.dateOfBirth) : undefined,
                        gender: d.gender ?? "",
                        phone: d.phone ?? "",

                        postalCode: d.postalCode ?? "",
                        province: d.province ?? "",
                        city: d.city ?? "",
                        subDistrict: d.subDistrict ?? "",
                        ward: d.ward ?? "",
                        address: d.address ?? "",

                        landArea: d.landArea ?? 0,
                        riceVariety: d.riceVariety ?? "",
                        estimatedHarvest: d.estimatedHarvest ?? 0,
                        howLongBecomeFarmer: d.howLongBecomeFarmer ?? "",
                        landOwnership: d.landOwnership ?? "",
                        landLocation: d.landLocation ?? "",
                        plantingSeason: d.plantingSeason ?? "",
                        farmerGroup: d.farmerGroup ?? "",
                        farmerCardNumber: d.farmerCardNumber ?? "",
                    });

                    if (d.profilePhotoUrl) setPreviewUrl(d.profilePhotoUrl);

                    setIsReadOnly(true);
                }
            } catch (err) {
                if (err?.response?.status !== 404) {
                    console.error(err);
                    toast.error("Gagal memeriksa biodata");
                }
            }
        };

        fetchExisting();

        return () => {
            ignore = true;
        };
    }, [userData?._id]);

    const handleSubmit = async (data) => {
        if (isReadOnly) return;

        setIsLoading(true);

        try {
            const fd = new FormData();

            fd.append("nik", data.nik);
            fd.append("fullName", data.fullName);
            if (data.profilePhoto) fd.append("profilePhoto", data.profilePhoto);

            fd.append("dateOfBirth", data.dateOfBirth.toISOString());
            fd.append("gender", data.gender);
            fd.append("phone", data.phone);

            fd.append("postalCode", data.postalCode);
            fd.append("province", data.province);
            fd.append("city", data.city);
            fd.append("subDistrict", data.subDistrict);
            fd.append("ward", data.ward);
            fd.append("address", data.address);

            fd.append("landArea", String(data.landArea));
            fd.append("riceVariety", data.riceVariety);
            fd.append("estimatedHarvest", String(data.estimatedHarvest));
            fd.append("howLongBecomeFarmer", data.howLongBecomeFarmer);
            fd.append("landOwnership", data.landOwnership);
            fd.append("landLocation", data.landLocation);
            fd.append("plantingSeason", data.plantingSeason);
            fd.append("farmerGroup", data.farmerGroup);

            if (data.farmerCardNumber) fd.append("farmerCardNumber", data.farmerCardNumber);
            fd.append("user", userData._id);

            const response = await apiInstanceExpress.post("/farmer/biodata", fd, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.status === 201) {
                toast.success("Biodata berhasil disimpan");
                setIsReadOnly(true);
            }
        } catch (error) {
            console.error("Error:", error?.response?.data?.message || error?.message);
            toast.error(error?.response?.data?.message || "Terjadi kesalahan saat menyimpan");
        } finally {
            setIsLoading(false);
        }
    };

    const openPicker = () => {
        if (!disabledAll) fileRef.current?.click();
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
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Biodata Petani</h1>
                    <p className="text-gray-600">
                        {isReadOnly
                        ? "Biodata Anda sudah tersimpan. Form dalam mode baca."
                        : "Lengkapi informasi biodata Anda sebagai petani"}
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
                                        name="profilePhoto"
                                        render={({ field }) => (
                                        <FormItem className="md:col-span-2">
                                            <FormLabel className="text-sm font-medium text-gray-700">
                                            Foto Profil {isReadOnly && "(tersimpan)"}
                                            </FormLabel>

                                            <div className="flex items-center gap-4">
                                                <div
                                                    role="button"
                                                    tabIndex={disabledAll ? -1 : 0}
                                                    aria-disabled={disabledAll}
                                                    onClick={openPicker}
                                                    onKeyDown={(e) => {
                                                        if (!disabledAll && (e.key === "Enter" || e.key === " ")) {
                                                            e.preventDefault();
                                                            openPicker();
                                                        }
                                                    }}
                                                    className={[
                                                    "w-1/2 h-52 rounded-xl border border-gray-200 overflow-hidden bg-gray-50",
                                                    "flex items-center justify-center",
                                                    disabledAll
                                                        ? "cursor-not-allowed opacity-70"
                                                        : "cursor-pointer hover:ring-2 hover:ring-blue-200",
                                                    ].join(" ")}
                                                    title={disabledAll ? "Form dalam mode baca" : "Klik untuk pilih foto"}
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
                                                    disabled={disabledAll}
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
                                        name="nik"
                                        render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-medium text-gray-700">NIK</FormLabel>
                                            <FormControl>
                                            <Input
                                                placeholder="16 digit NIK"
                                                inputMode="numeric"
                                                maxLength={16}
                                                {...field}
                                                readOnly
                                            />
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
                                            <FormLabel className="text-sm font-medium text-gray-700">
                                            Nama Lengkap
                                            </FormLabel>
                                            <FormControl>
                                            <Input
                                                placeholder="Nama lengkap sesuai KTP"
                                                {...field}
                                                readOnly
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
                                                        if (!disabledAll) setDobOpen(o);
                                                    }}
                                                    >
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                                type="button"
                                                                id="dateOfBirth"
                                                                variant="outline"
                                                                disabled={disabledAll}
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
                                                disabled={disabledAll}
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
                                            Nomor HP
                                            </FormLabel>
                                            <FormControl>
                                            <Input
                                                placeholder="Contoh: 08123456789"
                                                className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                                                {...field}
                                                disabled={disabledAll}
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
                                                    disabled={disabledAll || provinces.length === 0}
                                                    value={field.value}
                                                    onValueChange={(val) => {
                                                        field.onChange(val);
                                                        const found = provinces.find(p => p.name === val);
                                                        const id = found?.id ?? null;
                                                        setProvId(id);
                                                        setRegencies([]); setDistricts([]); setVillages([]);
                                                        setRegId(null); setDistId(null);
                                                        form.setValue("city", "");
                                                        form.setValue("subDistrict", "");
                                                        form.setValue("ward", "");
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
                                                    disabled={disabledAll || regencies.length === 0}
                                                    value={field.value}
                                                    onValueChange={(val) => {
                                                        field.onChange(val);
                                                        const found = regencies.find(r => r.name === val);
                                                        const id = found?.id ?? null;
                                                        setRegId(id);
                                                        setDistricts([]); setVillages([]);
                                                        setDistId(null);
                                                        form.setValue("subDistrict", "");
                                                        form.setValue("ward", "");
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
                                                    disabled={disabledAll || districts.length === 0}
                                                    value={field.value}
                                                    onValueChange={(val) => {
                                                        field.onChange(val);
                                                        const found = districts.find(d => d.name === val);
                                                        const id = found?.id ?? null;
                                                        setDistId(id);
                                                        setVillages([]);
                                                        form.setValue("ward", "");
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
                                                    disabled={disabledAll || villages.length === 0}
                                                    value={field.value}
                                                    onValueChange={(val) => field.onChange(val)}
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
                                                        disabled={disabledAll}
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
                                                <FormLabel className="text-sm font-medium text-gray-700">Alamat Lengkap</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Masukkan alamat lengkap (nama jalan, RT/RW, nomor rumah, dsb.)"
                                                        className="min-h-[100px] border-gray-200 focus:border-blue-500 focus:ring-blue-500 resize-none transition-colors"
                                                        {...field}
                                                        disabled={disabledAll}
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
                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-8 py-6 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                            <div className="p-2 bg-amber-100 rounded-lg">
                                <Sprout className="h-5 w-5 text-amber-600" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900">Data Pertanian</h2>
                            </div>
                        </div>

                        <div className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="landArea"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-gray-700">
                                    Luas Lahan (Ha)
                                    </FormLabel>
                                    <FormControl>
                                    <Input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        placeholder="Contoh: 2.5"
                                        className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                                        {...field}
                                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                        disabled={disabledAll}
                                    />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="riceVariety"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-gray-700">
                                    Varietas Padi
                                    </FormLabel>
                                    <FormControl>
                                    <Input
                                        placeholder="Contoh: IR64, Ciherang"
                                        className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                                        {...field}
                                        disabled={disabledAll}
                                    />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="estimatedHarvest"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-gray-700">
                                    Estimasi Panen (Ton)
                                    </FormLabel>
                                    <FormControl>
                                    <Input
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        placeholder="Contoh: 5.5"
                                        className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                                        {...field}
                                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                        disabled={disabledAll}
                                    />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="howLongBecomeFarmer"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-gray-700">
                                    Lama Menjadi Petani
                                    </FormLabel>
                                    <FormControl>
                                    <Input
                                        placeholder="Contoh: 10 tahun"
                                        className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                                        {...field}
                                        disabled={disabledAll}
                                    />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="landOwnership"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-gray-700">
                                    Status Kepemilikan Lahan
                                    </FormLabel>
                                    <FormControl>
                                    <Input
                                        placeholder="Contoh: Milik sendiri, Sewa"
                                        className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                                        {...field}
                                        disabled={disabledAll}
                                    />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="landLocation"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-gray-700">
                                    Lokasi Lahan
                                    </FormLabel>
                                    <FormControl>
                                    <Input
                                        placeholder="Masukkan lokasi lahan"
                                        className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                                        {...field}
                                        disabled={disabledAll}
                                    />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="plantingSeason"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-gray-700">
                                    Musim Tanam
                                    </FormLabel>
                                    <FormControl>
                                    <Input
                                        placeholder="Contoh: Musim hujan, Musim kemarau"
                                        className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                                        {...field}
                                        disabled={disabledAll}
                                    />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="farmerGroup"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-gray-700">
                                    Kelompok Tani
                                    </FormLabel>
                                    <FormControl>
                                    <Input
                                        placeholder="Masukkan nama kelompok tani"
                                        className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                                        {...field}
                                        disabled={disabledAll}
                                    />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="farmerCardNumber"
                                render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                    <FormLabel className="text-sm font-medium text-gray-700">
                                    Nomor Kartu Tani (Opsional)
                                    </FormLabel>
                                    <FormControl>
                                    <Input
                                        placeholder="Masukkan nomor kartu tani"
                                        className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                                        {...field}
                                        disabled={disabledAll}
                                    />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            </div>
                        </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                        <div className="flex flex-col sm:flex-row gap-4">
                            {isReadOnly ? (
                            <Button
                                type="button"
                                className="w-full h-12 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-200"
                                disabled
                            >
                                Biodata sudah tersimpan • Mode baca
                            </Button>
                            ) : isLoading ? (
                            <Button className="w-full h-12 rounded-md bg-blue-600 hover:bg-blue-700" disabled>
                                <Loader2 className="animate-spin mr-2" size={18} />
                                Sedang menyimpan data...
                            </Button>
                            ) : (
                            <Button
                                type="submit"
                                className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
                            >
                                Simpan Data Petani
                            </Button>
                            )}
                        </div>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default Biodata;