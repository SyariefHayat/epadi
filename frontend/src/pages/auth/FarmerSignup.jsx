import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, Tractor, Sprout } from 'lucide-react';

import Navbar from '@/components/modules/auth/Navbar';
import { apiInstanceExpress } from '@/service/apiInstance';
import DefaultLayout from '@/components/layouts/DefaultLayout';

const FarmerRegistrationForm = () => {
    const [formData, setFormData] = useState({
        role: 'farmer',
        NIK: '',
        fullName: '',
        dateOfBirth: '',
        gender: '',
        phone: '',

        postalCode: '',
        province: '',
        city: '',
        subDistrict: '',
        ward: '',
        address: '',

        landArea: '',
        riceVariety: '',
        estimatedHarvest: '',
        howLongBecomeFarmer: '',
        landOwnership: '',
        landLocation: '',
        plantingSeason: '',
        farmerGroup: '',
        farmerCardNumber: ''
    });

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSelectChange = (name, value) => {
        setFormData(prev => ({
        ...prev,
        [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await apiInstanceExpress.post("/sign-up/farmer", formData);
            if (response.status === 201) navigate("/signup/success");
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const daftarVarietasBeras = [
        'IR64', 'Ciherang', 'Mekongga', 'Inpari 32', 'Inpari 42', 
        'Mapan P-05', 'Sertani 14', 'Situbagendit', 'Cisadane', 'Memberamo'
    ];

    const statusKepemilikan = [
        { value: 'milik_pribadi', label: 'Milik Pribadi' },
        { value: 'sewa', label: 'Sewa' },
        { value: 'bagi_hasil', label: 'Bagi Hasil' },
        { value: 'keluarga', label: 'Milik Keluarga' },
        { value: 'lainnya', label: 'Lainnya' }
    ];

    const musimTanam = [
        'Musim Hujan (MT I)',
        'Musim Kemarau (MT II)', 
        'Musim Gadu (MT III)',
        'Sepanjang Tahun'
    ];

    return (
        <DefaultLayout>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-5 mt-5 bg-gray-100">
                <div className="w-full max-w-4xl">
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"><Tractor className="w-8 h-8 text-white" /></div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">Daftar Sebagai Petani</h1>
                            <p className="text-gray-600 text-sm leading-relaxed">Bergabunglah dengan komunitas petani digital dan akses berbagai layanan untuk mengembangkan usaha tani Anda.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="bg-gray-50 rounded-xl p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                    <User className="w-5 h-5 mr-2 text-green-600" />
                                    Data Pribadi
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <label htmlFor="NIK" className="text-sm font-medium text-gray-700 mb-1 block">
                                            NIK (Nomor Induk Kependudukan) *
                                        </label>
                                        <input
                                            id="NIK"
                                            name="NIK"
                                            type="text"
                                            value={formData.NIK}
                                            onChange={handleChange}
                                            placeholder="1234567890123456"
                                            maxLength="16"
                                            pattern="[0-9]{16}"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                                            required
                                        />
                                        <p className="text-xs text-gray-500 mt-1">16 digit sesuai KTP</p>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label htmlFor="fullName" className="text-sm font-medium text-gray-700 mb-1 block">
                                            Nama Lengkap *
                                        </label>
                                        <input
                                            id="fullName"
                                            name="fullName"
                                            type="text"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            placeholder="Masukkan nama lengkap sesuai KTP"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="dateOfBirth" className="text-sm font-medium text-gray-700 mb-1 block">
                                            Tanggal Lahir *
                                        </label>
                                        <input
                                            id="dateOfBirth"
                                            name="dateOfBirth"
                                            type="date"
                                            value={formData.dateOfBirth}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-700 mb-1 block">
                                            Jenis Kelamin *
                                        </label>
                                        <select
                                            value={formData.gender}
                                            onChange={(e) => handleSelectChange('gender', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                                            required
                                        >
                                            <option value="">Pilih jenis kelamin</option>
                                            <option value="Laki-laki">Laki-laki</option>
                                            <option value="Perempuan">Perempuan</option>
                                        </select>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-1 block">
                                            Nomor Telepon
                                        </label>
                                        <input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="081234567890"
                                            pattern="[0-9]{10,15}"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                    <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                                    Alamat
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                    <label htmlFor="postalCode" className="text-sm font-medium text-gray-700 mb-1 block">
                                        Kode Pos *
                                    </label>
                                    <input
                                        id="postalCode"
                                        name="postalCode"
                                        type="text"
                                        value={formData.postalCode}
                                        onChange={handleChange}
                                        placeholder="65314"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                        required
                                    />
                                    </div>

                                    <div>
                                    <label htmlFor="province" className="text-sm font-medium text-gray-700 mb-1 block">
                                        Provinsi *
                                    </label>
                                    <input
                                        id="province"
                                        name="province"
                                        type="text"
                                        value={formData.province}
                                        onChange={handleChange}
                                        placeholder="Jawa Timur"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                        required
                                    />
                                    </div>

                                    <div>
                                    <label htmlFor="city" className="text-sm font-medium text-gray-700 mb-1 block">
                                        Kota/Kabupaten *
                                    </label>
                                    <input
                                        id="city"
                                        name="city"
                                        type="text"
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="Malang"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                        required
                                    />
                                    </div>

                                    <div>
                                    <label htmlFor="subDistrict" className="text-sm font-medium text-gray-700 mb-1 block">
                                        Kecamatan *
                                    </label>
                                    <input
                                        id="subDistrict"
                                        name="subDistrict"
                                        type="text"
                                        value={formData.subDistrict}
                                        onChange={handleChange}
                                        placeholder="Klojen"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                        required
                                    />
                                    </div>

                                    <div>
                                    <label htmlFor="ward" className="text-sm font-medium text-gray-700 mb-1 block">
                                        Kelurahan/Desa *
                                    </label>
                                    <input
                                        id="ward"
                                        name="ward"
                                        type="text"
                                        value={formData.ward}
                                        onChange={handleChange}
                                        placeholder="Kauman"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                        required
                                    />
                                    </div>

                                    <div className="md:col-span-2">
                                    <label htmlFor="address" className="text-sm font-medium text-gray-700 mb-1 block">
                                        Alamat Lengkap *
                                    </label>
                                    <textarea
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="Jl. Raya Pertanian No. 123, RT 02/RW 05"
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
                                        required
                                    />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                    <Sprout className="w-5 h-5 mr-2 text-emerald-600" />
                                    Informasi Pertanian
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                    <label htmlFor="landArea" className="text-sm font-medium text-gray-700 mb-1 block">
                                        Luas Lahan (Ha) *
                                    </label>
                                    <input
                                        id="landArea"
                                        name="landArea"
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        value={formData.landArea}
                                        onChange={handleChange}
                                        placeholder="2.5"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                                        required
                                    />
                                    </div>

                                    <div>
                                    <label htmlFor="riceVariety" className="text-sm font-medium text-gray-700 mb-1 block">
                                        Varietas Beras *
                                    </label>
                                    <select
                                        id="riceVariety"
                                        value={formData.riceVariety}
                                        onChange={(e) => handleSelectChange('riceVariety', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                                        required
                                    >
                                        <option value="">Pilih varietas beras</option>
                                        {daftarVarietasBeras.map((varietas) => (
                                        <option key={varietas} value={varietas}>
                                            {varietas}
                                        </option>
                                        ))}
                                    </select>
                                    </div>

                                    <div>
                                    <label htmlFor="estimatedHarvest" className="text-sm font-medium text-gray-700 mb-1 block">
                                        Estimasi Hasil Panen (Ton) *
                                    </label>
                                    <input
                                        id="estimatedHarvest"
                                        name="estimatedHarvest"
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        value={formData.estimatedHarvest}
                                        onChange={handleChange}
                                        placeholder="8.5"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                                        required
                                    />
                                    </div>

                                    <div>
                                    <label htmlFor="howLongBecomeFarmer" className="text-sm font-medium text-gray-700 mb-1 block">
                                        Berapa lama menjadi petani *
                                    </label>
                                    <input
                                        id="howLongBecomeFarmer"
                                        name="howLongBecomeFarmer"
                                        type="text"
                                        value={formData.howLongBecomeFarmer}
                                        onChange={handleChange}
                                        placeholder="5 tahun"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                                        required
                                    />
                                    </div>

                                    <div>
                                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                                        Status Kepemilikan Lahan *
                                    </label>
                                    <select
                                        value={formData.landOwnership}
                                        onChange={(e) => handleSelectChange('landOwnership', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                                        required
                                    >
                                        <option value="">Pilih status kepemilikan</option>
                                        {statusKepemilikan.map((status) => (
                                        <option key={status.value} value={status.value}>
                                            {status.label}
                                        </option>
                                        ))}
                                    </select>
                                    </div>

                                    <div>
                                    <label htmlFor="landLocation" className="text-sm font-medium text-gray-700 mb-1 block">
                                        Lokasi Lahan
                                    </label>
                                    <input
                                        id="landLocation"
                                        name="landLocation"
                                        type="text"
                                        value={formData.landLocation}
                                        onChange={handleChange}
                                        placeholder="Desa Subur, Kec. Makmur"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                                    />
                                    </div>

                                    <div>
                                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                                        Musim Tanam *
                                    </label>
                                    <select
                                        value={formData.plantingSeason}
                                        onChange={(e) => handleSelectChange('plantingSeason', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                                        required
                                    >
                                        <option value="">Pilih musim tanam</option>
                                        {musimTanam.map((musim) => (
                                        <option key={musim} value={musim}>
                                            {musim}
                                        </option>
                                        ))}
                                    </select>
                                    </div>

                                    <div>
                                    <label htmlFor="farmerGroup" className="text-sm font-medium text-gray-700 mb-1 block">
                                        Kelompok Tani
                                    </label>
                                    <input
                                        id="farmerGroup"
                                        name="farmerGroup"
                                        type="text"
                                        value={formData.farmerGroup}
                                        onChange={handleChange}
                                        placeholder="Kelompok Tani Maju Bersama"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                                    />
                                    </div>

                                    <div>
                                    <label htmlFor="farmerCardNumber" className="text-sm font-medium text-gray-700 mb-1 block">
                                        Nomor Kartu Tani
                                    </label>
                                    <input
                                        id="farmerCardNumber"
                                        name="farmerCardNumber"
                                        type="text"
                                        value={formData.farmerCardNumber}
                                        onChange={handleChange}
                                        placeholder="KT-123456789"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                                    />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:hover:scale-100 shadow-lg hover:shadow-xl disabled:shadow-none flex items-center justify-center"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Menyimpan Profil...
                                    </>
                                ) : (
                                    'Simpan Profil Petani'
                                )}
                            </button>
                        </form>

                        <div className="mt-6 pt-6 border-t border-gray-100">
                            <p className="text-xs text-gray-500 text-center">
                            Dengan melanjutkan, Anda menyetujui 
                            <a href="/terms" className="text-green-600 hover:text-green-700 font-medium ml-1">
                                Syarat & Ketentuan
                            </a> kami
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default FarmerRegistrationForm;