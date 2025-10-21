import axios from 'axios';
import { useState, useEffect } from 'react';

import { useAuth } from '@/context/AuthContext';
import { apiInstanceExpress } from '@/services/apiInstance';

export const useBuyer = () => {
    const { currentUser } = useAuth();

    const [isLoading, setIsLoading] = useState(false);
    const [allBuyers, setAllBuyers] = useState([]);
    const [pagination, setPagination] = useState({
        total: 0,
        totalPages: 0,
        currentPage: 1,
        limit: 10
    });
    
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    
    // Location filters
    const [filterProvince, setFilterProvince] = useState('all');
    const [filterCity, setFilterCity] = useState('all');
    const [filterSubDistrict, setFilterSubDistrict] = useState('all');
    const [filterWard, setFilterWard] = useState('all');

    // Location options
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [subDistricts, setSubDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    // Reset functions
    const resetCityAndBelow = () => {
        setFilterCity('');
        setFilterSubDistrict('');
        setFilterWard('');
        setCities([]);
        setSubDistricts([]);
        setWards([]);
    };

    const resetSubDistrictAndBelow = () => {
        setFilterSubDistrict('');
        setFilterWard('');
        setSubDistricts([]);
        setWards([]);
    };

    const resetWard = () => {
        setFilterWard('');
        setWards([]);
    };

    // Fetch provinces
    useEffect(() => {
        const fetchProvinces = async () => {
            if (!currentUser) return;
                        
            try {
                const token = await currentUser.getIdToken();
                const response = await apiInstanceExpress.get('location/provinces', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                if (response.status === 200) {
                    setProvinces(response.data.data || []);
                }
            } catch (error) {
                console.error('Error fetching provinces:', error);
            }
        };

        fetchProvinces();
    }, [currentUser]);

    // Fetch cities when province changes
    useEffect(() => {
        const fetchCities = async () => {
            if (!currentUser || filterProvince === 'all') {
                setCities([]);
                return;
            }
            
            try {
                const token = await currentUser.getIdToken();
                const response = await apiInstanceExpress.get(`location/cities?provinceId=${filterProvince}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                if (response.status === 200) {
                    setCities(response.data.data || []);
                }
            } catch (error) {
                console.error('Error fetching cities:', error);
                setCities([]);
            }
        };
        
        fetchCities();
    }, [currentUser, filterProvince]);

    // Fetch sub-districts when city changes
    useEffect(() => {
        const fetchSubDistricts = async () => {
            if (!currentUser || filterCity === 'all') {
                setSubDistricts([]);
                return;
            }
            
            try {
                const token = await currentUser.getIdToken();
                const response = await apiInstanceExpress.get(`location/sub-districts?cityId=${filterCity}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                if (response.status === 200) {
                    setSubDistricts(response.data.data || []);
                }
            } catch (error) {
                console.error('Error fetching sub-districts:', error);
                setSubDistricts([]);
            }
        };
    
        fetchSubDistricts();
    }, [currentUser, filterCity]);

    // Fetch wards when sub-district changes
    useEffect(() => {
        const fetchWards = async () => {
            if (!currentUser || filterSubDistrict === 'all') {
                setWards([]);
                return;
            }
            
            try {
                const token = await currentUser.getIdToken();
                const response = await apiInstanceExpress.get(`location/wards?subDistrictId=${filterSubDistrict}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                if (response.status === 200) {
                    setWards(response.data.data || []);
                }
            } catch (error) {
                console.error('Error fetching wards:', error);
                setWards([]);
            }
        };
    
        fetchWards();
    }, [currentUser, filterSubDistrict]);

    // Fetch buyers
    // useEffect(() => {
    //     const fetchBuyers = async () => {
    //         if (!currentUser) return;
    //         setIsLoading(true);
    //         try {
    //             const token = await currentUser.getIdToken();

    //             const params = {
    //                 page: currentPage,
    //                 limit: pagination.limit,
    //                 search: searchQuery,
    //                 province: filterProvince,
    //                 city: filterCity,
    //                 subDistrict: filterSubDistrict,
    //                 ward: filterWard
    //             };

    //             const response = await apiInstanceExpress.get(`admin/get/buyers?${params.toString()}`, {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`
    //                 },
    //             });
                
    //             setAllBuyers(response.data.data);
    //             setPagination({
    //                 total: response.data.pagination.total,
    //                 totalPages: response.data.pagination.totalPages,
    //                 currentPage: response.data.pagination.currentPage,
    //                 limit: response.data.pagination.limit
    //             });
    //         } catch (error) {
    //             console.error('Error fetching buyers:', error);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };

    //     fetchBuyers();
    // }, [currentPage, searchQuery, filterProvince, filterCity, filterSubDistrict, filterWard]);

    useEffect(() => {
        const getAllBuyers = async () => {
            if (!currentUser) return;
            setIsLoading(true);

            try {
                const token = await currentUser.getIdToken();
                
                const params = new URLSearchParams({
                    page: currentPage.toString(),
                    limit: '10'
                });

                if (searchQuery.trim()) {
                    params.append('search', searchQuery.trim());
                }

                if (filterProvince !== 'all') params.append('province', filterProvince);
                if (filterCity !== 'all') params.append('city', filterCity);
                if (filterSubDistrict !== 'all') params.append('subDistrict', filterSubDistrict);
                if (filterWard !== 'all') params.append('ward', filterWard);

                const response = await apiInstanceExpress.get(`admin/get/buyers?${params.toString()}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                
                if (response.status === 200) {
                    const buyers = response.data.data.data || [];

                    const mappedBuyers = buyers.map(buyer => {
                        const province = provinces.find(p => p.code === buyer.provinceCode);
                        const city = cities.find(c => c.code === buyer.cityCode);
                        const subDistrict = subDistricts.find(s => s.code === buyer.subDistrictCode);
                        const ward = wards.find(w => w.code === buyer.ward);
                        return {
                            ...buyer,
                            provinceName: province ? province.name : '-',
                            cityName: city ? city.name : '-',
                            subDistrictName: subDistrict ? subDistrict.name : '-',
                            wardName: ward ? ward.name : '-',
                        };
                    });

                    setAllBuyers(response.data.data.data || []);
                    setPagination(response.data.data.pagination);
                }
            } catch (error) {
                console.error(error);
                toast.error('Gagal memuat data pembeli');
                setAllBuyers([]);
                setPagination({
                    total: 0,
                    page: 1,
                    limit: 10,
                    totalPages: 0
                });
            } finally {
                setIsLoading(false);
            }
        };

        const timeoutId = setTimeout(() => {
            getAllBuyers();
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [currentUser, currentPage, searchQuery, filterProvince, filterCity, filterSubDistrict, filterWard]);

    return {
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
        resetWard
    };
};