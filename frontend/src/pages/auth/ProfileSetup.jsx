import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDownIcon } from "lucide-react"

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
import Navbar from '@/components/modules/auth/Navbar'
import DefaultLayout from '@/components/layouts/DefaultLayout'

const ProfileSetup = () => {
    const [formData, setFormData] = useState({
        nama: '',
        email: '',
        username: '',
        jenisKelamin: '',
        tanggalLahir: '',
        provinsi: '',
        kabupatenKota: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [calendarOpen, setCalendarOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState(undefined)
    
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleDateSelect = (date) => {
        setSelectedDate(date)
        if (date) {
            const formattedDate = date.toISOString().split('T')[0]
            setFormData(prev => ({
                ...prev,
                tanggalLahir: formattedDate
            }))
        }
        setCalendarOpen(false)
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
            await new Promise(resolve => setTimeout(resolve, 1500))
            console.log('Profile data:', formData)
            navigate("/signup/success")
        } catch (error) {
            console.error("Error setting up profile:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const isFormValid = () => {
        return Object.values(formData).every(value => value.trim() !== '')
    }

    return (
        <DefaultLayout>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-5 mt-5 bg-gray-100">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                Pengaturan Profil
                            </h1>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Lengkapi informasi profil Anda untuk melanjutkan. 
                                Pastikan semua data yang dimasukkan sudah benar.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="nama" className="text-sm font-medium text-gray-700 mb-1 block">
                                        Nama Lengkap
                                    </Label>
                                    <Input
                                        id="nama"
                                        name="nama"
                                        type="text"
                                        value={formData.nama}
                                        onChange={handleChange}
                                        placeholder="Masukkan nama lengkap"
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1 block">
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="contoh@email.com"
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
                                        required
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
                                        placeholder="username"
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="jenisKelamin" className="text-sm font-medium text-gray-700 mb-1 block">
                                        Jenis Kelamin
                                    </Label>
                                    <Select onValueChange={(value) => handleSelectChange('jenisKelamin', value)}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Pilih Gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="laki-laki">Laki-laki</SelectItem>
                                            <SelectItem value="perempuan">Perempuan</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label htmlFor="tanggalLahir" className="text-sm font-medium text-gray-700 mb-1 block">
                                        Tanggal Lahir
                                    </Label>
                                    <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                id="tanggalLahir"
                                                className="w-full justify-between font-normal px-3 py-2 h-auto border-gray-200 hover:border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
                                            >
                                                {selectedDate ? selectedDate.toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric'
                                                }) : "Pilih tanggal lahir"}
                                                <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={selectedDate}
                                                captionLayout="dropdown"
                                                onSelect={handleDateSelect}
                                                fromYear={1950}
                                                toYear={new Date().getFullYear()}
                                                defaultMonth={selectedDate || new Date(2000, 0)}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                <div>
                                    <Label htmlFor="provinsi" className="text-sm font-medium text-gray-700 mb-1 block">
                                        Provinsi
                                    </Label>
                                    <Input
                                        id="provinsi"
                                        name="provinsi"
                                        type="text"
                                        value={formData.provinsi}
                                        onChange={handleChange}
                                        placeholder="Masukkan provinsi"
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="kabupatenKota" className="text-sm font-medium text-gray-700 mb-1 block">
                                        Kabupaten / Kota
                                    </Label>
                                    <Input
                                        id="kabupatenKota"
                                        name="kabupatenKota"
                                        type="text"
                                        value={formData.kabupatenKota}
                                        onChange={handleChange}
                                        placeholder="Masukkan kabupaten/kota"
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={!isFormValid() || isLoading}
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

export default ProfileSetup