import React, { useState } from 'react'
import { Plus, Search, Edit2, Trash2, MapPin, Users, ChevronDown, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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
import DashboardLayout from '@/components/layouts/DashboardLayout'

const Location = () => {
    const [locations, setLocations] = useState([
        { id: 1, name: 'Jawa Timur', type: 'Provinsi', parent: '-', userCount: 245, status: 'active' },
        { id: 2, name: 'Kabupaten Gresik', type: 'Kabupaten', parent: 'Jawa Timur', userCount: 87, status: 'active' },
        { id: 3, name: 'Kecamatan Kebomas', type: 'Kecamatan', parent: 'Kabupaten Gresik', userCount: 34, status: 'active' },
        { id: 4, name: 'Desa Kebomas', type: 'Desa', parent: 'Kecamatan Kebomas', userCount: 12, status: 'active' },
        { id: 5, name: 'Jawa Tengah', type: 'Provinsi', parent: '-', userCount: 189, status: 'active' },
    ])

    const [searchTerm, setSearchTerm] = useState('')
    const [filterType, setFilterType] = useState('all')
    const [showModal, setShowModal] = useState(false)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [modalMode, setModalMode] = useState('add')
    const [selectedLocation, setSelectedLocation] = useState(null)
    const [locationToDelete, setLocationToDelete] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        type: 'Provinsi',
        parent: '',
        status: 'active'
    })

    const filteredLocations = locations.filter(loc => {
        const matchesSearch = loc.name.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesType = filterType === 'all' || loc.type === filterType
        return matchesSearch && matchesType
    })

    const handleAdd = () => {
        setModalMode('add')
        setFormData({ name: '', type: 'Provinsi', parent: '', status: 'active' })
        setShowModal(true)
    }

    const handleEdit = (location) => {
        setModalMode('edit')
        setSelectedLocation(location)
        setFormData({
            name: location.name,
            type: location.type,
            parent: location.parent,
            status: location.status
        })
        setShowModal(true)
    }

    const handleDeleteClick = (location) => {
        setLocationToDelete(location)
        setShowDeleteDialog(true)
    }

    const handleDeleteConfirm = () => {
        if (locationToDelete) {
            setLocations(locations.filter(loc => loc.id !== locationToDelete.id))
            setShowDeleteDialog(false)
            setLocationToDelete(null)
        }
    }

    const handleSubmit = () => {
        if (!formData.name.trim()) return
        
        if (modalMode === 'add') {
            const newLocation = {
                id: locations.length + 1,
                ...formData,
                userCount: 0
            }
            setLocations([...locations, newLocation])
        } else {
            setLocations(locations.map(loc => 
                loc.id === selectedLocation.id ? { ...loc, ...formData } : loc
            ))
        }
        setShowModal(false)
    }

    return (
        <DashboardLayout>
            <div className="flex flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Management Akses Wilayah</h1>
                        <p className="text-muted-foreground mt-1">Kelola hierarki wilayah dan akses pengguna</p>
                    </div>
                    <Button onClick={handleAdd} className="gap-2">
                        <Plus className="w-4 h-4" />
                        Tambah Wilayah
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Wilayah</CardTitle>
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{locations.length}</div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Provinsi</CardTitle>
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {locations.filter(l => l.type === 'Provinsi').length}
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Kabupaten</CardTitle>
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {locations.filter(l => l.type === 'Kabupaten').length}
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Pengguna</CardTitle>
                            <Users className="w-4 h-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {locations.reduce((sum, loc) => sum + loc.userCount, 0)}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Search & Filter */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                <Input
                                    type="text"
                                    placeholder="Cari wilayah..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-9"
                                />
                            </div>

                            <Select value={filterType} onValueChange={setFilterType}>
                                <SelectTrigger className="w-full md:w-[200px]">
                                    <SelectValue placeholder="Semua Tipe" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua Tipe</SelectItem>
                                    <SelectItem value="Provinsi">Provinsi</SelectItem>
                                    <SelectItem value="Kabupaten">Kabupaten</SelectItem>
                                    <SelectItem value="Kecamatan">Kecamatan</SelectItem>
                                    <SelectItem value="Desa">Desa</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Table */}
                <Card>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="border-b">
                                    <tr className="bg-muted/50">
                                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                            Nama Wilayah
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                            Tipe
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                            Parent
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                            Jumlah User
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
                                    {filteredLocations.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                                                Tidak ada data wilayah
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredLocations.map((location) => (
                                            <tr key={location.id} className="hover:bg-muted/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="w-4 h-4 text-muted-foreground" />
                                                        <span className="font-medium">{location.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Badge variant="secondary">{location.type}</Badge>
                                                </td>
                                                <td className="px-6 py-4 text-muted-foreground">
                                                    {location.parent}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-1">
                                                        <Users className="w-4 h-4 text-muted-foreground" />
                                                        {location.userCount}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Badge variant={location.status === 'active' ? 'default' : 'destructive'}>
                                                        {location.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                                                    </Badge>
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

                {/* Add/Edit Dialog */}
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
                                <Label htmlFor="name">Nama Wilayah</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Contoh: Jawa Timur"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="type">Tipe Wilayah</Label>
                                <Select 
                                    value={formData.type} 
                                    onValueChange={(value) => setFormData({ ...formData, type: value })}
                                >
                                    <SelectTrigger id="type">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Provinsi">Provinsi</SelectItem>
                                        <SelectItem value="Kabupaten">Kabupaten</SelectItem>
                                        <SelectItem value="Kecamatan">Kecamatan</SelectItem>
                                        <SelectItem value="Desa">Desa</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="parent">Parent Wilayah</Label>
                                <Input
                                    id="parent"
                                    value={formData.parent}
                                    onChange={(e) => setFormData({ ...formData, parent: e.target.value })}
                                    placeholder="Contoh: Jawa Timur (opsional)"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="status">Status</Label>
                                <Select 
                                    value={formData.status} 
                                    onValueChange={(value) => setFormData({ ...formData, status: value })}
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
                            <Button onClick={handleSubmit}>
                                {modalMode === 'add' ? 'Tambah' : 'Simpan'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Delete Confirmation Dialog */}
                <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Aksi ini tidak dapat dibatalkan. Wilayah "{locationToDelete?.name}" akan dihapus secara permanen dari sistem.
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