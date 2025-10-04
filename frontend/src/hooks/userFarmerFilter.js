import { useState, useMemo, useEffect } from 'react';

const equalsCI = (a, b) => 
    (a ?? "").toString().trim().toLowerCase() === (b ?? "").toString().trim().toLowerCase();

export const useFarmerFilter = () => {
    const [isLoading, setIsLoading] = useState(false);

    const [allFarmers, setAllFarmers] = useState([]);

    const [filterProvince, setFilterProvince] = useState("all");
    const [filterCity, setFilterCity] = useState("all");
    const [filterSubDistrict, setFilterSubDistrict] = useState("all");
    const [filterWard, setFilterWard] = useState("all");

    const [searchQuery, setSearchQuery] = useState("");

    const getProvinceFromFarmer = (f) => f.farmerDetail?.province ?? "";
    const getCityFromFarmer = (f) => f.farmerDetail?.city ?? "";
    const getSubDistrictFromFarmer = (f) => f.farmerDetail?.subDistrict ?? "";
    const getWardFromFarmer = (f) => f.farmerDetail?.ward ?? "";

    const filteredFarmers = useMemo(() => {
        if (!allFarmers || allFarmers.length === 0) return [];

        return allFarmers.filter(farmer => {
            if (searchQuery && searchQuery.trim()) {
                const query = searchQuery.toLowerCase().trim();
                const nik = (farmer.nik ?? "").toString().toLowerCase();
                const nama = (farmer.name ?? farmer.farmerDetail?.name ?? "").toLowerCase();
                
                const matchesSearch = nik.includes(query) || nama.includes(query);
                if (!matchesSearch) return false;
            }

            if (filterProvince !== "all") {
                const farmerProvince = getProvinceFromFarmer(farmer);
                if (!equalsCI(farmerProvince, filterProvince)) return false;
            }

            if (filterCity !== "all") {
                const farmerCity = getCityFromFarmer(farmer);
                if (!equalsCI(farmerCity, filterCity)) return false;
            }

            if (filterSubDistrict !== "all") {
                const farmerSubDistrict = getSubDistrictFromFarmer(farmer);
                if (!equalsCI(farmerSubDistrict, filterSubDistrict)) return false;
            }

            if (filterWard !== "all") {
                const farmerWard = getWardFromFarmer(farmer);
                if (!equalsCI(farmerWard, filterWard)) return false;
            }

            return true;
        });
    }, [allFarmers, searchQuery, filterProvince, filterCity, filterSubDistrict, filterWard]);

    const fetchFarmers = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/farmers');
            const data = await response.json();
            setAllFarmers(data);
        } catch (error) {
            console.error('Error fetching farmers:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const resetFilters = () => {
        setFilterProvince("all");
        setFilterCity("all");
        setFilterSubDistrict("all");
        setFilterWard("all");
        setSearchQuery("");
    };

    useEffect(() => {
        fetchFarmers();
    }, []);

    return {
        isLoading,
        
        allFarmers,
        filteredFarmers,
        
        filterProvince,
        setFilterProvince,
        filterCity,
        setFilterCity,
        filterSubDistrict,
        setFilterSubDistrict,
        filterWard,
        setFilterWard,
        
        searchQuery,
        setSearchQuery,
        
        fetchFarmers,
        resetFilters,
    };
};