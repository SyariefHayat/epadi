import React, { useState } from 'react';

import { 
    MoreHorizontal, 
    Pencil, 
    UserX 
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
    AlertDialogTrigger,
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

const FarmerRow = ({ farmer, onEdit, onDelete }) => {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [formData, setFormData] = useState({
        fullName: farmer?.fullName || '',
        NIK: farmer?.NIK || '',
        role: farmer?.role || '',
        province: farmer?.province || '-',
        city: farmer?.city || '-',
        subDistrict: farmer?.subDistrict || '-',
        ward: farmer?.ward || '-',
        lands: farmer?.landArea || '-',
    });

    const lands = farmer?.landArea || [];

    const handleEditClick = () => {
        setIsEditOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRoleChange = (value) => {
        setFormData(prev => ({
            ...prev,
            role: value
        }));
    };

    const handleSaveEdit = async () => {
        try {
            if (onEdit) {
                const updatedData = {
                    ...farmer,
                    fullName: formData.fullName,
                    NIK: formData.NIK,
                    role: formData.role,
                    farmerDetail: {
                        ...farmer.farmerDetail,
                        province: formData.province,
                        city: formData.city,
                        subDistrict: formData.subDistrict,
                        ward: formData.ward,
                    }
                };

                onEdit(updatedData);
            };

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
    };

    return (
        <>
            <TableRow>
                <TableCell className="font-medium">{farmer?.fullName || '-'}</TableCell>
                <TableCell>{farmer?.NIK || '-'}</TableCell>
                <TableCell>
                    {console.log(farmer)}
                    <Badge variant="outline" className="capitalize">
                        {farmer?.userId?.role || 'farmer'}
                    </Badge>
                </TableCell>
                <TableCell>
                    {farmer?.landArea || '-'} m²
                </TableCell>
                <TableCell>{farmer.province}</TableCell>
                <TableCell>{farmer.city}</TableCell>
                <TableCell>{farmer.subDistrict}</TableCell>
                <TableCell>{farmer.ward}</TableCell>
                <TableCell>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="cursor-pointer">
                                <MoreHorizontal size={16} />
                            </Button>
                        </DropdownMenuTrigger>
                        
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem 
                                className="flex items-center gap-2 cursor-pointer"
                                onClick={handleEditClick}
                            >
                                <Pencil size={14} />
                                <span>Edit</span>
                            </DropdownMenuItem>

                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <DropdownMenuItem 
                                        className="flex items-center gap-2 cursor-pointer text-destructive"
                                        onSelect={(e) => e.preventDefault()}
                                    >
                                        <UserX size={14} />
                                        <span>Hapus</span>
                                    </DropdownMenuItem>
                                </AlertDialogTrigger>
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
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>

            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Edit Data Petani</DialogTitle>
                        <DialogDescription>
                            Ubah informasi petani. Klik simpan untuk menyimpan perubahan.
                        </DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="fullName">Nama Lengkap</Label>
                            <Input
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                placeholder="Masukkan nama lengkap"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="NIK">NIK</Label>
                            <Input
                                id="NIK"
                                name="NIK"
                                value={formData.NIK}
                                onChange={handleInputChange}
                                placeholder="Masukkan NIK"
                            />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="province">Provinsi</Label>
                                <Input
                                    id="province"
                                    name="province"
                                    value={formData.province}
                                    onChange={handleInputChange}
                                    placeholder="Provinsi"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="city">Kota/Kabupaten</Label>
                                <Input
                                    id="city"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    placeholder="Kota/Kabupaten"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="subDistrict">Kecamatan</Label>
                                <Input
                                    id="subDistrict"
                                    name="subDistrict"
                                    value={formData.subDistrict}
                                    onChange={handleInputChange}
                                    placeholder="Kecamatan"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="ward">Kelurahan/Desa</Label>
                                <Input
                                    id="ward"
                                    name="ward"
                                    value={formData.ward}
                                    onChange={handleInputChange}
                                    placeholder="Kelurahan/Desa"
                                />
                            </div>
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
        </>
    );
};

export default FarmerRow;