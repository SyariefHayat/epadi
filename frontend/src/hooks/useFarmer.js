import { toast } from 'sonner';
import { useState, useEffect } from 'react';

import { useAuth } from '@/context/AuthContext';
import { apiInstanceExpress } from '@/services/apiInstance';

export const useFarmer = () => {
    const { currentUser } = useAuth();

    const [allFarmers, setAllFarmers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    const [filterCity, setFilterCity] = useState('all');
    const [filterWard, setFilterWard] = useState('all');
    const [filterProvince, setFilterProvince] = useState('all');
    const [filterSubDistrict, setFilterSubDistrict] = useState('all');

    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [subDistricts, setSubDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [pagination, setPagination] = useState({
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0
    });

    const resetCityAndBelow = () => {
        setFilterCity('all');
        setCities([]);
        resetSubDistrictAndBelow();
    };

    const resetSubDistrictAndBelow = () => {
        setFilterSubDistrict('all');
        setSubDistricts([]);
        resetWard();
    };

    const resetWard = () => {
        setFilterWard('all');
        setWards([]);
    };

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

    useEffect(() => {
        const getAllFarmers = async () => {
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

                const response = await apiInstanceExpress.get(`admin/get/farmer?${params.toString()}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });

                if (response.status === 200) {
                    setAllFarmers(response.data.data.data || []);
                    setPagination(response.data.data.pagination);
                }
            } catch (error) {
                console.error(error);
                toast.error('Gagal memuat data petani');
                setAllFarmers([]);
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
            getAllFarmers();
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [currentUser, currentPage, searchQuery, filterProvince, filterCity, filterSubDistrict, filterWard]);

    return {
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
    };
};