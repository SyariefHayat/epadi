import React, { useState, useMemo } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Download, Eye, Edit, Trash2 } from "lucide-react"

// Data dummy untuk testing
const dummyFarmers = [
    {
        _id: "1",
        user: {
            _id: "u1",
            fullName: "Ahmad Sutrisno",
            NIK: "3201234567890123",
            email: "ahmad@example.com"
        },
        dateOfBirth: new Date("1980-05-15"),
        gender: "Laki-laki",
        phone: "081234567890",
        postalCode: "16153",
        province: "Jawa Barat",
        city: "Bogor",
        subDistrict: "Cibinong",
        ward: "Sukahati",
        address: "Jl. Raya Sukahati No. 123",
        landArea: 2.5,
        riceVariety: "IR64",
        estimatedHarvest: 7.5,
        howLongBecomeFarmer: "15 tahun",
        landOwnership: "Milik Sendiri",
        landLocation: "Sawah Sukahati",
        plantingSeason: "Musim Hujan 2024",
        farmerGroup: "Tani Maju Sukahati",
        farmerCardNumber: "KT001234567",
        createdAt: new Date("2024-01-15"),
        updatedAt: new Date("2024-01-15")
    },
    {
        _id: "2",
        user: {
            _id: "u2",
            fullName: "Siti Fatimah",
            NIK: "3301234567890124",
            email: "siti@example.com"
        },
        dateOfBirth: new Date("1985-08-20"),
        gender: "Perempuan",
        phone: "081987654321",
        postalCode: "50123",
        province: "Jawa Tengah",
        city: "Semarang",
        subDistrict: "Tembalang",
        ward: "Bulusan",
        address: "Jl. Bulusan Raya No. 456",
        landArea: 1.8,
        riceVariety: "Ciherang",
        estimatedHarvest: 5.4,
        howLongBecomeFarmer: "10 tahun",
        landOwnership: "Sewa",
        landLocation: "Sawah Bulusan",
        plantingSeason: "Musim Kemarau 2024",
        farmerGroup: "Tani Sejahtera Bulusan",
        farmerCardNumber: "KT001234568",
        createdAt: new Date("2024-02-10"),
        updatedAt: new Date("2024-02-10")
    },
    {
        _id: "3",
        user: {
            _id: "u3",
            fullName: "Bambang Wijaya",
            NIK: "3501234567890125",
            email: "bambang@example.com"
        },
        dateOfBirth: new Date("1975-12-03"),
        gender: "Laki-laki",
        phone: "081122334455",
        postalCode: "60111",
        province: "Jawa Timur",
        city: "Surabaya",
        subDistrict: "Gubeng",
        ward: "Airlangga",
        address: "Jl. Airlangga No. 789",
        landArea: 3.2,
        riceVariety: "Pandan Wangi",
        estimatedHarvest: 9.6,
        howLongBecomeFarmer: "20 tahun",
        landOwnership: "Milik Sendiri",
        landLocation: "Sawah Airlangga",
        plantingSeason: "Musim Hujan 2024",
        farmerGroup: "Tani Mandiri Airlangga",
        createdAt: new Date("2024-01-20"),
        updatedAt: new Date("2024-01-20")
    },
    {
        _id: "4",
        user: {
            _id: "u4",
            fullName: "Dewi Sartika",
            NIK: "3201234567890126",
            email: "dewi@example.com"
        },
        dateOfBirth: new Date("1990-03-10"),
        gender: "Perempuan",
        phone: "081555666777",
        postalCode: "16153",
        province: "Jawa Barat",
        city: "Bogor",
        subDistrict: "Cileungsi",
        ward: "Cileungsi Kidul",
        address: "Jl. Cileungsi Raya No. 321",
        landArea: 1.5,
        riceVariety: "IR64",
        estimatedHarvest: 4.5,
        howLongBecomeFarmer: "8 tahun",
        landOwnership: "Bagi Hasil",
        landLocation: "Sawah Cileungsi",
        plantingSeason: "Musim Kemarau 2024",
        farmerGroup: "Tani Bersama Cileungsi",
        farmerCardNumber: "KT001234569",
        createdAt: new Date("2024-03-05"),
        updatedAt: new Date("2024-03-05")
    }
]

