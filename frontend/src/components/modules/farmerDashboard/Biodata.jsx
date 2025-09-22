import { z } from 'zod'
import { toast } from 'sonner'
import { useAtom } from 'jotai'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { User, MapPin, Sprout, Loader2 } from 'lucide-react'

import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { userDataAtomStorage } from '@/jotai/atoms'
import { apiInstanceExpress } from '@/service/apiInstance'

const FarmerBiodata = z.object({
    dateOfBirth: z.coerce.date({ 
        invalid_type_error: "Tanggal lahir tidak valid" 
    }),
    gender: z.enum(["Laki-laki", "Perempuan"], {
        required_error: "Jenis kelamin wajib dipilih",
    }),
    phone: z.string()
        .regex(/^[0-9]{10,15}$/, "Nomor HP harus 10-15 digit angka"),

    // Data alamat
    postalCode: z.string().min(1, "Kode pos wajib diisi"),
    province: z.string().min(1, "Provinsi wajib diisi"),
    city: z.string().min(1, "Kota/Kabupaten wajib diisi"),
    subDistrict: z.string().min(1, "Kecamatan wajib diisi"),
    ward: z.string().min(1, "Kelurahan/Desa wajib diisi"),
    address: z.string().min(1, "Alamat wajib diisi"),

    // Data pertanian
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
    const [userData] = useAtom(userDataAtomStorage);
    
    const form = useForm({
        resolver: zodResolver(FarmerBiodata),
        defaultValues: {
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
        }
    });

    const handleSubmit = async (data) => {
        setIsLoading(true)

        try {
            const payload = {
                ...data,
                user: userData._id
            };

            const response = await apiInstanceExpress.post('/farmer/biodata', payload);
            if (response.status === 201) alert("Biodata berhasil disimpan");
        } catch (error) {
            console.error("Error:", error.response.data.message);
            toast.error(`${error.response.data.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50/50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Biodata Petani</h1>
                    <p className="text-gray-600">Lengkapi informasi biodata Anda sebagai petani</p>
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
                                        name="dateOfBirth"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-sm font-medium text-gray-700">
                                                    Tanggal Lahir
                                                </FormLabel>
                                                <FormControl>
                                                    <Input 
                                                        type="date"
                                                        className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors cursor-pointer"
                                                        {...field}
                                                        value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : field.value || ''}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="gender"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-sm font-medium text-gray-700">
                                                    Jenis Kelamin
                                                </FormLabel>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors cursor-pointer">
                                                            <SelectValue placeholder="Pilih jenis kelamin" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Laki-laki" className="cursor-pointer">Laki-laki</SelectItem>
                                                        <SelectItem value="Perempuan" className="cursor-pointer">Perempuan</SelectItem>
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
                                                        className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                                                        {...field} 
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
                                                <FormLabel className="text-sm font-medium text-gray-700">
                                                    Provinsi
                                                </FormLabel>
                                                <FormControl>
                                                    <Input 
                                                        placeholder="Masukkan provinsi" 
                                                        className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                                                        {...field} 
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="city"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-sm font-medium text-gray-700">
                                                    Kota/Kabupaten
                                                </FormLabel>
                                                <FormControl>
                                                    <Input 
                                                        placeholder="Masukkan kota/kabupaten" 
                                                        className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                                                        {...field} 
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="subDistrict"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-sm font-medium text-gray-700">
                                                    Kecamatan
                                                </FormLabel>
                                                <FormControl>
                                                    <Input 
                                                        placeholder="Masukkan kecamatan" 
                                                        className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                                                        {...field} 
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="ward"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-sm font-medium text-gray-700">
                                                    Kelurahan/Desa
                                                </FormLabel>
                                                <FormControl>
                                                    <Input 
                                                        placeholder="Masukkan kelurahan/desa" 
                                                        className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                                                        {...field} 
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="postalCode"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-sm font-medium text-gray-700">
                                                    Kode Pos
                                                </FormLabel>
                                                <FormControl>
                                                    <Input 
                                                        placeholder="Masukkan kode pos" 
                                                        className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                                                        {...field} 
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
                                                        placeholder="Masukkan alamat lengkap"
                                                        className="min-h-[100px] border-gray-200 focus:border-blue-500 focus:ring-blue-500 resize-none transition-colors"
                                                        {...field} 
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
                                {isLoading ? (
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
    )
}

export default Biodata