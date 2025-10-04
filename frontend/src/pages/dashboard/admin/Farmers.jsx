import React from 'react';

import { useFarmer } from '@/hooks/useFarmer';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import UserTable from '@/components/modules/Dashboard/FarmerDashboard/UserTable';
import TableToolbar from '@/components/modules/Dashboard/FarmerDashboard/TableToolbar';

const Farmers = () => {
    const { 
        isLoading, 
        allFarmers, 
        pagination, 
        currentPage, 
        setCurrentPage,
        searchQuery,
        setSearchQuery,
        filterProvince,
        setFilterProvince,
        filterCity,
        setFilterCity,
        filterSubDistrict,
        setFilterSubDistrict,
        filterWard,
        setFilterWard,
        provinces,
        cities,
        subDistricts,
        wards,
        resetCityAndBelow,
        resetSubDistrictAndBelow,
        resetWard,
    } = useFarmer();

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handleProvinceChange = (value) => {
        setFilterProvince(value);
        resetCityAndBelow();
        setCurrentPage(1);
    };

    const handleCityChange = (value) => {
        setFilterCity(value);
        resetSubDistrictAndBelow();
        setCurrentPage(1);
    };

    const handleSubDistrictChange = (value) => {
        setFilterSubDistrict(value);
        resetWard();
        setCurrentPage(1);
    };

    const handleWardChange = (value) => {
        setFilterWard(value);
        setCurrentPage(1);
    };
    
    return (
        <DashboardLayout>
            <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Data Petani</h1>
                </div>

                <TableToolbar 
                    searchQuery={searchQuery}
                    onSearchChange={handleSearchChange}
                    filterProvince={filterProvince}
                    onFilterProvinceChange={handleProvinceChange}
                    filterCity={filterCity}
                    onFilterCityChange={handleCityChange}
                    filterSubDistrict={filterSubDistrict}
                    onFilterSubDistrictChange={handleSubDistrictChange}
                    filterWard={filterWard}
                    onFilterWardChange={handleWardChange}
                    provinces={provinces}
                    cities={cities}
                    subDistricts={subDistricts}
                    wards={wards}
                />

                <UserTable 
                    farmers={allFarmers}
                    isLoading={isLoading}
                    currentPage={currentPage}
                    totalPages={pagination.totalPages}
                    totalItems={pagination.total}
                    itemsPerPage={pagination.limit}
                    onPageChange={setCurrentPage}
                    searchQuery={searchQuery}
                />
            </div>
        </DashboardLayout>
    );
};

export default Farmers;