import { useMemo, useState } from 'react';

import { 
    PieChart, 
    Pie, 
    Cell, 
    ResponsiveContainer, 
    Legend, 
    Tooltip 
} from 'recharts';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle 
} from '@/components/ui/card';

import { Label } from '@/components/ui/label';

const LandPieChart = ({ farmers }) => {
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedSubDistrict, setSelectedSubDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');

    const filterOptions = useMemo(() => {
        const provinces = [...new Set(farmers.map(f => f.province).filter(Boolean))];
        const cities = [...new Set(farmers.map(f => f.city).filter(Boolean))];
        const subDistricts = [...new Set(farmers.map(f => f.subDistrict).filter(Boolean))];
        const wards = [...new Set(farmers.map(f => f.ward).filter(Boolean))];

        return { provinces, cities, subDistricts, wards };
    }, [farmers]);

    const filteredFarmers = useMemo(() => {
        return farmers.filter(farmer => {
            if (selectedProvince && farmer.province !== selectedProvince) return false;
            if (selectedCity && farmer.city !== selectedCity) return false;
            if (selectedSubDistrict && farmer.subDistrict !== selectedSubDistrict) return false;
            if (selectedWard && farmer.ward !== selectedWard) return false;
            return true;
        });
    }, [farmers, selectedProvince, selectedCity, selectedSubDistrict, selectedWard]);

    const landData = useMemo(() => {
        const farmerLand = filteredFarmers.reduce((sum, farmer) => sum + (farmer.landArea || 0), 0);

        return [
            { name: 'Petani', value: farmerLand, color: '#22c55e' },
        ].filter(item => item.value > 0);
    }, [filteredFarmers]);

    const totalLand = landData.reduce((sum, item) => sum + item.value, 0);

    return (
        <Card className="col-span-4">
            <CardHeader>
                <CardTitle className="text-base font-medium">
                    Total Lahan Terkumpul
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1">
                        <div className="rounded-lg p-4">
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={landData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={90}
                                        paddingAngle={2}
                                        dataKey="value"
                                    >
                                        {landData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip 
                                        formatter={(value) => `${value.toLocaleString('id-ID')} m²`}
                                    />
                                    <Legend 
                                        verticalAlign="bottom" 
                                        align="center"
                                        layout="horizontal"
                                        iconType="circle"
                                        formatter={(value, entry) => (
                                            <span className="text-sm">
                                                {value}: {entry.payload.value.toLocaleString('id-ID')} m²
                                            </span>
                                        )}
                                    />
                                </PieChart>
                            </ResponsiveContainer>

                            <div className="mt-4 pt-4 border-t text-center">
                                <p className="text-sm text-muted-foreground">Total Keseluruhan</p>
                                <p className="text-3xl font-bold text-green-600">{totalLand.toLocaleString('id-ID')} m²</p>
                                <p className="text-sm text-muted-foreground mt-1">
                                    {(totalLand / 10000).toFixed(2)} hektar
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-80">
                        <div className="space-y-4">
                            <div>
                                <Label className="text-sm font-medium mb-2 block">Provinsi</Label>
                                <Select
                                    value={selectedProvince || undefined}
                                    onValueChange={(value) => setSelectedProvince(value === 'all' ? '' : value)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Semua Provinsi" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="all">Semua Provinsi</SelectItem>
                                            {filterOptions.provinces.map(province => (
                                                <SelectItem key={province} value={province}>{province}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label className="text-sm font-medium mb-2 block">Kabupaten/Kota</Label>
                                <Select
                                    value={selectedCity || undefined}
                                    onValueChange={(value) => setSelectedCity(value === 'all' ? '' : value)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Semua Kota" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="all">Semua Kota</SelectItem>
                                            {filterOptions.cities.map(city => (
                                                <SelectItem key={city} value={city}>{city}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label className="text-sm font-medium mb-2 block">Kecamatan</Label>
                                <Select
                                    value={selectedSubDistrict || undefined}
                                    onValueChange={(value) => setSelectedSubDistrict(value === 'all' ? '' : value)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Semua Kecamatan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="all">Semua Kecamatan</SelectItem>
                                            {filterOptions.subDistricts.map(subDistrict => (
                                                <SelectItem key={subDistrict} value={subDistrict}>{subDistrict}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label className="text-sm font-medium mb-2 block">Kelurahan/Desa</Label>
                                <Select
                                    value={selectedWard || undefined}
                                    onValueChange={(value) => setSelectedWard(value === 'all' ? '' : value)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Semua Desa" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="all">Semua Desa</SelectItem>
                                            {filterOptions.wards.map(ward => (
                                                <SelectItem key={ward} value={ward}>{ward}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            {(selectedProvince || selectedCity || selectedSubDistrict || selectedWard) && (
                                <div className="pt-4 border-t space-y-2">
                                    <p className="text-sm text-muted-foreground">
                                        Menampilkan <span className="font-semibold text-foreground">{filteredFarmers.length}</span> dari <span className="font-semibold text-foreground">{farmers.length}</span> petani
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default LandPieChart;