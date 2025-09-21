import { z } from 'zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const FarmerBiodata = z.object({
    // Data personal
    // fullName: z.string().min(1, "Nama lengkap wajib diisi"),
    // NIK: z.string()
    //     .regex(/^[0-9]{16}$/, "NIK harus 16 digit angka"),
    // password: z.string()
    //     .min(8, "Password minimal 8 karakter"),
    // confirmPassword: z.string(),
    
    // Data biodata
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
    landArea: z.number().min(0, "Luas lahan tidak boleh negatif"),
    riceVariety: z.string().min(1, "Varietas padi wajib diisi"),
    estimatedHarvest: z.number().min(0, "Estimasi panen tidak boleh negatif"),
    howLongBecomeFarmer: z.string().min(1, "Lama menjadi petani wajib diisi"),
    landOwnership: z.string().min(1, "Status kepemilikan lahan wajib diisi"),
    landLocation: z.string().min(1, "Lokasi lahan wajib diisi"),
    plantingSeason: z.string().min(1, "Musim tanam wajib diisi"),
    farmerGroup: z.string().min(1, "Kelompok tani wajib diisi"),
    farmerCardNumber: z.string().optional(),
});

const Biodata = () => {
    const [isLoading, setIsLoading] = useState(false)
    
    const form = useForm({
        resolver: zodResolver(FarmerBiodata),
        defaultValues: {
            fullName: "",
            NIK: "",
            password: "",
            confirmPassword: "",
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
    })

    const handleSignup = async (data) => {
        setIsLoading(true)
        try {
            alert("Menyimpan data...")
            console.log("Data petani:", data)
            
            alert("Pendaftaran berhasil!")
        } catch (error) {
            console.error("Error:", error)
            alert("Terjadi kesalahan saat mendaftar")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="w-full p-6">
            <h1 className="text-2xl font-bold mb-6">Biodata Petani</h1>
            
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSignup)} className="space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold">Data Personal</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="dateOfBirth"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tanggal Lahir</FormLabel>
                                        <FormControl>
                                            <Input 
                                                type="date" 
                                                {...field}
                                                value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : field.value}
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
                                        <FormLabel>Jenis Kelamin</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih jenis kelamin" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                                                <SelectItem value="Perempuan">Perempuan</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nomor HP</FormLabel>
                                    <FormControl>
                                        <Input type="tel" placeholder="081234567890" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold">Data Alamat</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="province"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Provinsi</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="Jawa Timur" {...field} />
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
                                        <FormLabel>Kota/Kabupaten</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="Surabaya" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="subDistrict"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Kecamatan</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="Gubeng" {...field} />
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
                                        <FormLabel>Kelurahan/Desa</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="Gubeng" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormField
                                control={form.control}
                                name="postalCode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Kode Pos</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="60281" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Alamat Lengkap</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Jl. Contoh No. 123" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold">Data Pertanian</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="landArea"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Luas Lahan (ha)</FormLabel>
                                        <FormControl>
                                            <Input 
                                                type="number" 
                                                step="0.1"
                                                placeholder="1.5" 
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
                                name="estimatedHarvest"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Estimasi Panen (ton)</FormLabel>
                                        <FormControl>
                                            <Input 
                                                type="number" 
                                                step="0.1"
                                                placeholder="5.2" 
                                                {...field}
                                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="riceVariety"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Varietas Padi</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="IR64" {...field} />
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
                                        <FormLabel>Musim Tanam</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="Musim Hujan 2024" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="howLongBecomeFarmer"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Lama Menjadi Petani</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="5 tahun" {...field} />
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
                                        <FormLabel>Status Kepemilikan Lahan</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="Milik Sendiri" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="landLocation"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Lokasi Lahan</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="Desa Sukamaju" {...field} />
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
                                        <FormLabel>Kelompok Tani</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="Tani Maju Jaya" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="farmerCardNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nomor Kartu Tani (Opsional)</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="KT123456789" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button 
                        type="submit" 
                        className="bg-green-500 hover:bg-green-600 cursor-pointer w-full" 
                        disabled={isLoading}
                    >
                        {isLoading ? "Mendaftarkan..." : "Daftar"}
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default Biodata