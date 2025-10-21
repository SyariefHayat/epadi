import React from 'react';
import { Search } from 'lucide-react';

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
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Cari pembeli..."
                        value={searchQuery}
                        onChange={onSearchChange}
                        className="h-10 w-full rounded-md border border-gray-300 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                {/* Province Filter */}
                <select
                    value={filterProvince}
                    onChange={(e) => onFilterProvinceChange(e.target.value)}
                    className="h-10 rounded-md border border-gray-300 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                    <option value="">Semua Provinsi</option>
                    {provinces.map((province) => (
                        <option key={province.code} value={province.code}>
                            {province.name}
                        </option>
                    ))}
                </select>

                {/* City Filter */}
                <select
                    value={filterCity}
                    onChange={(e) => onFilterCityChange(e.target.value)}
                    disabled={!filterProvince}
                    className="h-10 rounded-md border border-gray-300 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                    <option value="">Semua Kota/Kab</option>
                    {cities.map((city) => (
                        <option key={city.code} value={city.code}>
                            {city.name}
                        </option>
                    ))}
                </select>

                {/* Sub-District Filter */}
                <select
                    value={filterSubDistrict}
                    onChange={(e) => onFilterSubDistrictChange(e.target.value)}
                    disabled={!filterCity}
                    className="h-10 rounded-md border border-gray-300 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                    <option value="">Semua Kecamatan</option>
                    {subDistricts.map((subDistrict) => (
                        <option key={subDistrict.code} value={subDistrict.code}>
                            {subDistrict.name}
                        </option>
                    ))}
                </select>

                {/* Ward Filter */}
                <select
                    value={filterWard}
                    onChange={(e) => onFilterWardChange(e.target.value)}
                    disabled={!filterSubDistrict}
                    className="h-10 rounded-md border border-gray-300 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                    <option value="">Semua Kelurahan</option>
                    {wards.map((ward) => (
                        <option key={ward.code} value={ward.code}>
                            {ward.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default TableToolbar;