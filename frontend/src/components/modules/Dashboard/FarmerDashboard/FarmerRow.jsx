import React, { useState } from 'react';

import { 
    MoreHorizontal, 
    Pencil, 
    UserX,
    Eye,
    User,
    MapPin,
    Phone,
    Calendar,
    CreditCard,
    Home,
    Users
} from 'lucide-react';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { apiInstanceExpress } from '@/services/apiInstance';
import { useAuth } from '@/context/AuthContext';

const FarmerRow = ({ farmer, onDelete }) => {
    const { currentUser } = useAuth();
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    
    const [formData, setFormData] = useState({
        fullName: farmer?.fullName || '',
        NIK: farmer?.NIK || '',
        dateOfBirth: farmer?.dateOfBirth || '',
        gender: farmer?.gender || '',
        phone: farmer?.phone || '',
        farmerCardNumber: farmer?.farmerCardNumber || '',
        province: farmer?.province || '',
        city: farmer?.city || '',
        subDistrict: farmer?.subDistrict || '',
        ward: farmer?.ward || '',
        postalCode: farmer?.postalCode || '',
        address: farmer?.address || '',
        landArea: farmer?.landArea || '',
        riceVariety: farmer?.riceVariety || '',
        estimatedHarvest: farmer?.estimatedHarvest || '',
        howLongBecomeFarmer: farmer?.howLongBecomeFarmer || '',
        landOwnership: farmer?.landOwnership || '',
        landLocation: farmer?.landLocation || '',
        plantingSeason: farmer?.plantingSeason || '',
        farmerGroup: farmer?.farmerGroup || '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveEdit = async () => {
        try {
            const token = await currentUser.getIdToken();

            const response = await apiInstanceExpress.put(`/farmer/biodata/edit/${farmer._id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
        } catch (error) {
            console.error(error);
        } finally {
            setIsEditOpen(false);
        }
    };

    const handleDelete = () => {
        if (onDelete) {
            onDelete(farmer.id || farmer._id);
        }
        setIsDeleteOpen(false);
    };

    const formatDate = (date) => {
        if (!date) return '-';
        return new Date(date).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <>
            <TableRow>
                <TableCell className="font-medium">{farmer?.fullName || '-'}</TableCell>
                <TableCell>{farmer?.NIK || '-'}</TableCell>
                <TableCell>
                    <Badge variant="outline" className="capitalize">
                        {farmer?.userId?.role || 'farmer'}
                    </Badge>
                </TableCell>
                <TableCell>
                    {farmer?.landArea || '-'} m²
                </TableCell>
                <TableCell>{farmer?.province || '-'}</TableCell>
                <TableCell>{farmer?.city || '-'}</TableCell>
                <TableCell>{farmer?.subDistrict || '-'}</TableCell>
                <TableCell>{farmer?.ward || '-'}</TableCell>
                <TableCell>
                    <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="cursor-pointer">
                                <MoreHorizontal size={16} />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                className="flex items-center gap-2 cursor-pointer"
                                onSelect={() => {
                                    setMenuOpen(false);
                                    setIsDetailOpen(true);
                                }}
                            >
                                <Eye size={14} />
                                <span>Detail</span>
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                className="flex items-center gap-2 cursor-pointer"
                                onSelect={() => {
                                    setMenuOpen(false);
                                    setIsEditOpen(true);
                                }}
                            >
                                <Pencil size={14} />
                                <span>Edit</span>
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                className="flex items-center gap-2 cursor-pointer text-destructive"
                                onSelect={() => {
                                    setMenuOpen(false);
                                    setIsDeleteOpen(true);
                                }}
                            >
                                <UserX size={14} />
                                <span>Hapus</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>

            <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
                <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Detail Data Petani</DialogTitle>
                        <DialogDescription>
                            Informasi lengkap mengenai data petani
                        </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-6 py-4">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-lg font-semibold">
                                <User size={20} className="text-primary" />
                                <h3>Informasi Pribadi</h3>
                            </div>
                            <Separator />

                            <div className="flex flex-col gap-4">
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Foto</p>
                                    <div className="w-[200px] h-[200px] border flex items-center justify-center overflow-hidden">
                                        {farmer?.profilePicture ? (
                                        <img
                                            src={`${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}${farmer.profilePicture}`}
                                            alt={farmer.fullName}
                                            className="w-full h-full object-cover"
                                        />
                                        ) : (
                                        <span className="text-sm text-muted-foreground">Tidak ada foto</span>
                                        // Atau bisa pakai gambar default
                                        // <img src="/placeholder.jpg" alt="Default" className="w-full h-full object-cover" />
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <p className="text-sm text-muted-foreground">Nama Lengkap</p>
                                        <p className="font-medium">{farmer?.fullName || '-'}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm text-muted-foreground">NIK</p>
                                        <p className="font-medium">{farmer?.NIK || '-'}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm text-muted-foreground">Tanggal Lahir</p>
                                        <p className="font-medium">{formatDate(farmer?.dateOfBirth)}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm text-muted-foreground">Jenis Kelamin</p>
                                        <p className="font-medium">{farmer?.gender || '-'}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm text-muted-foreground">No. Telepon</p>
                                        <p className="font-medium">{farmer?.phone || '-'}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm text-muted-foreground">No. Kartu Tani</p>
                                        <p className="font-medium">{farmer?.farmerCardNumber || '-'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-lg font-semibold">
                                <MapPin size={20} className="text-primary" />
                                <h3>Alamat</h3>
                            </div>
                            <Separator />
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Provinsi</p>
                                    <p className="font-medium">{farmer?.province || '-'}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Kota/Kabupaten</p>
                                    <p className="font-medium">{farmer?.city || '-'}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Kecamatan</p>
                                    <p className="font-medium">{farmer?.subDistrict || '-'}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Kelurahan/Desa</p>
                                    <p className="font-medium">{farmer?.ward || '-'}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Kode Pos</p>
                                    <p className="font-medium">{farmer?.postalCode || '-'}</p>
                                </div>
                                <div className="space-y-1 col-span-2">
                                    <p className="text-sm text-muted-foreground">Alamat Lengkap</p>
                                    <p className="font-medium">{farmer?.address || '-'}</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-lg font-semibold">
                                <Home size={20} className="text-primary" />
                                <h3>Informasi Pertanian</h3>
                            </div>
                            <Separator />
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Luas Lahan</p>
                                    <p className="font-medium">{farmer?.landArea ? `${farmer.landArea} m²` : '-'}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Varietas Padi</p>
                                    <p className="font-medium">{farmer?.riceVariety || '-'}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Estimasi Panen</p>
                                    <p className="font-medium">{farmer?.estimatedHarvest ? `${farmer.estimatedHarvest} kg` : '-'}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Lama Menjadi Petani</p>
                                    <p className="font-medium">{farmer?.howLongBecomeFarmer || '-'}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Status Kepemilikan Lahan</p>
                                    <p className="font-medium">{farmer?.landOwnership || '-'}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Lokasi Lahan</p>
                                    <p className="font-medium">{farmer?.landLocation || '-'}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Musim Tanam</p>
                                    <p className="font-medium">{farmer?.plantingSeason || '-'}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Kelompok Tani</p>
                                    <p className="font-medium">{farmer?.farmerGroup || '-'}</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-lg font-semibold">
                                <Calendar size={20} className="text-primary" />
                                <h3>Informasi Sistem</h3>
                            </div>
                            <Separator />
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Tanggal Dibuat</p>
                                    <p className="font-medium">{formatDate(farmer?.createdAt)}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Terakhir Diperbarui</p>
                                    <p className="font-medium">{formatDate(farmer?.updatedAt)}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                            Tutup
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Edit Data Petani</DialogTitle>
                        <DialogDescription>
                            Ubah informasi petani. Klik simpan untuk menyimpan perubahan.
                        </DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="fullName">Nama Lengkap</Label>
                            <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="NIK">NIK</Label>
                            <Input id="NIK" name="NIK" value={formData.NIK} onChange={handleInputChange} />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="dateOfBirth">Tanggal Lahir</Label>
                                <Input type="date" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="gender">Jenis Kelamin</Label>
                                <select id="gender" name="gender" value={formData.gender} onChange={handleInputChange} className="border rounded px-2 py-1">
                                    <option value="">Pilih</option>
                                    <option value="L">Laki-laki</option>
                                    <option value="P">Perempuan</option>
                                </select>
                            </div>
                        </div>

                        {/* Kontak */}
                        <div className="grid gap-2">
                            <Label htmlFor="phone">No. Telepon</Label>
                            <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="farmerCardNumber">Nomor Kartu Tani</Label>
                            <Input id="farmerCardNumber" name="farmerCardNumber" value={formData.farmerCardNumber} onChange={handleInputChange} />
                        </div>

                        {/* Wilayah */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="province">Provinsi</Label>
                                <Input id="province" name="province" value={formData.province} onChange={handleInputChange} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="city">Kota/Kabupaten</Label>
                                <Input id="city" name="city" value={formData.city} onChange={handleInputChange} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="subDistrict">Kecamatan</Label>
                                <Input id="subDistrict" name="subDistrict" value={formData.subDistrict} onChange={handleInputChange} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="ward">Kelurahan/Desa</Label>
                                <Input id="ward" name="ward" value={formData.ward} onChange={handleInputChange} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="postalCode">Kode Pos</Label>
                                <Input id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleInputChange} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="address">Alamat</Label>
                                <Input id="address" name="address" value={formData.address} onChange={handleInputChange} />
                            </div>
                        </div>

                        {/* Informasi Pertanian */}
                        <div className="grid gap-2">
                            <Label htmlFor="landArea">Luas Lahan (ha)</Label>
                            <Input id="landArea" name="landArea" value={formData.landArea} onChange={handleInputChange} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="riceVariety">Varietas Padi</Label>
                            <Input id="riceVariety" name="riceVariety" value={formData.riceVariety} onChange={handleInputChange} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="estimatedHarvest">Perkiraan Panen (kg)</Label>
                            <Input id="estimatedHarvest" name="estimatedHarvest" value={formData.estimatedHarvest} onChange={handleInputChange} />
                        </div>

                        {/* Pengalaman */}
                        <div className="grid gap-2">
                            <Label htmlFor="howLongBecomeFarmer">Lama Jadi Petani (tahun)</Label>
                            <Input id="howLongBecomeFarmer" name="howLongBecomeFarmer" value={formData.howLongBecomeFarmer} onChange={handleInputChange} />
                        </div>

                        {/* Kepemilikan Lahan */}
                        <div className="grid gap-2">
                            <Label htmlFor="landOwnership">Status Kepemilikan Lahan</Label>
                            <Input id="landOwnership" name="landOwnership" value={formData.landOwnership} onChange={handleInputChange} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="landLocation">Lokasi Lahan</Label>
                            <Input id="landLocation" name="landLocation" value={formData.landLocation} onChange={handleInputChange} />
                        </div>

                        {/* Musim & Kelompok Tani */}
                        <div className="grid gap-2">
                            <Label htmlFor="plantingSeason">Musim Tanam</Label>
                            <Input id="plantingSeason" name="plantingSeason" value={formData.plantingSeason} onChange={handleInputChange} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="farmerGroup">Kelompok Tani</Label>
                            <Input id="farmerGroup" name="farmerGroup" value={formData.farmerGroup} onChange={handleInputChange} />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                            Batal
                        </Button>
                        <Button onClick={handleSaveEdit}>
                            Simpan Perubahan
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Tindakan ini tidak dapat dibatalkan. Data petani <strong>{farmer?.fullName}</strong> akan dihapus secara permanen dari sistem.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction 
                            onClick={handleDelete}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Hapus
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default FarmerRow;