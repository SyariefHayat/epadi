import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { 
    ChevronDownIcon, 
    MapPin, 
    ShoppingCart, 
    Building2, 
    User 
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
import { Calendar } from "@/components/ui/calendar"
import { Textarea } from '@/components/ui/textarea'
import Navbar from '@/components/modules/auth/Navbar'
import DefaultLayout from '@/components/layouts/DefaultLayout'

const BuyerSignup = () => {
    const [formData, setFormData] = useState({
        namaLengkap: '',
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
        jenisBuyer: '',
        namaPerusahaan: '',
        bidangUsaha: '',
        kebutuhanBulanan: '',
        jenisKomoditas: '',
        metodePembayaran: '',
        sertifikasiDibutuhkan: ''
    })
    
    const [isLoading, setIsLoading] = useState(false)
    const [calendarOpen, setCalendarOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState(undefined)
    
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleDateSelect = (date) => {
        setSelectedDate(date)
        if (date) {
            setFormData(prev => ({
                ...prev,
                tanggalLahir: date.toISOString().split('T')[0]
            }))
        }
        setCalendarOpen(false)
    }

    const handleSelectChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        
        try {
            await new Promise(resolve => setTimeout(resolve, 1500))
            console.log('Data buyer:', formData)
            navigate("/signup/success")
        } catch (error) {
            console.error("Error:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const isFormValid = () => {
        const requiredFields = [
            'namaLengkap', 'username', 'noTelepon', 'jenisKelamin', 
            'kodePos', 'provinsi', 'kota', 'kecamatan', 'kelurahan', 'alamatLengkap',
            'jenisBuyer', 'bidangUsaha', 'kebutuhanBulanan', 'jenisKomoditas', 'metodePembayaran', 'sertifikasiDibutuhkan'
        ];

        const fieldsToCheck = [...requiredFields];
        if (formData.jenisBuyer && formData.jenisBuyer !== 'individu') {
            fieldsToCheck.push('namaPerusahaan');
        }
        
        const allFieldsFilled = fieldsToCheck.every(field => {
            const value = formData[field];
            return value && value.toString().trim() !== '';
        });

        const isDateSelected = selectedDate !== undefined && selectedDate !== null;
        
        return allFieldsFilled && isDateSelected;
    }

    return (
        <DefaultLayout>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-10 bg-purple-50">
                <div className="w-full max-w-2xl">
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <ShoppingCart className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                Daftar Sebagai Buyer
                            </h1>
                            <p className="text-gray-600 text-sm">
                                Bergabung untuk membeli produk pertanian berkualitas langsung dari petani
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <div className="bg-gray-50 rounded-xl p-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                        <User className="w-5 h-5 mr-2 text-purple-600" />
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
                                                className="w-full focus:border-purple-500"
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
                                                placeholder="buyer123"
                                                className="focus:border-purple-500"
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
                                                className="focus:border-purple-500"
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

                                        <div>
                                            <Label className="text-sm font-medium text-gray-700 mb-1 block">Tanggal Lahir</Label>
                                            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                                                <PopoverTrigger asChild>
                                                    <Button variant="outline" className="w-full justify-between">
                                                        {selectedDate ? selectedDate.toLocaleDateString('id-ID') : "Pilih tanggal"}
                                                        <ChevronDownIcon className="h-4 w-4" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0">
                                                    <Calendar
                                                        mode="single"
                                                        selected={selectedDate}
                                                        onSelect={handleDateSelect}
                                                        fromYear={1950}
                                                        toYear={new Date().getFullYear()}
                                                        captionLayout="dropdown"
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

                                        <div className="md:col-span-2">
                                            <Label htmlFor="alamatLengkap" className="text-sm font-medium text-gray-700 mb-1 block">
                                                Alamat Lengkap
                                            </Label>
                                            <Textarea
                                                id="alamatLengkap"
                                                name="alamatLengkap"
                                                value={formData.alamatLengkap}
                                                onChange={handleChange}
                                                placeholder="Jl. Pasar Besar No. 45, Jakarta Pusat"
                                                rows={3}
                                                className="focus:border-blue-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-xl p-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                        <Building2 className="w-5 h-5 mr-2 text-indigo-600" />
                                        Profil Pembelian
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label className="text-sm font-medium text-gray-700 mb-1 block">
                                                Jenis Buyer
                                            </Label>
                                            <Select onValueChange={(value) => handleSelectChange('jenisBuyer', value)}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Pilih jenis buyer" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="individu">Pembeli Individu</SelectItem>
                                                    <SelectItem value="umkm">UMKM/Usaha Kecil</SelectItem>
                                                    <SelectItem value="perusahaan">Perusahaan Menengah</SelectItem>
                                                    <SelectItem value="industri">Industri Besar</SelectItem>
                                                    <SelectItem value="eksportir">Eksportir</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {formData.jenisBuyer && formData.jenisBuyer !== 'individu' && (
                                            <div>
                                                <Label htmlFor="namaPerusahaan" className="text-sm font-medium text-gray-700 mb-1 block">
                                                    Nama Perusahaan
                                                </Label>
                                                <Input
                                                    id="namaPerusahaan"
                                                    name="namaPerusahaan"
                                                    type="text"
                                                    value={formData.namaPerusahaan}
                                                    onChange={handleChange}
                                                    placeholder="PT. Agro Makmur Sejahtera"
                                                    className="focus:border-indigo-500"
                                                />
                                            </div>
                                        )}

                                        <div>
                                            <Label className="text-sm font-medium text-gray-700 mb-1 block">
                                                Bidang Usaha
                                            </Label>
                                            <Select onValueChange={(value) => handleSelectChange('bidangUsaha', value)}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Pilih bidang usaha" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="pengolahan-makanan">Pengolahan Makanan</SelectItem>
                                                    <SelectItem value="pakan-ternak">Pakan Ternak</SelectItem>
                                                    <SelectItem value="retail-grosir">Retail & Grosir</SelectItem>
                                                    <SelectItem value="ekspor-impor">Ekspor Import</SelectItem>
                                                    <SelectItem value="industri-kimia">Industri Kimia</SelectItem>
                                                    <SelectItem value="konsumsi-rumahan">Konsumsi Rumahan</SelectItem>
                                                    <SelectItem value="lainnya">Lainnya</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <Label htmlFor="kebutuhanBulanan" className="text-sm font-medium text-gray-700 mb-1 block">
                                                Kebutuhan Bulanan (Ton)
                                            </Label>
                                            <Input
                                                id="kebutuhanBulanan"
                                                name="kebutuhanBulanan"
                                                type="number"
                                                step="0.1"
                                                min="0.1"
                                                value={formData.kebutuhanBulanan}
                                                onChange={handleChange}
                                                placeholder="10"
                                                className="focus:border-indigo-500"
                                            />
                                        </div>

                                        <div>
                                            <Label className="text-sm font-medium text-gray-700 mb-1 block">
                                                Jenis Komoditas Utama
                                            </Label>
                                            <Select onValueChange={(value) => handleSelectChange('jenisKomoditas', value)}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Pilih komoditas" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="padi-beras">Padi Beras</SelectItem>
                                                    <SelectItem value="padi-gabah">Padi Gabah</SelectItem>
                                                    <SelectItem value="padi-organik">Padi Organik</SelectItem>
                                                    <SelectItem value="padi-aromatik">Padi Aromatik</SelectItem>
                                                    <SelectItem value="semua-jenis">Semua Jenis Padi</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <Label className="text-sm font-medium text-gray-700 mb-1 block">
                                                Metode Pembayaran Preferensi
                                            </Label>
                                            <Select onValueChange={(value) => handleSelectChange('metodePembayaran', value)}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Pilih metode pembayaran" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="cash-on-delivery">Cash on Delivery (COD)</SelectItem>
                                                    <SelectItem value="transfer-bank">Transfer Bank</SelectItem>
                                                    <SelectItem value="kredit-30-hari">Kredit 30 Hari</SelectItem>
                                                    <SelectItem value="kredit-60-hari">Kredit 60 Hari</SelectItem>
                                                    <SelectItem value="letter-of-credit">Letter of Credit (L/C)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <Label className="text-sm font-medium text-gray-700 mb-1 block">
                                                Sertifikasi yang Dibutuhkan
                                            </Label>
                                            <Select onValueChange={(value) => handleSelectChange('sertifikasiDibutuhkan', value)}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Pilih sertifikasi" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="tidak-ada">Tidak Ada</SelectItem>
                                                    <SelectItem value="organik">Sertifikat Organik</SelectItem>
                                                    <SelectItem value="halal">Sertifikat Halal</SelectItem>
                                                    <SelectItem value="haccp">HACCP</SelectItem>
                                                    <SelectItem value="iso">ISO 22000</SelectItem>
                                                    <SelectItem value="gap">Good Agricultural Practice (GAP)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                // disabled={!isFormValid() || isLoading}
                                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:hover:scale-100 shadow-lg hover:shadow-xl disabled:shadow-none flex items-center justify-center"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Menyimpan...
                                    </>
                                ) : (
                                    'Daftar Sebagai Buyer'
                                )}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-xs text-gray-500">
                                Dengan mendaftar, Anda menyetujui 
                                <a href="/terms" className="text-purple-600 hover:text-purple-700 ml-1">
                                    Syarat & Ketentuan
                                </a> dan 
                                <a href="/purchase-policy" className="text-purple-600 hover:text-purple-700 ml-1">
                                    Kebijakan Pembelian
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    )
}

export default BuyerSignup