const UserTable = () => {
    const [farmers] = useState(dummyFarmers)
    const [searchNIK, setSearchNIK] = useState("")
    const [selectedProvince, setSelectedProvince] = useState("")
    const [selectedCity, setSelectedCity] = useState("")
    const [selectedSubDistrict, setSelectedSubDistrict] = useState("")
    const [selectedWard, setSelectedWard] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    // Get unique values for filters
    const provinces = useMemo(() => {
        return Array.from(new Set(farmers.map(farmer => farmer.province)))
    }, [farmers])

    const cities = useMemo(() => {
        return Array.from(new Set(
            farmers
                .filter(farmer => !selectedProvince || selectedProvince === "all" || farmer.province === selectedProvince)
                .map(farmer => farmer.city)
        ))
    }, [farmers, selectedProvince])

    const subDistricts = useMemo(() => {
        return Array.from(new Set(
            farmers
                .filter(farmer => 
                    (!selectedProvince || selectedProvince === "all" || farmer.province === selectedProvince) &&
                    (!selectedCity || selectedCity === "all" || farmer.city === selectedCity)
                )
                .map(farmer => farmer.subDistrict)
        ))
    }, [farmers, selectedProvince, selectedCity])

    const wards = useMemo(() => {
        return Array.from(new Set(
            farmers
                .filter(farmer => 
                    (!selectedProvince || selectedProvince === "all" || farmer.province === selectedProvince) &&
                    (!selectedCity || selectedCity === "all" || farmer.city === selectedCity) &&
                    (!selectedSubDistrict || selectedSubDistrict === "all" || farmer.subDistrict === selectedSubDistrict)
                )
                .map(farmer => farmer.ward)
        ))
    }, [farmers, selectedProvince, selectedCity, selectedSubDistrict])

    // Filter farmers based on search criteria
    const filteredFarmers = useMemo(() => {
        return farmers.filter(farmer => {
            const matchesNIK = !searchNIK || farmer.user.NIK.toLowerCase().includes(searchNIK.toLowerCase())
            const matchesProvince = !selectedProvince || selectedProvince === "all" || farmer.province === selectedProvince
            const matchesCity = !selectedCity || selectedCity === "all" || farmer.city === selectedCity
            const matchesSubDistrict = !selectedSubDistrict || selectedSubDistrict === "all" || farmer.subDistrict === selectedSubDistrict
            const matchesWard = !selectedWard || selectedWard === "all" || farmer.ward === selectedWard

            return matchesNIK && matchesProvince && matchesCity && matchesSubDistrict && matchesWard
        })
    }, [farmers, searchNIK, selectedProvince, selectedCity, selectedSubDistrict, selectedWard])

    // Pagination
    const totalPages = Math.ceil(filteredFarmers.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedFarmers = filteredFarmers.slice(startIndex, startIndex + itemsPerPage)

    // Clear filters
    const clearFilters = () => {
        setSearchNIK("")
        setSelectedProvince("all")
        setSelectedCity("all")
        setSelectedSubDistrict("all")
        setSelectedWard("all")
        setCurrentPage(1)
    }

    // Format date
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('id-ID')
    }

    // Calculate age
    const calculateAge = (birthDate) => {
        const today = new Date()
        const birth = new Date(birthDate)
        let age = today.getFullYear() - birth.getFullYear()
        const monthDiff = today.getMonth() - birth.getMonth()
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--
        }
        return age
    }

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Data Petani</h1>
                    <p className="text-gray-600">Kelola data petani yang terdaftar</p>
                </div>
                <Button className="bg-green-600 hover:bg-green-700">
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                </Button>
            </div>

            {/* Filters */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Filter className="w-5 h-5" />
                        Filter Data
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                        {/* Search NIK */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Cari NIK</label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <Input
                                    placeholder="Masukkan NIK..."
                                    value={searchNIK}
                                    onChange={(e) => setSearchNIK(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        {/* Province Filter */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Provinsi</label>
                            <Select value={selectedProvince} onValueChange={setSelectedProvince}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih provinsi" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua Provinsi</SelectItem>
                                    {provinces.map(province => (
                                        <SelectItem key={province} value={province}>
                                            {province}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* City Filter */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Kota/Kabupaten</label>
                            <Select value={selectedCity} onValueChange={setSelectedCity} disabled={!selectedProvince || selectedProvince === "all"}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih kota" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua Kota</SelectItem>
                                    {cities.map(city => (
                                        <SelectItem key={city} value={city}>
                                            {city}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Sub District Filter */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Kecamatan</label>
                            <Select 
                                value={selectedSubDistrict} 
                                onValueChange={setSelectedSubDistrict} 
                                disabled={!selectedCity || selectedCity === "all"}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih kecamatan" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua Kecamatan</SelectItem>
                                    {subDistricts.map(subDistrict => (
                                        <SelectItem key={subDistrict} value={subDistrict}>
                                            {subDistrict}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Ward Filter */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Desa/Kelurahan</label>
                            <Select 
                                value={selectedWard} 
                                onValueChange={setSelectedWard} 
                                disabled={!selectedSubDistrict || selectedSubDistrict === "all"}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih desa" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua Desa</SelectItem>
                                    {wards.map(ward => (
                                        <SelectItem key={ward} value={ward}>
                                            {ward}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Clear Filters Button */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium invisible">Clear</label>
                            <Button 
                                variant="outline" 
                                onClick={clearFilters}
                                className="w-full"
                            >
                                Reset Filter
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Results Summary */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                    Menampilkan {paginatedFarmers.length} dari {filteredFarmers.length} data petani
                </p>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Halaman:</span>
                    <Select value={currentPage.toString()} onValueChange={(value) => setCurrentPage(parseInt(value))}>
                        <SelectTrigger className="w-20">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <SelectItem key={i + 1} value={(i + 1).toString()}>
                                    {i + 1}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <span className="text-sm text-gray-600">dari {totalPages}</span>
                </div>
            </div>

            {/* Table */}
            <Card>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50">
                                    <TableHead className="w-12">#</TableHead>
                                    <TableHead className="min-w-[200px]">Nama & NIK</TableHead>
                                    <TableHead className="min-w-[120px]">Personal</TableHead>
                                    <TableHead className="min-w-[200px]">Alamat</TableHead>
                                    <TableHead className="min-w-[180px]">Data Pertanian</TableHead>
                                    <TableHead className="min-w-[150px]">Kelompok Tani</TableHead>
                                    <TableHead className="min-w-[120px]">Terdaftar</TableHead>
                                    <TableHead className="w-32 text-center">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedFarmers.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                                            Tidak ada data petani ditemukan
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    paginatedFarmers.map((farmer, index) => (
                                        <TableRow key={farmer._id} className="hover:bg-gray-50">
                                            <TableCell className="font-medium">
                                                {startIndex + index + 1}
                                            </TableCell>
                                            <TableCell>
                                                <div className="space-y-1">
                                                    <p className="font-medium text-gray-900">
                                                        {farmer.user.fullName}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        NIK: {farmer.user.NIK}
                                                    </p>
                                                    {farmer.farmerCardNumber && (
                                                        <Badge variant="secondary" className="text-xs">
                                                            {farmer.farmerCardNumber}
                                                        </Badge>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="space-y-1">
                                                    <p className="text-sm">
                                                        <Badge 
                                                            variant={farmer.gender === "Laki-laki" ? "default" : "secondary"}
                                                            className="text-xs"
                                                        >
                                                            {farmer.gender}
                                                        </Badge>
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        {calculateAge(farmer.dateOfBirth)} tahun
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        {farmer.phone}
                                                    </p>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="space-y-1 text-sm">
                                                    <p className="font-medium">{farmer.province}</p>
                                                    <p className="text-gray-600">{farmer.city}</p>
                                                    <p className="text-gray-600">{farmer.subDistrict}</p>
                                                    <p className="text-gray-600">{farmer.ward}</p>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="space-y-1 text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <Badge variant="outline" className="text-xs">
                                                            {farmer.landArea} ha
                                                        </Badge>
                                                        <Badge variant="outline" className="text-xs">
                                                            {farmer.estimatedHarvest} ton
                                                        </Badge>
                                                    </div>
                                                    <p className="text-gray-600">{farmer.riceVariety}</p>
                                                    <p className="text-gray-600 text-xs">{farmer.landOwnership}</p>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="space-y-1 text-sm">
                                                    <p className="font-medium">{farmer.farmerGroup}</p>
                                                    <p className="text-gray-600 text-xs">
                                                        {farmer.howLongBecomeFarmer}
                                                    </p>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="space-y-1 text-sm">
                                                    <p className="text-gray-900">
                                                        {formatDate(farmer.createdAt)}
                                                    </p>
                                                    <Badge variant="secondary" className="text-xs">
                                                        {farmer.plantingSeason}
                                                    </Badge>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center justify-center gap-1">
                                                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between">
                    <Button
                        variant="outline"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Sebelumnya
                    </Button>
                    <div className="flex items-center gap-2">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            let pageNum
                            if (totalPages <= 5) {
                                pageNum = i + 1
                            } else if (currentPage <= 3) {
                                pageNum = i + 1
                            } else if (currentPage >= totalPages - 2) {
                                pageNum = totalPages - 4 + i
                            } else {
                                pageNum = currentPage - 2 + i
                            }

                            return (
                                <Button
                                    key={pageNum}
                                    variant={currentPage === pageNum ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setCurrentPage(pageNum)}
                                    className="w-10"
                                >
                                    {pageNum}
                                </Button>
                            )
                        })}
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Selanjutnya
                    </Button>
                </div>
            )}
        </div>
    )
}

export default UserTable