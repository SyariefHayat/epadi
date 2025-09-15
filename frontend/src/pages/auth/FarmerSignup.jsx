import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { 
    MapPin, 
    Tractor, 
    User,
    ChevronDownIcon
} from "lucide-react"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from "@/components/ui/button"
import { Textarea } from '@/components/ui/textarea'
import { Calendar } from "@/components/ui/calendar"
import Navbar from '@/components/modules/auth/Navbar'
import DefaultLayout from '@/components/layouts/DefaultLayout'

const FarmerSignup = () => {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(undefined);

    const [formData, setFormData] = useState({
        namaLengkap: '',
        email: '',
        username: '',
        noTelepon: '',
        jenisKelamin: '',
        tanggalLahir: '',
        kodePos: '',
        provinsi: '',
        kota: '',
        kecamatan: '',
        kelurahan: '',
        alamatLengkap: '',
        luasLahan: '',
        jenisBenih: '',
        estimasiHasilPanen: '',
        lamaPetani: '',
        statusKepemilikanLahan: ''
    })
    
    const [isLoading, setIsLoading] = useState(false)
    
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSelectChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        
        try {
            console.log('Profile data:', formData)
            navigate("/dashboard/farmer")
        } catch (error) {
            console.error("Error setting up profile:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const daftarBenih = [
        "BISI-18",
        "NK 7328",
        "Pioneer P27",
        "DK 95",
        "JH 37",
        "Hibrida Lokal",
    ];

    return (
        <DefaultLayout>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-5 mt-5 bg-gray-100">
                <div className="w-full max-w-2xl">
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Tractor className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                Daftar Sebagai Petani
                            </h1>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Bergabunglah dengan komunitas petani digital dan akses berbagai layanan untuk mengembangkan usaha tani Anda.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <div className="bg-gray-50 rounded-xl p-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                        <User className="w-5 h-5 mr-2 text-green-600" />
                                        Data Pribadi
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="md:col-span-2">
                                            <Label htmlFor="namaLengkap" className="text-sm font-medium text-gray-700 mb-1 block">
                                                Nama Lengkap
                                            </Label>
                                            <Input
                                                id="namaLengkap"
                                                name="namaLengkap"
                                                type="text"
                                                value={formData.namaLengkap}
                                                onChange={handleChange}
                                                placeholder="Masukkan nama lengkap sesuai KTP"
                                                className="w-full focus:border-green-500"
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="username" className="text-sm font-medium text-gray-700 mb-1 block">
                                                Username
                                            </Label>
                                            <Input
                                                id="username"
                                                name="username"
                                                type="text"
                                                value={formData.username}
                                                onChange={handleChange}
                                                placeholder="petani_muda123"
                                                className="focus:border-green-500"
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="noTelepon" className="text-sm font-medium text-gray-700 mb-1 block">
                                                Nomor Telepon
                                            </Label>
                                            <Input
                                                id="noTelepon"
                                                name="noTelepon"
                                                type="tel"
                                                value={formData.noTelepon}
                                                onChange={handleChange}
                                                placeholder="081234567890"
                                                className="focus:border-green-500"
                                            />
                                        </div>

                                        <div>
                                            <Label className="text-sm font-medium text-gray-700 mb-1 block">
                                                Jenis Kelamin
                                            </Label>
                                            <Select onValueChange={(value) => handleSelectChange('jenisKelamin', value)}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Pilih jenis kelamin" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="laki-laki">Laki-laki</SelectItem>
                                                    <SelectItem value="perempuan">Perempuan</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="flex flex-col gap-3">
                                            <Label htmlFor="date" className="px-1">
                                                Tanggal Lahir
                                            </Label>
                                            <Popover open={open} onOpenChange={setOpen}>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        id="date"
                                                        className="w-48 justify-between font-normal"
                                                    >
                                                        {date ? date.toLocaleDateString() : "Select date"}
                                                        <ChevronDownIcon />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={date}
                                                        captionLayout="dropdown"
                                                        onSelect={(date) => {
                                                        setDate(date);
                                                        setOpen(false);
                                                        }}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-xl p-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                        <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                                        Alamat
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="col-span-2">
                                            <Label htmlFor="kodePos" className="text-sm font-medium text-gray-700 mb-1 block">
                                                Kode Pos
                                            </Label>
                                            <Input
                                                id="kodePos"
                                                name="kodePos"
                                                type="text"
                                                value={formData.kodePos}
                                                onChange={handleChange}
                                                placeholder="6000"
                                                className="focus:border-blue-500"
                                            />
                                        </div>

                                        <div className="col-span-2 md:col-span-1">
                                            <Label htmlFor="provinsi" className="text-sm font-medium text-gray-700 mb-1 block">
                                                Provinsi
                                            </Label>
                                            <Input
                                                id="provinsi"
                                                name="provinsi"
                                                type="text"
                                                value={formData.provinsi}
                                                onChange={handleChange}
                                                placeholder="Jawa Timur"
                                                className="focus:border-blue-500"
                                            />
                                        </div>

                                        <div className="col-span-2 md:col-span-1">
                                            <Label htmlFor="kota" className="text-sm font-medium text-gray-700 mb-1 block">
                                                Kota
                                            </Label>
                                            <Input
                                                id="kota"
                                                name="kota"
                                                type="text"
                                                value={formData.kota}
                                                onChange={handleChange}
                                                placeholder="Malang"
                                                className="focus:border-blue-500"
                                            />
                                        </div>

                                        <div className="col-span-2 md:col-span-1">
                                            <Label htmlFor="kecamatan" className="text-sm font-medium text-gray-700 mb-1 block">
                                                Kecamatan
                                            </Label>
                                            <Input
                                                id="kecamatan"
                                                name="kecamatan"
                                                type="text"
                                                value={formData.kecamatan}
                                                onChange={handleChange}
                                                placeholder="Klojen"
                                                className="focus:border-blue-500"
                                            />
                                        </div>

                                        <div className="col-span-2 md:col-span-1">
                                            <Label htmlFor="kelurahan" className="text-sm font-medium text-gray-700 mb-1 block">
                                                Kelurahan
                                            </Label>
                                            <Input
                                                id="kelurahan"
                                                name="kelurahan"
                                                type="text"
                                                value={formData.kelurahan}
                                                onChange={handleChange}
                                                placeholder="Kauman"
                                                className="focus:border-blue-500"
                                            />
                                        </div>

                                        <div className="col-span-2">
                                            <Label htmlFor="alamatLengkap" className="text-sm font-medium text-gray-700 mb-1 block">
                                                Alamat Lengkap
                                            </Label>
                                            <Textarea
                                                id="alamatLengkap"
                                                name="alamatLengkap"
                                                value={formData.alamatLengkap}
                                                onChange={handleChange}
                                                placeholder="Jl. Raya Pertanian No. 123, Desa Subur, Kec. Makmur"
                                                rows={3}
                                                className="focus:border-blue-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-xl p-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                        <Tractor className="w-5 h-5 mr-2 text-emerald-600" />
                                        Informasi Pertanian
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="col-span-2">
                                            <Label htmlFor="luasLahan" className="text-sm font-medium text-gray-700 mb-1 block">
                                                Luas Lahan (Ha)
                                            </Label>
                                            <Input
                                                id="luasLahan"
                                                name="luasLahan"
                                                type="number"
                                                step="0.1"
                                                min="0.1"
                                                value={formData.luasLahan}
                                                onChange={handleChange}
                                                placeholder="2.5"
                                                className='focus:border-emerald-500'
                                            />
                                        </div>

                                        <div className="col-span-2 md:col-span-1">
                                            <Label htmlFor="jenis-benih" className="text-sm font-medium text-gray-700 mb-1 block">
                                                Jenis Benih Jagung
                                            </Label>
                                            <Select onValueChange={(value) => handleSelectChange('jenisBenih', value)}>
                                                <SelectTrigger id="jenis-benih" className="w-full">
                                                    <SelectValue placeholder="Pilih jenis benih" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {daftarBenih.map((benih) => (
                                                        <SelectItem key={benih} value={benih}>
                                                        {benih}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="col-span-2 md:col-span-1">
                                            <Label htmlFor="estimasiHasilPanen" className="text-sm font-medium text-gray-700 mb-1 block">
                                                Estimasi Hasil Panen (Ton)
                                            </Label>
                                            <Input
                                                id="estimasiHasilPanen"
                                                name="estimasiHasilPanen"
                                                type="number"
                                                step="0.1"
                                                min="0.1"
                                                value={formData.estimasiHasilPanen}
                                                onChange={handleChange}
                                                placeholder="2.5"
                                                className='focus:border-emerald-500'
                                            />
                                        </div>

                                        <div className="col-span-2 md:col-span-1">
                                            <Label
                                                htmlFor="lamaPetani"
                                                className="text-sm font-medium text-gray-700 mb-1 block"
                                            >
                                                Berapa lama menjadi petani (Tahun)
                                            </Label>
                                            <Input
                                                id="lamaPetani"
                                                name="lamaPetani"
                                                type="number"
                                                step="1"
                                                min="0"
                                                value={formData.lamaPetani}
                                                onChange={handleChange}
                                                placeholder="Contoh: 2"
                                                className="focus:border-emerald-500"
                                            />
                                        </div>

                                        <div className="col-span-2 md:col-span-1">
                                            <Label className="text-sm font-medium text-gray-700 mb-1 block">
                                                Status Kepemilikan Lahan
                                            </Label>
                                            <Select
                                                onValueChange={(value) =>
                                                handleSelectChange("statusKepemilikanLahan", value)
                                                }
                                                value={formData.statusKepemilikanLahan}
                                            >
                                                <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Pilih status kepemilikan" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                <SelectItem value="milik_pribadi">Milik Pribadi</SelectItem>
                                                <SelectItem value="sewa">Sewa</SelectItem>
                                                <SelectItem value="bagi_hasil">Bagi Hasil</SelectItem>
                                                <SelectItem value="keluarga">Milik Keluarga</SelectItem>
                                                <SelectItem value="lainnya">Lainnya</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:hover:scale-100 shadow-lg hover:shadow-xl disabled:shadow-none flex items-center justify-center cursor-pointer"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Menyimpan Profil...
                                    </>
                                ) : (
                                    'Simpan Profil'
                                )}
                            </button>
                        </form>

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
    )
}

export default FarmerSignup