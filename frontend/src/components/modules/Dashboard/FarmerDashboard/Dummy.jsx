import {
    ChevronLeft, 
    ChevronRight, 
    Eye, 
    MoreHorizontal, 
    Pencil, 
    Search,
    Trash2,
    UserX,
    X
} from 'lucide-react'

import React, { useEffect, useState } from 'react'

import { 
    Table, 
    TableBody,
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from '@/components/ui/table'

import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'

import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select'

import EachUtils from '@/utils/EachUtils'
import { Input } from '@/components/ui/input'
import { getInitial } from '@/utils/getInitial'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'
import { apiInstanceExpress } from '@/services/apiInstance'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import DashboardLayout from '@/components/layouts/DashboardLayout'

const Farmers = () => {
    const { currentUser } = useAuth();
    const [farmers, setFarmers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    // Search & Filter states
    const [searchQuery, setSearchQuery] = useState("");
    const [filterCity, setFilterCity] = useState("all");
    const [filterSubDistrict, setFilterSubDistrict] = useState("all");
    const [filterWard, setFilterWard] = useState("all");
    
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 10,
        hasNextPage: false,
        hasPrevPage: false
    });
    
    // Options for filters
    const [cities, setCities] = useState(['all']);
    const [subDistricts, setSubDistricts] = useState(['all']);
    const [wards, setWards] = useState(['all']);

    // Fetch farmers data
    const getAllFarmers = async () => {
        if (!currentUser) return;
        
        setIsLoading(true);
        try {
            const token = await currentUser.getIdToken();
            const params = {
                page: currentPage,
                limit: 10,
                search: searchQuery,
                city: filterCity !== 'all' ? filterCity : '',
                subDistrict: filterSubDistrict !== 'all' ? filterSubDistrict : '',
                ward: filterWard !== 'all' ? filterWard : ''
            };
            
            const response = await apiInstanceExpress.get("admin/get/farmer", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params
            });

            if (response.status === 200) {
                const responseData = response.data.data;
                const farmersData = responseData.data || [];
                const paginationData = responseData.pagination || {};
                
                setFarmers(farmersData);
                setPagination(paginationData);
                
                // Extract unique values for filters
                if (farmersData.length > 0) {
                    const uniqueCities = ['all', ...new Set(farmersData
                        .map(f => f.farmerDetail?.city)
                        .filter(Boolean))];
                    const uniqueSubDistricts = ['all', ...new Set(farmersData
                        .map(f => f.farmerDetail?.subDistrict)
                        .filter(Boolean))];
                    const uniqueWards = ['all', ...new Set(farmersData
                        .map(f => f.farmerDetail?.ward)
                        .filter(Boolean))];
                    
                    setCities(uniqueCities);
                    setSubDistricts(uniqueSubDistricts);
                    setWards(uniqueWards);
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch on mount and when dependencies change
    useEffect(() => {
        getAllFarmers();
    }, [currentUser, currentPage, searchQuery, filterCity, filterSubDistrict, filterWard]);

    // Reset to page 1 when search/filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, filterCity, filterSubDistrict, filterWard]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleClearSearch = () => {
        setSearchQuery("");
    };

    const hasActiveFilters = searchQuery || 
        filterCity !== 'all' || 
        filterSubDistrict !== 'all' || 
        filterWard !== 'all';

    const displayStart = farmers.length > 0 ? (currentPage - 1) * pagination.itemsPerPage + 1 : 0;
    const displayEnd = Math.min(currentPage * pagination.itemsPerPage, pagination.totalItems);

    return (
        <DashboardLayout>
            <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="flex gap-4 justify-between flex-wrap">
                    <div className="flex-1 relative min-w-[200px]">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Cari berdasarkan NIK" 
                            className="pl-9 pr-9 md:w-2/3"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button
                                onClick={handleClearSearch}
                                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>
                    
                    <div className="flex gap-2 justify-end flex-wrap items-center">
                        <Select value={filterCity} onValueChange={setFilterCity}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter Kota" />
                            </SelectTrigger>
                            <SelectContent>
                                {cities.map(city => (
                                    <SelectItem key={city} value={city}>
                                        {city === 'all' ? 'Semua Kota' : city}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={filterSubDistrict} onValueChange={setFilterSubDistrict}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter Kecamatan" />
                            </SelectTrigger>
                            <SelectContent>
                                {subDistricts.map(subDistrict => (
                                    <SelectItem key={subDistrict} value={subDistrict}>
                                        {subDistrict === 'all' ? 'Semua Kecamatan' : subDistrict}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={filterWard} onValueChange={setFilterWard}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter Desa" />
                            </SelectTrigger>
                            <SelectContent>
                                {wards.map(ward => (
                                    <SelectItem key={ward} value={ward}>
                                        {ward === 'all' ? 'Semua Desa' : ward}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nama</TableHead>
                                <TableHead>NIK</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Kota</TableHead>
                                <TableHead>Kecamatan</TableHead>
                                <TableHead>Desa</TableHead>
                                <TableHead>Luas Lahan</TableHead>
                                <TableHead>Kelompok Tani</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={9} className="text-center py-6 text-muted-foreground">
                                        Memuat data...
                                    </TableCell>
                                </TableRow>
                            ) : farmers.length > 0 ? (
                                <EachUtils
                                    of={farmers}
                                    render={(farmer, index) => (
                                        <TableRow key={farmer._id || index}>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-2">
                                                    <Avatar className="w-10 h-10">
                                                        <AvatarFallback className="bg-gray-200">{getInitial(farmer.fullName)}</AvatarFallback>
                                                    </Avatar>
                                                    {farmer.fullName}
                                                </div>
                                            </TableCell>

                                            <TableCell>{farmer.NIK || "-"}</TableCell>
                                            <TableCell>{farmer.role || "-"}</TableCell>
                                            <TableCell>{farmer.farmerDetail?.city || "-"}</TableCell>
                                            <TableCell>{farmer.farmerDetail?.subDistrict || "-"}</TableCell>
                                            <TableCell>{farmer.farmerDetail?.ward || "-"}</TableCell>
                                            <TableCell>
                                                {farmer.farmerDetail?.lands && farmer.farmerDetail.lands.length > 0 ? (
                                                    <EachUtils 
                                                        of={farmer.farmerDetail.lands}
                                                        render={(item, idx) => (
                                                            <p key={idx}>{item.landArea || "-"} ha</p>
                                                        )}
                                                    />
                                                ) : "-"}
                                            </TableCell>
                                            <TableCell>{farmer.farmerDetail?.farmerGroup || "-"}</TableCell>

                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="cursor-pointer">
                                                            <MoreHorizontal size={16} />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem 
                                                            // onClick={() => handleViewDetail(farmer)}
                                                            className="flex items-center gap-2 cursor-pointer"
                                                        >
                                                            <Eye size={14} />
                                                            Lihat Detail
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem 
                                                            // onClick={() => handleEditClick(farmer)}
                                                            className="flex items-center gap-2 cursor-pointer"
                                                        >
                                                            <Pencil size={14} />
                                                            Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem 
                                                            className="flex items-center gap-2 text-red-600 cursor-pointer"
                                                            // onClick={() => onDelete(user)}
                                                        >
                                                            <UserX size={14} />
                                                            <span>Hapus User</span>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                />
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={9} className="text-center py-6 text-muted-foreground">
                                        {hasActiveFilters 
                                            ? "Tidak ada data yang sesuai dengan pencarian atau filter."
                                            : "Tidak ada pengguna ditemukan."
                                        }
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    {farmers.length > 0 && (
                        <div className="flex items-center justify-between px-4 py-3 border-t">
                            <div className="text-sm text-muted-foreground">
                                Menampilkan {displayStart} - {displayEnd} dari {pagination.totalItems} pengguna
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">
                                    Halaman {currentPage} dari {pagination.totalPages}
                                </span>
                                <div className="flex gap-1">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={!pagination.hasPrevPage || isLoading}
                                    >
                                        <ChevronLeft size={16} />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={!pagination.hasNextPage || isLoading}
                                    >
                                        <ChevronRight size={16} />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Farmers