import React, { useEffect, useMemo, useRef, useState } from "react";

import {
    MoreHorizontal,
    Pencil,
    UserX,
    Eye,
    User,
    MapPin,
    Home,
    Calendar as CalendarIcon,
} from "lucide-react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { TableCell, TableRow } from "@/components/ui/table";
import { apiInstanceExpress } from "@/services/apiInstance";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { z } from "zod";
import { toast } from "sonner";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const FarmerBiodata = z.object({
    nik: z.string().regex(/^\d{16}$/, "NIK harus 16 digit angka"),
    fullName: z.string().min(1, "Nama lengkap wajib diisi"),
    profilePhoto: z
        .any()
        .optional()
        .refine((file) => !file || file instanceof File || typeof file === "string", "File foto tidak valid")
        .refine((file) => !file || typeof file === "string" || file.size <= MAX_FILE_SIZE, "Ukuran foto maksimal 2MB")
        .refine(
        (file) => !file || typeof file === "string" || ACCEPTED_IMAGE_TYPES.includes(file.type),
        "Format foto harus JPG/PNG/WebP"
        ),
    dateOfBirth: z.coerce.date({ invalid_type_error: "Tanggal lahir tidak valid" }),
    gender: z.enum(["Laki-laki", "Perempuan"], { required_error: "Jenis kelamin wajib dipilih" }),
    phone: z
        .string()
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

const FarmerRow = ({ farmer, onDelete }) => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const [dobOpen, setDobOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const [provinces, setProvinces] = useState([]);
    const [regencies, setRegencies] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [villages, setVillages] = useState([]);

    const [provId, setProvId] = useState(null);
    const [regId, setRegId] = useState(null);
    const [distId, setDistId] = useState(null);

    const [previewUrl, setPreviewUrl] = useState(null);
    const fileRef = useRef(null);

    const form = useForm({
        resolver: zodResolver(FarmerBiodata),
        defaultValues: {
        nik: farmer?.NIK || "",
        fullName: farmer?.fullName || "",
        profilePhoto: farmer?.profilePicture ? String(farmer.profilePicture) : undefined,

        dateOfBirth: farmer?.dateOfBirth ? new Date(farmer.dateOfBirth) : undefined,
        gender:
            farmer?.gender === "L" || farmer?.gender === "Laki-laki"
            ? "Laki-laki"
            : farmer?.gender === "P" || farmer?.gender === "Perempuan"
            ? "Perempuan"
            : "",

        phone: farmer?.phone || "",

        postalCode: farmer?.postalCode || "",
        province: farmer?.province || "",
        provinceCode: farmer?.provinceCode || "",
        city: farmer?.city || "",
        cityCode: farmer?.cityCode || "",
        subDistrict: farmer?.subDistrict || "",
        subDistrictCode: farmer?.subDistrictCode || "",
        ward: farmer?.ward || "",
        wardCode: farmer?.wardCode || "",
        address: farmer?.address || "",

        landArea: farmer?.landArea ?? 0,
        riceVariety: farmer?.riceVariety || "",
        estimatedHarvest: farmer?.estimatedHarvest ?? 0,
        howLongBecomeFarmer: farmer?.howLongBecomeFarmer || "",
        landOwnership: farmer?.landOwnership || "",
        landLocation: farmer?.landLocation || "",
        plantingSeason: farmer?.plantingSeason || "",
        farmerGroup: farmer?.farmerGroup || "",
        farmerCardNumber: farmer?.farmerCardNumber || "",
        },
    });

    useEffect(() => {
        return () => {
        if (previewUrl && previewUrl.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    useEffect(() => {
        (async () => {
        try {
            const res = await fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json");
            const data = await res.json();
            setProvinces(data);

            const selectedName = form.getValues("province");
            const selectedCode = form.getValues("provinceCode");
            let found;
            if (selectedCode) found = data.find((p) => String(p.id) === String(selectedCode));
            else if (selectedName) found = data.find((p) => p.name === selectedName);
            if (found) setProvId(found.id);
        } catch (e) {
            toast.error("Gagal memuat daftar provinsi");
        }
        })();
    }, []);

    useEffect(() => {
        if (!provId) return;
        (async () => {
        try {
            const res = await fetch(
            `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provId}.json`
            );
            const data = await res.json();
            setRegencies(data);

            const selectedName = form.getValues("city");
            const selectedCode = form.getValues("cityCode");
            let found;
            if (selectedCode) found = data.find((r) => String(r.id) === String(selectedCode));
            else if (selectedName) found = data.find((r) => r.name === selectedName);
            if (found) setRegId(found.id);
        } catch (e) {
            toast.error("Gagal memuat daftar kota/kabupaten");
        }
        })();
    }, [provId]);

    useEffect(() => {
        if (!regId) return;
        (async () => {
        try {
            const res = await fetch(
            `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${regId}.json`
            );
            const data = await res.json();
            setDistricts(data);

            const selectedName = form.getValues("subDistrict");
            const selectedCode = form.getValues("subDistrictCode");
            let found;
            if (selectedCode) found = data.find((d) => String(d.id) === String(selectedCode));
            else if (selectedName) found = data.find((d) => d.name === selectedName);
            if (found) setDistId(found.id);
        } catch (e) {
            toast.error("Gagal memuat daftar kecamatan");
        }
        })();
    }, [regId]);

    useEffect(() => {
        if (!distId) return;
        (async () => {
        try {
            const res = await fetch(
            `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${distId}.json`
            );
            const data = await res.json();
            setVillages(data);
        } catch (e) {
            toast.error("Gagal memuat daftar kelurahan/desa");
        }
        })();
    }, [distId]);

    const formatDate = (date) => {
        if (!date) return "-";
        return new Date(date).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    const cloudinaryUrl = useMemo(() => {
        if (!farmer?.profilePicture) return null;
        return `${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}${farmer.profilePicture}`;
    }, [farmer]);

    const onSubmitEdit = async (data) => {
        setIsSaving(true);
        const toastId = toast.loading("Menyimpan perubahan...");

        try {
            const token = await currentUser.getIdToken();
            const fd = new FormData();

            fd.append("NIK", data.nik);
            fd.append("fullName", data.fullName);

            if (data.profilePhoto instanceof File) {
                fd.append("profilePhoto", data.profilePhoto);
            }

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

            fd.append("landArea", String(data.landArea));
            fd.append("riceVariety", data.riceVariety);
            fd.append("estimatedHarvest", String(data.estimatedHarvest));
            fd.append("howLongBecomeFarmer", data.howLongBecomeFarmer);
            fd.append("landOwnership", data.landOwnership);
            fd.append("landLocation", data.landLocation);
            fd.append("plantingSeason", data.plantingSeason);
            fd.append("farmerGroup", data.farmerGroup);
            if (data.farmerCardNumber) fd.append("farmerCardNumber", data.farmerCardNumber);

            await apiInstanceExpress.put(`/farmer/biodata/edit/${farmer._id}`, fd, {
                headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
                },
            });

            toast.success("Perubahan disimpan", { id: toastId });
            setIsEditOpen(false);
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Gagal menyimpan perubahan", { id: toastId });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <>
            <TableRow>
                <TableCell className="font-medium">{farmer?.fullName || "-"}</TableCell>
                <TableCell>{farmer?.NIK || "-"}</TableCell>
                <TableCell>
                <Badge variant="outline" className="capitalize">
                    {farmer?.userId?.role || "farmer"}
                </Badge>
                </TableCell>
                <TableCell>{farmer?.landArea || "-"} m²</TableCell>
                <TableCell>{farmer?.province || "-"}</TableCell>
                <TableCell>{farmer?.city || "-"}</TableCell>
                <TableCell>{farmer?.subDistrict || "-"}</TableCell>
                <TableCell>{farmer?.ward || "-"}</TableCell>
                <TableCell>
                <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
                    <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="cursor-pointer">
                        <MoreHorizontal size={16} />
                    </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                    <DropdownMenuItem
                        className="flex items-center gap-2 cursor-pointer"
                        onSelect={() => {
                        setMenuOpen(false);
                        setIsDetailOpen(true);
                        }}
                    >
                        <Eye size={14} />
                        <span>Detail</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className="flex items-center gap-2 cursor-pointer"
                        onSelect={() => {
                        setMenuOpen(false);
                        setIsEditOpen(true);
                        }}
                    >
                        <Pencil size={14} />
                        <span>Edit</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className="flex items-center gap-2 cursor-pointer text-destructive"
                        onSelect={() => {
                        setMenuOpen(false);
                        setIsDeleteOpen(true);
                        }}
                    >
                        <UserX size={14} />
                        <span>Hapus</span>
                    </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                </TableCell>
            </TableRow>

            <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
                <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Detail Data Petani</DialogTitle>
                        <DialogDescription>Informasi lengkap mengenai data petani</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6 py-4">
                        <div className="space-y-4">
                        <div className="flex items-center gap-2 text-lg font-semibold">
                            <User size={20} className="text-primary" />
                            <h3>Informasi Pribadi</h3>
                        </div>
                        <Separator />

                        <div className="flex flex-col gap-4">
                            <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Foto</p>
                            <div className="w-[200px] h-[200px] border flex items-center justify-center overflow-hidden">
                                {farmer?.profilePicture ? (
                                <img
                                    src={cloudinaryUrl || ""}
                                    alt={farmer.fullName}
                                    className="w-full h-full object-cover"
                                />
                                ) : (
                                <span className="text-sm text-muted-foreground">Tidak ada foto</span>
                                )}
                            </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Nama Lengkap</p>
                                    <p className="font-medium">{farmer?.fullName || "-"}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">NIK</p>
                                    <p className="font-medium">{farmer?.NIK || "-"}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Tanggal Lahir</p>
                                    <p className="font-medium">{formatDate(farmer?.dateOfBirth)}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Jenis Kelamin</p>
                                    <p className="font-medium">
                                    {farmer?.gender === "L"
                                        ? "Laki-laki"
                                        : farmer?.gender === "P"
                                        ? "Perempuan"
                                        : farmer?.gender || "-"}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">No. Telepon</p>
                                    <p className="font-medium">{farmer?.phone || "-"}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">No. Kartu Tani</p>
                                    <p className="font-medium">{farmer?.farmerCardNumber || "-"}</p>
                                </div>
                            </div>
                        </div>
                        </div>

                        <div className="space-y-4">
                        <div className="flex items-center gap-2 text-lg font-semibold">
                            <MapPin size={20} className="text-primary" />
                            <h3>Alamat</h3>
                        </div>
                        <Separator />

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Provinsi</p>
                            <p className="font-medium">{farmer?.province || "-"}</p>
                            </div>
                            <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Kota/Kabupaten</p>
                            <p className="font-medium">{farmer?.city || "-"}</p>
                            </div>
                            <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Kecamatan</p>
                            <p className="font-medium">{farmer?.subDistrict || "-"}</p>
                            </div>
                            <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Kelurahan/Desa</p>
                            <p className="font-medium">{farmer?.ward || "-"}</p>
                            </div>
                            <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Kode Pos</p>
                            <p className="font-medium">{farmer?.postalCode || "-"}</p>
                            </div>
                            <div className="space-y-1 col-span-2">
                            <p className="text-sm text-muted-foreground">Alamat Lengkap</p>
                            <p className="font-medium">{farmer?.address || "-"}</p>
                            </div>
                        </div>
                        </div>

                        <div className="space-y-4">
                        <div className="flex items-center gap-2 text-lg font-semibold">
                            <Home size={20} className="text-primary" />
                            <h3>Informasi Pertanian</h3>
                        </div>
                        <Separator />

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Luas Lahan</p>
                            <p className="font-medium">{farmer?.landArea ? `${farmer.landArea} m²` : "-"}</p>
                            </div>
                            <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Varietas Padi</p>
                            <p className="font-medium">{farmer?.riceVariety || "-"}</p>
                            </div>
                            <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Estimasi Panen</p>
                            <p className="font-medium">
                                {farmer?.estimatedHarvest ? `${farmer.estimatedHarvest} kg` : "-"}
                            </p>
                            </div>
                            <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Lama Menjadi Petani</p>
                            <p className="font-medium">{farmer?.howLongBecomeFarmer || "-"}</p>
                            </div>
                            <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Status Kepemilikan Lahan</p>
                            <p className="font-medium">{farmer?.landOwnership || "-"}</p>
                            </div>
                            <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Lokasi Lahan</p>
                            <p className="font-medium">{farmer?.landLocation || "-"}</p>
                            </div>
                            <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Musim Tanam</p>
                            <p className="font-medium">{farmer?.plantingSeason || "-"}</p>
                            </div>
                            <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Kelompok Tani</p>
                            <p className="font-medium">{farmer?.farmerGroup || "-"}</p>
                            </div>
                        </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                        Tutup
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent className="sm:max-w-[720px] max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Data Petani</DialogTitle>
                    <DialogDescription>Ubah informasi petani lalu simpan perubahan.</DialogDescription>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmitEdit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-1 md:col-span-2">
                            <Label className="text-sm">Foto Profil (opsional)</Label>
                            <div className="flex items-center gap-4 mt-2">
                                <div
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => fileRef.current?.click()}
                                    className="w-40 h-40 rounded-xl border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-blue-200"
                                >
                                    {previewUrl ? (
                                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                    ) : typeof form.watch("profilePhoto") === "string" && form.watch("profilePhoto") ? (
                                    <img
                                        src={
                                        form.watch("profilePhoto").startsWith("http")
                                            ? form.watch("profilePhoto")
                                            : `${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}${form.watch("profilePhoto")}`
                                        }
                                        alt="Foto Profil"
                                        className="w-full h-full object-cover"
                                    />
                                    ) : cloudinaryUrl ? (
                                    <img src={cloudinaryUrl} alt="Foto Profil" className="w-full h-full object-cover" />
                                    ) : (
                                    <span className="text-xs text-muted-foreground">Klik untuk pilih foto</span>
                                    )}
                                </div>

                                <input
                                    ref={fileRef}
                                    type="file"
                                    accept={ACCEPTED_IMAGE_TYPES.join(",")}
                                    className="hidden"
                                    onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        form.setValue("profilePhoto", file, { shouldValidate: true });
                                        const url = URL.createObjectURL(file);
                                        setPreviewUrl(url);
                                    }
                                    }}
                                />
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">Maks 2MB. Format: JPG/PNG/WebP.</p>
                            {form.formState.errors.profilePhoto && (
                                <p className="text-sm text-red-500 mt-1">{form.formState.errors.profilePhoto.message}</p>
                            )}
                        </div>

                        <div className="space-y-1">
                            <Label>NIK</Label>
                            <Input
                            placeholder="16 digit NIK"
                            maxLength={16}
                            inputMode="numeric"
                            {...form.register("nik")}
                            />
                            {form.formState.errors.nik && (
                            <p className="text-sm text-red-500 mt-1">{form.formState.errors.nik.message}</p>
                            )}
                        </div>

                        <div className="space-y-1">
                            <Label>Nama Lengkap</Label>
                            <Input placeholder="Nama lengkap sesuai KTP" {...form.register("fullName")} />
                            {form.formState.errors.fullName && (
                            <p className="text-sm text-red-500 mt-1">{form.formState.errors.fullName.message}</p>
                            )}
                        </div>

                        <div className="space-y-1">
                            <Label>Tanggal Lahir</Label>
                            <Popover open={dobOpen} onOpenChange={setDobOpen}>
                            <PopoverTrigger asChild>
                                <Button type="button" variant="outline" className="w-full justify-between">
                                {form.watch("dateOfBirth")
                                    ? new Date(form.watch("dateOfBirth")).toLocaleDateString("id-ID", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                    })
                                    : "Pilih tanggal"}
                                <CalendarIcon className="ml-2 h-4 w-4 opacity-60" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                mode="single"
                                captionLayout="dropdown"
                                selected={
                                    form.watch("dateOfBirth")
                                    ? new Date(form.watch("dateOfBirth"))
                                    : undefined
                                }
                                disabled={(date) => date > new Date()}
                                fromYear={1950}
                                toYear={new Date().getFullYear()}
                                onSelect={(date) => {
                                    if (!date) return;
                                    form.setValue("dateOfBirth", date, { shouldValidate: true });
                                    setDobOpen(false);
                                }}
                                />
                            </PopoverContent>
                            </Popover>
                            {form.formState.errors.dateOfBirth && (
                            <p className="text-sm text-red-500 mt-1">
                                {form.formState.errors.dateOfBirth.message}
                            </p>
                            )}
                        </div>

                        <div className="space-y-1">
                            <Label>Jenis Kelamin</Label>
                            <Controller
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                                <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih jenis kelamin" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                                    <SelectItem value="Perempuan">Perempuan</SelectItem>
                                </SelectContent>
                                </Select>
                            )}
                            />
                            {form.formState.errors.gender && (
                            <p className="text-sm text-red-500 mt-1">{form.formState.errors.gender.message}</p>
                            )}
                        </div>

                        <div className="md:col-span-2 space-y-1">
                            <Label>Nomor HP (Opsional)</Label>
                            <Input placeholder="Contoh: 08123456789" {...form.register("phone")} />
                            {form.formState.errors.phone && (
                            <p className="text-sm text-red-500 mt-1">{form.formState.errors.phone.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-lg font-semibold">
                            <MapPin size={18} className="text-primary" />
                            <h3>Data Alamat</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                            <Label>Provinsi</Label>
                            <Controller
                                control={form.control}
                                name="province"
                                render={({ field }) => (
                                <Select
                                    disabled={provinces.length === 0}
                                    value={field.value}
                                    onValueChange={(val) => {
                                    field.onChange(val);
                                    const found = provinces.find((p) => p.name === val);
                                    if (found) {
                                        setProvId(found.id);
                                        form.setValue("provinceCode", String(found.id));
                                    }
                                    setRegencies([]); setDistricts([]); setVillages([]);
                                    setRegId(null); setDistId(null);
                                    form.setValue("city", ""); form.setValue("cityCode", "");
                                    form.setValue("subDistrict", ""); form.setValue("subDistrictCode", "");
                                    form.setValue("ward", ""); form.setValue("wardCode", "");
                                    }}
                                >
                                    <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih provinsi" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    {provinces.map((p) => (
                                        <SelectItem key={p.id} value={p.name}>{p.name}</SelectItem>
                                    ))}
                                    </SelectContent>
                                </Select>
                                )}
                            />
                            {form.formState.errors.province && (
                                <p className="text-sm text-red-500 mt-1">{form.formState.errors.province.message}</p>
                            )}
                            </div>

                            <div className="space-y-1">
                            <Label>Kota/Kabupaten</Label>
                            <Controller
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                <Select
                                    disabled={regencies.length === 0}
                                    value={field.value}
                                    onValueChange={(val) => {
                                    field.onChange(val);
                                    const found = regencies.find((r) => r.name === val);
                                    if (found) {
                                        setRegId(found.id);
                                        form.setValue("cityCode", String(found.id));
                                    }
                                    setDistricts([]); setVillages([]);
                                    setDistId(null);
                                    form.setValue("subDistrict", ""); form.setValue("subDistrictCode", "");
                                    form.setValue("ward", ""); form.setValue("wardCode", "");
                                    }}
                                >
                                    <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih kota/kabupaten" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    {regencies.map((r) => (
                                        <SelectItem key={r.id} value={r.name}>{r.name}</SelectItem>
                                    ))}
                                    </SelectContent>
                                </Select>
                                )}
                            />
                            {form.formState.errors.city && (
                                <p className="text-sm text-red-500 mt-1">{form.formState.errors.city.message}</p>
                            )}
                            </div>

                            <div className="space-y-1">
                            <Label>Kecamatan</Label>
                            <Controller
                                control={form.control}
                                name="subDistrict"
                                render={({ field }) => (
                                <Select
                                    disabled={districts.length === 0}
                                    value={field.value}
                                    onValueChange={(val) => {
                                    field.onChange(val);
                                    const found = districts.find((d) => d.name === val);
                                    if (found) {
                                        setDistId(found.id);
                                        form.setValue("subDistrictCode", String(found.id));
                                    }
                                    setVillages([]);
                                    form.setValue("ward", ""); form.setValue("wardCode", "");
                                    }}
                                >
                                    <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih kecamatan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    {districts.map((d) => (
                                        <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>
                                    ))}
                                    </SelectContent>
                                </Select>
                                )}
                            />
                            {form.formState.errors.subDistrict && (
                                <p className="text-sm text-red-500 mt-1">
                                {form.formState.errors.subDistrict.message}
                                </p>
                            )}
                            </div>

                            <div className="space-y-1">
                            <Label>Kelurahan/Desa</Label>
                            <Controller
                                control={form.control}
                                name="ward"
                                render={({ field }) => (
                                <Select
                                    disabled={villages.length === 0}
                                    value={field.value}
                                    onValueChange={(val) => {
                                    field.onChange(val);
                                    const found = villages.find((v) => v.name === val);
                                    if (found) form.setValue("wardCode", String(found.id));
                                    }}
                                >
                                    <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih kelurahan/desa" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    {villages.map((v) => (
                                        <SelectItem key={v.id} value={v.name}>{v.name}</SelectItem>
                                    ))}
                                    </SelectContent>
                                </Select>
                                )}
                            />
                            {form.formState.errors.ward && (
                                <p className="text-sm text-red-500 mt-1">{form.formState.errors.ward.message}</p>
                            )}
                            </div>

                            <div className="space-y-1">
                            <Label>Kode Pos</Label>
                            <Input placeholder="Masukkan kode pos" {...form.register("postalCode")} />
                            {form.formState.errors.postalCode && (
                                <p className="text-sm text-red-500 mt-1">
                                {form.formState.errors.postalCode.message}
                                </p>
                            )}
                            </div>

                            <div className="space-y-1 md:col-span-2">
                                <Label>Alamat Lengkap</Label>
                                <Input placeholder="Nama jalan, RT/RW, dll" {...form.register("address")} />
                                {form.formState.errors.address && (
                                    <p className="text-sm text-red-500 mt-1">{form.formState.errors.address.message}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-lg font-semibold">
                            <Home size={18} className="text-primary" />
                            <h3>Data Pertanian</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                            <Label>Luas Lahan (m²)</Label>
                            <Input type="number" placeholder="Contoh: 5000" {...form.register("landArea", { valueAsNumber: true })} />
                            {form.formState.errors.landArea && (
                                <p className="text-sm text-red-500 mt-1">{form.formState.errors.landArea.message}</p>
                            )}
                            </div>

                            <div className="space-y-1"
                            >
                            <Label>Varietas Padi</Label>
                            <Input placeholder="Contoh: IR64, Ciherang" {...form.register("riceVariety")} />
                            {form.formState.errors.riceVariety && (
                                <p className="text-sm text-red-500 mt-1">{form.formState.errors.riceVariety.message}</p>
                            )}
                            </div>

                            <div className="space-y-1">
                            <Label>Estimasi Panen (kg)</Label>
                            <Input
                                type="number"
                                placeholder="Contoh: 3000"
                                {...form.register("estimatedHarvest", { valueAsNumber: true })}
                            />
                            {form.formState.errors.estimatedHarvest && (
                                <p className="text-sm text-red-500 mt-1">
                                {form.formState.errors.estimatedHarvest.message}
                                </p>
                            )}
                            </div>

                            <div className="space-y-1">
                            <Label>Lama Menjadi Petani</Label>
                            <Input placeholder="Contoh: 5 tahun" {...form.register("howLongBecomeFarmer")} />
                            {form.formState.errors.howLongBecomeFarmer && (
                                <p className="text-sm text-red-500 mt-1">
                                {form.formState.errors.howLongBecomeFarmer.message}
                                </p>
                            )}
                            </div>

                            <div className="space-y-1">
                            <Label>Status Kepemilikan Lahan</Label>
                            <Input placeholder="Milik Sendiri / Sewa / Bagi Hasil / Pinjam" {...form.register("landOwnership")} />
                            {form.formState.errors.landOwnership && (
                                <p className="text-sm text-red-500 mt-1">
                                {form.formState.errors.landOwnership.message}
                                </p>
                            )}
                            </div>

                            <div className="space-y-1">
                            <Label>Lokasi Lahan</Label>
                            <Input placeholder="Contoh: Desa Sukamaju" {...form.register("landLocation")} />
                            {form.formState.errors.landLocation && (
                                <p className="text-sm text-red-500 mt-1">
                                {form.formState.errors.landLocation.message}
                                </p>
                            )}
                            </div>

                            <div className="space-y-1">
                            <Label>Musim Tanam</Label>
                            <Input placeholder="Musim Hujan / Musim Kemarau / Sepanjang Tahun" {...form.register("plantingSeason")} />
                            {form.formState.errors.plantingSeason && (
                                <p className="text-sm text-red-500 mt-1">
                                {form.formState.errors.plantingSeason.message}
                                </p>
                            )}
                            </div>

                            <div className="space-y-1">
                            <Label>Kelompok Tani</Label>
                            <Input placeholder="Nama kelompok tani" {...form.register("farmerGroup")} />
                            {form.formState.errors.farmerGroup && (
                                <p className="text-sm text-red-500 mt-1">{form.formState.errors.farmerGroup.message}</p>
                            )}
                            </div>

                            <div className="md:col-span-2 space-y-1">
                            <Label>Nomor Kartu Tani (Opsional)</Label>
                            <Input placeholder="Masukkan nomor kartu tani" {...form.register("farmerCardNumber")} />
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)}>
                        Batal
                    </Button>
                    <Button type="submit" disabled={isSaving}>
                        {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
                    </Button>
                    </DialogFooter>
                </form>
                </DialogContent>
            </Dialog>

            <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                    <AlertDialogDescription>
                    Tindakan ini tidak dapat dibatalkan. Data petani <strong>{farmer?.fullName}</strong>{" "}
                    akan dihapus secara permanen dari sistem.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction
                    onClick={async () => {
                        const toastId = toast.loading("Menghapus Data...");
                        try {
                        const token = await currentUser.getIdToken();
                        const response = await apiInstanceExpress.delete(
                            `/farmer/biodata/delete/${farmer._id}`,
                            { headers: { Authorization: `Bearer ${token}` } }
                        );
                        if (response.status === 204) {
                            toast.success("Data petani berhasil dihapus", { id: toastId });
                            onDelete && onDelete(farmer._id);
                        }
                        } catch (error) {
                        console.error("Gagal menghapus data petani", error);
                        toast.error("Gagal menghapus data petani. Silakan coba lagi", { id: toastId });
                        }
                    }}
                    className="bg-destructive hover:bg-destructive/90"
                    >
                    Hapus
                    </AlertDialogAction>
                </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default FarmerRow;