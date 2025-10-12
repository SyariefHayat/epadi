import React, { useState, useEffect } from 'react'

import { 
    Plus, 
    Search, 
    Edit2, 
    Trash2, 
    MapPin, 
    Users, 
    RefreshCw 
} from 'lucide-react'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import { apiInstanceExpress } from '@/services/apiInstance'

const Location = () => {
    // States
    const [locations, setLocations] = useState([])
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [modalMode, setModalMode] = useState('add') // 'add' or 'edit'
    const [locationToDelete, setLocationToDelete] = useState(null)
    const [stats, setStats] = useState({
        total: 0,
        provinsi: 0,
        kabupaten: 0,
        active: 0
    })
    
    const [formData, setFormData] = useState({
        regionCode: '',
        regionName: '',
        level: 'provinsi',
        isActive: true
    })
    
    const [editingId, setEditingId] = useState(null)

    // Fetch locations on component mount
    useEffect(() => {
        fetchLocations()
    }, [])

    // Fetch all locations
    const fetchLocations = async () => {
        setLoading(true)
        try {
            const response = await apiInstanceExpress.get('/admin/get/allowedRegion')
            if (response.data.success) {
                setLocations(response.data.data)
                calculateStats(response.data.data)
            }
        } catch (error) {
            console.error('Error fetching locations:', error)
            alert('Gagal memuat data wilayah')
        } finally {
            setLoading(false)
        }
    }

    // Calculate statistics
    const calculateStats = (data) => {
        setStats({
            total: data.length,
            provinsi: data.filter(l => l.level === 'provinsi').length,
            kabupaten: data.filter(l => l.level === 'kabupaten').length,
            active: data.filter(l => l.isActive).length
        })
    }

    // Get level label
    const getLevelLabel = (level) => {
        const labels = {
            'provinsi': 'Provinsi',
            'kabupaten': 'Kabupaten',
            'kecamatan': 'Kecamatan',
            'desa': 'Desa'
        }
        return labels[level] || level
    }

    // Handle add button click
    const handleAdd = () => {
        setModalMode('add')
        setFormData({
            regionCode: '',
            regionName: '',
            level: 'provinsi',
            isActive: true
        })
        setEditingId(null)
        setShowModal(true)
    }

    // Handle edit button click
    const handleEdit = (location) => {
        setModalMode('edit')
        setFormData({
            regionCode: location.regionCode,
            regionName: location.regionName,
            level: location.level,
            isActive: location.isActive
        })
        setEditingId(location._id)
        setShowModal(true)
    }

    // Handle delete button click
    const handleDeleteClick = (location) => {
        setLocationToDelete(location)
        setShowDeleteDialog(true)
    }

    // Handle form submit
    const handleSubmit = async () => {
        // Validation
        if (!formData.regionCode || !formData.regionName || !formData.level) {
            alert('Mohon lengkapi semua field')
            return
        }

        setLoading(true)
        try {
            if (modalMode === 'add') {
                // Create new location
                const response = await apiInstanceExpress.post('/admin/create/allowedRegion', formData)
                if (response.data.success) {
                    alert('Wilayah berhasil ditambahkan')
                    setShowModal(false)
                    fetchLocations()
                }
            } else {
                // Update existing location
                const response = await apiInstanceExpress.put(`/admin/update/allowedRegion/${editingId}`, formData)
                if (response.data.success) {
                    alert('Wilayah berhasil diperbarui')
                    setShowModal(false)
                    fetchLocations()
                }
            }
        } catch (error) {
            console.error('Error saving location:', error)
            const errorMsg = error.response?.data?.message || 'Gagal menyimpan data wilayah'
            alert(errorMsg)
        } finally {
            setLoading(false)
        }
    }

    // Handle toggle status
    const handleToggleStatus = async (location) => {
        try {
            const response = await apiInstanceExpress.patch(`/admin/toggle/allowedRegion/${location._id}`)
            if (response.data.success) {
                alert(response.data.message)
                fetchLocations()
            }
        } catch (error) {
            console.error('Error toggling status:', error)
            alert('Gagal mengubah status wilayah')
        }
    }

    // Handle delete confirm
    const handleDeleteConfirm = async () => {
        if (!locationToDelete) return

        try {
            const response = await apiInstanceExpress.delete(`/admin/delete/allowedRegion/${locationToDelete._id}`)
            if (response.data.success) {
                alert('Wilayah berhasil dihapus')
                setShowDeleteDialog(false)
                setLocationToDelete(null)
                fetchLocations()
            }
        } catch (error) {
            console.error('Error deleting location:', error)
            alert('Gagal menghapus wilayah')
        }
    }

    return (
        <DashboardLayout>
            <div className="flex flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Management Akses Wilayah</h1>
                        <p className="text-muted-foreground mt-1">Kelola hierarki wilayah dan akses pengguna</p>
                    </div>
                    <div className="flex gap-2">
                        <Button onClick={handleAdd} className="gap-2">
                            <Plus className="w-4 h-4" />
                            Tambah Wilayah
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Wilayah</CardTitle>
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total}</div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Provinsi</CardTitle>
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.provinsi}</div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Kabupaten</CardTitle>
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.kabupaten}</div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Wilayah Aktif</CardTitle>
                            <Users className="w-4 h-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.active}</div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="border-b">
                                    <tr className="bg-muted/50">
                                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                            Kode Wilayah
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                            Nama Wilayah
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                            Level
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {loading ? (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                                                <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
                                                Memuat data...
                                            </td>
                                        </tr>
                                    ) : locations.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                                                Tidak ada data wilayah
                                            </td>
                                        </tr>
                                    ) : (
                                        locations.map((location) => (
                                            <tr key={location._id} className="hover:bg-muted/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <span className="font-mono text-sm">{location.regionCode}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="w-4 h-4 text-muted-foreground" />
                                                        <span className="font-medium">{location.regionName}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Badge variant="secondary">
                                                        {getLevelLabel(location.level)}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <button
                                                        onClick={() => handleToggleStatus(location)}
                                                        className="cursor-pointer"
                                                    >
                                                        <Badge variant={location.isActive ? 'default' : 'destructive'}>
                                                            {location.isActive ? 'Aktif' : 'Tidak Aktif'}
                                                        </Badge>
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => handleEdit(location)}
                                                        >
                                                            <Edit2 className="w-4 h-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => handleDeleteClick(location)}
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                <Dialog open={showModal} onOpenChange={setShowModal}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>
                                {modalMode === 'add' ? 'Tambah Wilayah Baru' : 'Edit Wilayah'}
                            </DialogTitle>
                            <DialogDescription>
                                {modalMode === 'add' 
                                    ? 'Tambahkan wilayah baru ke dalam sistem' 
                                    : 'Perbarui informasi wilayah'}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="regionCode">Kode Wilayah</Label>
                                <Input
                                    id="regionCode"
                                    value={formData.regionCode}
                                    onChange={(e) => setFormData({ ...formData, regionCode: e.target.value })}
                                    placeholder="Contoh: 35"
                                    disabled={modalMode === 'edit'}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="regionName">Nama Wilayah</Label>
                                <Input
                                    id="regionName"
                                    value={formData.regionName}
                                    onChange={(e) => setFormData({ ...formData, regionName: e.target.value })}
                                    placeholder="Contoh: Jawa Timur"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="level">Level Wilayah</Label>
                                <Select 
                                    value={formData.level} 
                                    onValueChange={(value) => setFormData({ ...formData, level: value })}
                                >
                                    <SelectTrigger id="level">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="provinsi">Provinsi</SelectItem>
                                        <SelectItem value="kabupaten">Kabupaten</SelectItem>
                                        <SelectItem value="kecamatan">Kecamatan</SelectItem>
                                        <SelectItem value="desa">Desa</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="status">Status</Label>
                                <Select 
                                    value={formData.isActive ? 'active' : 'inactive'} 
                                    onValueChange={(value) => setFormData({ ...formData, isActive: value === 'active' })}
                                >
                                    <SelectTrigger id="status">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">Aktif</SelectItem>
                                        <SelectItem value="inactive">Tidak Aktif</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setShowModal(false)}>
                                Batal
                            </Button>
                            <Button onClick={handleSubmit} disabled={loading}>
                                {loading ? 'Menyimpan...' : modalMode === 'add' ? 'Tambah' : 'Simpan'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Aksi ini tidak dapat dibatalkan. Wilayah "{locationToDelete?.regionName}" akan dihapus secara permanen dari sistem.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteConfirm}>
                                Hapus
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </DashboardLayout>
    )
}

export default Location