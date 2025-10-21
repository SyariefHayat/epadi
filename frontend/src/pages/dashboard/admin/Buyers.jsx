import React from 'react';

import { useBuyer } from '@/hooks/useBuyer';
import TableToolbar from '@/components/modules/Dashboard/BuyerDashboard/TableToolbar';
import BuyerTable from '@/components/modules/Dashboard/BuyerDashboard/BuyerTable';
import DashboardLayout from '@/components/layouts/DashboardLayout';

const Buyers = () => {
    const { 
        isLoading, 
        allBuyers, 
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
    } = useBuyer();

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
                    <h1 className="text-2xl font-bold">Data Pembeli</h1>
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

                <BuyerTable
                    buyers={allBuyers}
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

export default Buyers;