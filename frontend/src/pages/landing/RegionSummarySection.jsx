import React, { useEffect, useState, useMemo } from 'react';

import { 
    Users, 
    Truck, 
    CircleDollarSign, 
    ShoppingBag, 
    MapPin, 
    X 
} from 'lucide-react';

import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle 
} from '@/components/ui/card';

import { 
    Select, 
    SelectContent, 
    SelectGroup, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select';

import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { apiInstanceExpress } from '@/services/apiInstance';

const RegionSummarySection = () => {
    const [data, setData] = useState({
        farmers: [],
        distributors: [],
        investors: [],
        buyers: []
    });

    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedSubDistrict, setSelectedSubDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await apiInstanceExpress.get("admin/get/summary");
                
                if (response.status === 200) {
                    setData({
                        farmers: response.data.data.farmers || [],
                        distributors: response.data.data.distributors || [],
                        investors: response.data.data.investors || [],
                        buyers: response.data.data.buyers || []
                    });
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filterOptions = useMemo(() => {
        const allUsers = [
            ...data.farmers,
            ...data.distributors,
            ...data.investors,
            ...data.buyers
        ];

        const provinces = [...new Set(allUsers.map(u => u.province).filter(Boolean))];
        const cities = [...new Set(allUsers.map(u => u.city).filter(Boolean))];
        const subDistricts = [...new Set(allUsers.map(u => u.subDistrict).filter(Boolean))];
        const wards = [...new Set(allUsers.map(u => u.ward).filter(Boolean))];

        return { 
            provinces: provinces.sort(), 
            cities: cities.sort(), 
            subDistricts: subDistricts.sort(), 
            wards: wards.sort() 
        };
    }, [data]);

    const filteredData = useMemo(() => {
        const filterUsers = (users) => {
            return users.filter(user => {
                if (selectedProvince && user.province !== selectedProvince) return false;
                if (selectedCity && user.city !== selectedCity) return false;
                if (selectedSubDistrict && user.subDistrict !== selectedSubDistrict) return false;
                if (selectedWard && user.ward !== selectedWard) return false;
                return true;
            });
        };

        return {
            farmers: filterUsers(data.farmers),
            distributors: filterUsers(data.distributors),
            investors: filterUsers(data.investors),
            buyers: filterUsers(data.buyers)
        };
    }, [data, selectedProvince, selectedCity, selectedSubDistrict, selectedWard]);

    const hasActiveFilter = selectedProvince || selectedCity || selectedSubDistrict || selectedWard;

    const resetFilters = () => {
        setSelectedProvince('');
        setSelectedCity('');
        setSelectedSubDistrict('');
        setSelectedWard('');
    };

    const summaryCards = [
        {
            title: 'Petani',
            count: filteredData.farmers.length,
            icon: Users,
            color: 'text-green-500',
            bgColor: 'bg-green-50',
            description: 'Petani terdaftar'
        },
        {
            title: 'Distributor',
            count: filteredData.distributors.length,
            icon: Truck,
            color: 'text-blue-500',
            bgColor: 'bg-blue-50',
            description: 'Distributor aktif'
        },
        {
            title: 'Investor',
            count: filteredData.investors.length,
            icon: CircleDollarSign,
            color: 'text-purple-500',
            bgColor: 'bg-purple-50',
            description: 'Investor bergabung'
        },
        {
            title: 'Pembeli',
            count: filteredData.buyers.length,
            icon: ShoppingBag,
            color: 'text-orange-500',
            bgColor: 'bg-orange-50',
            description: 'Pembeli terdaftar'
        }
    ];

    if (loading) {
        return (
            <section className="w-full py-16 px-4 sm:px-6 lg:px-20 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center">
                        <p className="text-gray-500">Memuat data...</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full py-12 md:py-16 px-4 sm:px-6 lg:px-20 bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Jangkauan Platform Kami
                    </h2>
                    <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                        Platform yang menghubungkan seluruh ekosistem pertanian di Indonesia
                    </p>
                </div>

                {/* Filter Section */}
                <div className="mb-12">
                    <Card className="shadow-md">
                        <CardHeader className="pb-4">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-5 w-5 text-gray-500 flex-shrink-0" />
                                    <CardTitle className="text-base md:text-lg">Filter Berdasarkan Wilayah</CardTitle>
                                </div>
                                {hasActiveFilter && (
                                    <Button 
                                        variant="outline" 
                                        size="sm" 
                                        onClick={resetFilters}
                                        className="gap-2 w-full sm:w-auto"
                                    >
                                        <X className="h-4 w-4" />
                                        Reset Filter
                                    </Button>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div>
                                    <Label className="text-sm font-medium mb-2 block">Provinsi</Label>
                                    <Select
                                        value={selectedProvince || 'all'}
                                        onValueChange={(value) => {
                                            setSelectedProvince(value === 'all' ? '' : value);
                                            setSelectedCity('');
                                            setSelectedSubDistrict('');
                                            setSelectedWard('');
                                        }}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Semua Provinsi" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="all">Semua Provinsi</SelectItem>
                                                {filterOptions.provinces.map(province => (
                                                    <SelectItem key={province} value={province}>
                                                        {province}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label className="text-sm font-medium mb-2 block">Kabupaten/Kota</Label>
                                    <Select
                                        value={selectedCity || 'all'}
                                        onValueChange={(value) => {
                                            setSelectedCity(value === 'all' ? '' : value);
                                            setSelectedSubDistrict('');
                                            setSelectedWard('');
                                        }}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Semua Kota" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="all">Semua Kota</SelectItem>
                                                {filterOptions.cities.map(city => (
                                                    <SelectItem key={city} value={city}>
                                                        {city}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label className="text-sm font-medium mb-2 block">Kecamatan</Label>
                                    <Select
                                        value={selectedSubDistrict || 'all'}
                                        onValueChange={(value) => {
                                            setSelectedSubDistrict(value === 'all' ? '' : value);
                                            setSelectedWard('');
                                        }}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Semua Kecamatan" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="all">Semua Kecamatan</SelectItem>
                                                {filterOptions.subDistricts.map(subDistrict => (
                                                    <SelectItem key={subDistrict} value={subDistrict}>
                                                        {subDistrict}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label className="text-sm font-medium mb-2 block">Kelurahan/Desa</Label>
                                    <Select
                                        value={selectedWard || 'all'}
                                        onValueChange={(value) => setSelectedWard(value === 'all' ? '' : value)}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Semua Desa" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="all">Semua Desa</SelectItem>
                                                {filterOptions.wards.map(ward => (
                                                    <SelectItem key={ward} value={ward}>
                                                        {ward}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {hasActiveFilter && (
                                <div className="mt-4 pt-4 border-t">
                                    <p className="text-sm text-gray-600">
                                        Menampilkan data untuk:{' '}
                                        <span className="font-semibold text-gray-900">
                                            {[selectedProvince, selectedCity, selectedSubDistrict, selectedWard]
                                                .filter(Boolean)
                                                .join(' → ') || 'Semua Wilayah'}
                                        </span>
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Summary Cards Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {summaryCards.map((card, index) => {
                        const Icon = card.icon;
                        return (
                            <Card 
                                key={index} 
                                className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                            >
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-base md:text-lg font-semibold text-gray-800">
                                            {card.title}
                                        </CardTitle>
                                        <div className={`${card.bgColor} p-3 rounded-lg flex-shrink-0`}>
                                            <Icon className={`h-5 w-5 md:h-6 md:w-6 ${card.color}`} />
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-1">
                                        <p className="text-3xl md:text-4xl font-bold text-gray-900">
                                            {card.count.toLocaleString('id-ID')}
                                        </p>
                                        <p className="text-xs md:text-sm text-gray-500">
                                            {card.description}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default RegionSummarySection;