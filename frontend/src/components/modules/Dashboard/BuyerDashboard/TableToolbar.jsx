import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
    provinces,
    cities,
    subDistricts,
    wards
}) => {
    return (
        <div className="flex flex-col gap-4 rounded-lg border bg-white p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Cari pembeli..."
                        value={searchQuery}
                        onChange={onSearchChange}
                        className="h-10 w-full rounded-md border border-gray-300 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
        </div>
    );
};

export default TableToolbar;