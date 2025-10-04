import React from 'react';
import { Search } from 'lucide-react';

import {
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";

const TableToolbar = ({ 
    searchQuery,
    onSearchChange,
    filterProvince,
    onFilterProvinceChange,
    filterCity,
    onFilterCityChange,
    filterSubDistrict,
    onFilterSubDistrictChange,
    filterWard,
    onFilterWardChange,
    provinces = [],
    cities = [],
    subDistricts = [],
    wards = []
}) => {
    return (
        <div className="flex flex-col gap-4">
            <div className="relative w-full">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Cari pengguna berdasarkan NIK atau nama..."
                    className="pl-9 w-full"
                    value={searchQuery}
                    onChange={onSearchChange}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                <Select value={filterProvince} onValueChange={onFilterProvinceChange}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Filter Provinsi" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Semua Provinsi</SelectItem>
                        {provinces.map((province) => (
                            <SelectItem key={province.id} value={province.id}>
                                {province.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select 
                    value={filterCity} 
                    onValueChange={onFilterCityChange}
                    disabled={filterProvince === 'all' || cities.length === 0}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Filter Kota/Kabupaten" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Semua Kota/Kabupaten</SelectItem>
                        {cities.map((city) => (
                            <SelectItem key={city.id} value={city.id}>
                                {city.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select 
                    value={filterSubDistrict} 
                    onValueChange={onFilterSubDistrictChange}
                    disabled={filterCity === 'all' || subDistricts.length === 0}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Filter Kecamatan" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Semua Kecamatan</SelectItem>
                        {subDistricts.map((subDistrict) => (
                            <SelectItem key={subDistrict.id} value={subDistrict.id}>
                                {subDistrict.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select 
                    value={filterWard} 
                    onValueChange={onFilterWardChange}
                    disabled={filterSubDistrict === 'all' || wards.length === 0}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Filter Desa/Kelurahan" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Semua Desa/Kelurahan</SelectItem>
                        {wards.map((ward) => (
                            <SelectItem key={ward.id} value={ward.id}>
                                {ward.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default TableToolbar;