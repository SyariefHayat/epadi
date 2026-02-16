import { z } from 'zod';
import React, { useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import DefaultLayout from '@/components/layouts/DefaultLayout';

const storeSchema = z.object({
    storeName: z.string().min(3, 'Nama toko minimal 3 karakter'),
    description: z.string().optional(),
    phoneNumber: z.string().min(10, 'Nomor telepon tidak valid'),
});

const CreateStore = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(storeSchema),
    });

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
    };

    return (
        <DefaultLayout>
            <div className="w-full min-h-screen bg-yellow-100 p-3 sm:p-5">
                <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-6">
                    <Button
                        variant="link"
                        className="cursor-pointer p-0 sm:p-2"
                        onClick={() => navigate("/mart")}
                    >
                        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                        <span className="text-sm sm:text-base">Kembali</span>
                    </Button>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Main Content */}
                        <div className="w-full flex flex-col lg:flex-row gap-4 lg:gap-6 bg-white p-4 sm:p-6 lg:p-10 rounded-md mt-4">
                            {/* Left Column - Profile */}
                            <div className="w-full lg:w-1/2 space-y-5">
                                <p className="mb-2 font-medium text-sm text-gray-600">Profil Toko</p>

                                {/* Profile Picture Upload */}
                                <div className="w-full flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
                                    <div className="flex-shrink-0">
                                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-200 mx-auto sm:mx-0" />
                                    </div>
                                    <div className="flex-1 space-y-3">
                                        <p className="text-xs text-gray-500 text-center sm:text-left">
                                            Ukuran optimal 300 x 300 px, maksimum 10MB. Format: JPG, JPEG, PNG.
                                        </p>
                                        <Button
                                            variant="outline"
                                            type="button"
                                            className="w-full sm:w-fit cursor-pointer text-sm"
                                            onClick={handleButtonClick}
                                        >
                                            Upload Gambar
                                        </Button>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            ref={fileInputRef}
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                </div>

                                {/* Store Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="storeName" className="font-medium text-sm text-gray-600">
                                        Nama Toko
                                    </Label>
                                    <Input
                                        id="storeName"
                                        placeholder="Masukkan nama toko"
                                        className="py-3 sm:py-5"
                                        {...register('storeName')}
                                    />
                                    {errors.storeName && (
                                        <p className="text-red-500 text-xs">{errors.storeName.message}</p>
                                    )}
                                </div>

                                {/* Store URL */}
                                <div className="space-y-2">
                                    <Label htmlFor="storeUrl" className="font-medium text-sm text-gray-600">
                                        Link URL Toko
                                    </Label>
                                    <Input
                                        id="storeUrl"
                                        value="http://localhost:5173/store/"
                                        className="bg-gray-200 py-3 sm:py-5 text-sm"
                                        disabled
                                    />
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <Label htmlFor="description" className="font-medium text-sm text-gray-600">
                                        Deskripsi
                                    </Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Masukkan deskripsi toko"
                                        className="resize-none p-3 h-20 sm:h-[85px] text-sm"
                                        {...register('description')}
                                    />
                                </div>
                            </div>

                            {/* Right Column - Background & Contact */}
                            <div className="w-full lg:w-1/2 space-y-5">
                                {/* Background Section */}
                                <div className="space-y-2">
                                    <p className="font-medium text-sm text-gray-600">Background Toko</p>
                                    <div className="w-full h-24 sm:h-32 flex items-center justify-center bg-gray-200 rounded-md">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="cursor-pointer text-sm"
                                            onClick={handleButtonClick}
                                        >
                                            Pilih Gambar
                                        </Button>
                                    </div>
                                </div>

                                {/* Phone Number */}
                                <div className="space-y-2">
                                    <Label htmlFor="phoneNumber" className="font-medium text-sm text-gray-600">
                                        Nomor Telepon
                                    </Label>
                                    <Input
                                        id="phoneNumber"
                                        placeholder="Masukkan nomor telepon"
                                        className="py-3 sm:py-5"
                                        {...register('phoneNumber')}
                                    />
                                    {errors.phoneNumber && (
                                        <p className="text-red-500 text-xs">{errors.phoneNumber.message}</p>
                                    )}
                                </div>

                                {/* Location */}
                                <div className="space-y-2">
                                    <p className="font-medium text-sm text-gray-600">Lokasi</p>
                                    <div className="w-full h-24 sm:h-32 bg-gray-200 rounded-md flex items-center justify-center">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="cursor-pointer text-sm"
                                        >
                                            Pilih Lokasi
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="w-full bg-white mt-4 sm:mt-5 p-4 sm:p-5 rounded-md">
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
                                <Button
                                    variant="outline"
                                    type="button"
                                    className="w-full sm:w-auto cursor-pointer order-2 sm:order-1"
                                    onClick={() => navigate("/mart")}
                                >
                                    Batalkan
                                </Button>
                                <Button
                                    type="submit"
                                    className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-black cursor-pointer order-1 sm:order-2"
                                    onClick={() => navigate("/seller")}
                                >
                                    Buat Toko Sekarang
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default CreateStore;