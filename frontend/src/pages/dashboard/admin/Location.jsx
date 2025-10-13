import React, { useState, useEffect } from 'react'

import { 
    Plus, 
    Search, 
    Edit2, 
    Trash2, 
    MapPin, 
    Users, 
    RefreshCw,
    Download
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
    const [modalMode, setModalMode] = useState('add')
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

    // Emsifa API States
    const [provinsiList, setProvinsiList] = useState([])
    const [kabupatenList, setKabupatenList] = useState([])
    const [kecamatanList, setKecamatanList] = useState([])
    const [desaList, setDesaList] = useState([])
    const [loadingEmsifa, setLoadingEmsifa] = useState(false)
    const [selectedProvinsi, setSelectedProvinsi] = useState('')
    const [selectedKabupaten, setSelectedKabupaten] = useState('')
    const [selectedKecamatan, setSelectedKecamatan] = useState('')

    // Fetch locations on component mount
    useEffect(() => {
        fetchLocations()
    }, [])

    // Fetch Provinsi dari Emsifa saat modal dibuka
    useEffect(() => {
        if (showModal && modalMode === 'add') {
            fetchProvinsi()
        }
    }, [showModal, modalMode])

    // Fetch Kabupaten ketika provinsi dipilih
    useEffect(() => {
        if (selectedProvinsi && ['kabupaten', 'kecamatan', 'desa'].includes(formData.level)) {
            fetchKabupaten(selectedProvinsi)
        }
    }, [selectedProvinsi, formData.level])

    // Fetch Kecamatan ketika kabupaten dipilih
    useEffect(() => {
        if (selectedKabupaten && ['kecamatan', 'desa'].includes(formData.level)) {
            fetchKecamatan(selectedProvinsi, selectedKabupaten)
        }
    }, [selectedKabupaten, formData.level])

    // Fetch Desa ketika kecamatan dipilih
    useEffect(() => {
        if (selectedKecamatan && formData.level === 'desa') {
            fetchDesa(selectedProvinsi, selectedKabupaten, selectedKecamatan)
        }
    }, [selectedKecamatan, formData.level])

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

    // Fetch Provinsi dari Emsifa
    const fetchProvinsi = async () => {
        setLoadingEmsifa(true)
        try {
            const response = await fetch('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json')
            const data = await response.json()
            setProvinsiList(data)
        } catch (error) {
            console.error('Error fetching provinsi:', error)
            alert('Gagal memuat data provinsi dari Emsifa')
        } finally {
            setLoadingEmsifa(false)
        }
    }

    // Fetch Kabupaten dari Emsifa
    const fetchKabupaten = async (provinsiId) => {
        setLoadingEmsifa(true)
        try {
            const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinsiId}.json`)
            const data = await response.json()
            setKabupatenList(data)
        } catch (error) {
            console.error('Error fetching kabupaten:', error)
            alert('Gagal memuat data kabupaten dari Emsifa')
        } finally {
            setLoadingEmsifa(false)
        }
    }

    // Fetch Kecamatan dari Emsifa
    const fetchKecamatan = async (provinsiId, kabupatenId) => {
        setLoadingEmsifa(true)
        try {
            const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${kabupatenId}.json`)
            const data = await response.json()
            setKecamatanList(data)
        } catch (error) {
            console.error('Error fetching kecamatan:', error)
            alert('Gagal memuat data kecamatan dari Emsifa')
        } finally {
            setLoadingEmsifa(false)
        }
    }

    // Fetch Desa dari Emsifa
    const fetchDesa = async (provinsiId, kabupatenId, kecamatanId) => {
        setLoadingEmsifa(true)
        try {
            const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${kecamatanId}.json`)
            const data = await response.json()
            setDesaList(data)
        } catch (error) {
            console.error('Error fetching desa:', error)
            alert('Gagal memuat data desa dari Emsifa')
        } finally {
            setLoadingEmsifa(false)
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
        setSelectedProvinsi('')
        setSelectedKabupaten('')
        setSelectedKecamatan('')
        setKabupatenList([])
        setKecamatanList([])
        setDesaList([])
        setShowModal(true)
    }

    // Handle level change
    const handleLevelChange = (level) => {
        setFormData({ 
            ...formData, 
            level,
            regionCode: '',
            regionName: ''
        })
        setSelectedProvinsi('')
        setSelectedKabupaten('')
        setSelectedKecamatan('')
        setKabupatenList([])
        setKecamatanList([])
        setDesaList([])
    }

    // Handle wilayah selection dari Emsifa
    const handleWilayahSelect = (item) => {
        setFormData({
            ...formData,
            regionCode: item.id,
            regionName: item.name
        })

        // Set selected untuk cascade
        if (formData.level === 'provinsi') {
            setSelectedProvinsi(item.id)
        } else if (formData.level === 'kabupaten') {
            setSelectedKabupaten(item.id)
        } else if (formData.level === 'kecamatan') {
            setSelectedKecamatan(item.id)
        }
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
        if (!formData.regionCode || !formData.regionName || !formData.level) {
            alert('Mohon lengkapi semua field')
            return
        }

        setLoading(true)
        try {
            if (modalMode === 'add') {
                const response = await apiInstanceExpress.post('/admin/create/allowedRegion', formData)
                if (response.data.success) {
                    alert('Wilayah berhasil ditambahkan')
                    setShowModal(false)
                    fetchLocations()
                }
            } else {
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

    // Render dropdown berdasarkan level
    const renderWilayahDropdown = () => {
        if (modalMode === 'edit') {
            return (
                <div className="grid gap-2">
                    <Label htmlFor="regionName">Nama Wilayah</Label>
                    <Input
                        id="regionName"
                        value={formData.regionName}
                        onChange={(e) => setFormData({ ...formData, regionName: e.target.value })}
                        placeholder="Contoh: Jawa Timur"
                    />
                </div>
            )
        }

        switch (formData.level) {
            case 'provinsi':
                return (
                    <div className="grid gap-2">
                        <Label>Pilih Provinsi</Label>
                        <Select 
                            value={formData.regionCode} 
                            onValueChange={(value) => {
                                const provinsi = provinsiList.find(p => p.id === value)
                                if (provinsi) handleWilayahSelect(provinsi)
                            }}
                            disabled={loadingEmsifa}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder={loadingEmsifa ? "Memuat..." : "Pilih Provinsi"} />
                            </SelectTrigger>
                            <SelectContent>
                                {provinsiList.map((provinsi) => (
                                    <SelectItem key={provinsi.id} value={provinsi.id}>
                                        {provinsi.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )

            case 'kabupaten':
                return (
                    <>
                        <div className="grid gap-2">
                            <Label>Pilih Provinsi</Label>
                            <Select 
                                value={selectedProvinsi} 
                                onValueChange={setSelectedProvinsi}
                                disabled={loadingEmsifa}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder={loadingEmsifa ? "Memuat..." : "Pilih Provinsi"} />
                                </SelectTrigger>
                                <SelectContent>
                                    {provinsiList.map((provinsi) => (
                                        <SelectItem key={provinsi.id} value={provinsi.id}>
                                            {provinsi.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {selectedProvinsi && (
                            <div className="grid gap-2">
                                <Label>Pilih Kabupaten</Label>
                                <Select 
                                    value={formData.regionCode} 
                                    onValueChange={(value) => {
                                        const kabupaten = kabupatenList.find(k => k.id === value)
                                        if (kabupaten) handleWilayahSelect(kabupaten)
                                    }}
                                    disabled={loadingEmsifa}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder={loadingEmsifa ? "Memuat..." : "Pilih Kabupaten"} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {kabupatenList.map((kabupaten) => (
                                            <SelectItem key={kabupaten.id} value={kabupaten.id}>
                                                {kabupaten.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </>
                )

            case 'kecamatan':
                return (
                    <>
                        <div className="grid gap-2">
                            <Label>Pilih Provinsi</Label>
                            <Select 
                                value={selectedProvinsi} 
                                onValueChange={setSelectedProvinsi}
                                disabled={loadingEmsifa}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder={loadingEmsifa ? "Memuat..." : "Pilih Provinsi"} />
                                </SelectTrigger>
                                <SelectContent>
                                    {provinsiList.map((provinsi) => (
                                        <SelectItem key={provinsi.id} value={provinsi.id}>
                                            {provinsi.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {selectedProvinsi && (
                            <div className="grid gap-2">
                                <Label>Pilih Kabupaten</Label>
                                <Select 
                                    value={selectedKabupaten} 
                                    onValueChange={setSelectedKabupaten}
                                    disabled={loadingEmsifa}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder={loadingEmsifa ? "Memuat..." : "Pilih Kabupaten"} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {kabupatenList.map((kabupaten) => (
                                            <SelectItem key={kabupaten.id} value={kabupaten.id}>
                                                {kabupaten.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        {selectedKabupaten && (
                            <div className="grid gap-2">
                                <Label>Pilih Kecamatan</Label>
                                <Select 
                                    value={formData.regionCode} 
                                    onValueChange={(value) => {
                                        const kecamatan = kecamatanList.find(k => k.id === value)
                                        if (kecamatan) handleWilayahSelect(kecamatan)
                                    }}
                                    disabled={loadingEmsifa}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder={loadingEmsifa ? "Memuat..." : "Pilih Kecamatan"} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {kecamatanList.map((kecamatan) => (
                                            <SelectItem key={kecamatan.id} value={kecamatan.id}>
                                                {kecamatan.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </>
                )

            case 'desa':
                return (
                    <>
                        <div className="grid gap-2">
                            <Label>Pilih Provinsi</Label>
                            <Select 
                                value={selectedProvinsi} 
                                onValueChange={setSelectedProvinsi}
                                disabled={loadingEmsifa}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder={loadingEmsifa ? "Memuat..." : "Pilih Provinsi"} />
                                </SelectTrigger>
                                <SelectContent>
                                    {provinsiList.map((provinsi) => (
                                        <SelectItem key={provinsi.id} value={provinsi.id}>
                                            {provinsi.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {selectedProvinsi && (
                            <div className="grid gap-2">
                                <Label>Pilih Kabupaten</Label>
                                <Select 
                                    value={selectedKabupaten} 
                                    onValueChange={setSelectedKabupaten}
                                    disabled={loadingEmsifa}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder={loadingEmsifa ? "Memuat..." : "Pilih Kabupaten"} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {kabupatenList.map((kabupaten) => (
                                            <SelectItem key={kabupaten.id} value={kabupaten.id}>
                                                {kabupaten.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        {selectedKabupaten && (
                            <div className="grid gap-2">
                                <Label>Pilih Kecamatan</Label>
                                <Select 
                                    value={selectedKecamatan} 
                                    onValueChange={setSelectedKecamatan}
                                    disabled={loadingEmsifa}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder={loadingEmsifa ? "Memuat..." : "Pilih Kecamatan"} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {kecamatanList.map((kecamatan) => (
                                            <SelectItem key={kecamatan.id} value={kecamatan.id}>
                                                {kecamatan.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        {selectedKecamatan && (
                            <div className="grid gap-2">
                                <Label>Pilih Desa</Label>
                                <Select 
                                    value={formData.regionCode} 
                                    onValueChange={(value) => {
                                        const desa = desaList.find(d => d.id === value)
                                        if (desa) handleWilayahSelect(desa)
                                    }}
                                    disabled={loadingEmsifa}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder={loadingEmsifa ? "Memuat..." : "Pilih Desa"} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {desaList.map((desa) => (
                                            <SelectItem key={desa.id} value={desa.id}>
                                                {desa.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </>
                )

            default:
                return null
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
                        <Button onClick={handleAdd} className="gap-2 cursor-pointer">
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
                                                            className="cursor-pointer"
                                                            onClick={() => handleEdit(location)}
                                                        >
                                                            <Edit2 className="w-4 h-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="cursor-pointer"
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
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>
                                {modalMode === 'add' ? 'Tambah Wilayah Baru' : 'Edit Wilayah'}
                            </DialogTitle>
                            <DialogDescription>
                                {modalMode === 'add' 
                                    ? 'Pilih wilayah dari data Emsifa API' 
                                    : 'Perbarui informasi wilayah'}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
                            <div className="grid gap-2">
                                <Label htmlFor="level">Level Wilayah</Label>
                                <Select 
                                    value={formData.level} 
                                    onValueChange={handleLevelChange}
                                    disabled={modalMode === 'edit'}
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

                            {renderWilayahDropdown()}

                            {formData.regionCode && (
                                <div className="grid gap-2">
                                    <Label>Kode Wilayah</Label>
                                    <Input
                                        value={formData.regionCode}
                                        disabled
                                        className="bg-muted"
                                    />
                                </div>
                            )}

                            {formData.regionName && (
                                <div className="grid gap-2">
                                    <Label>Nama Wilayah</Label>
                                    <Input
                                        value={formData.regionName}
                                        disabled
                                        className="bg-muted"
                                    />
                                </div>
                            )}

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
                            <Button variant="outline" className="cursor-pointer" onClick={() => setShowModal(false)}>
                                Batal
                            </Button>
                            <Button className="cursor-pointer" onClick={handleSubmit} disabled={loading || !formData.regionCode}>
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
                            <AlertDialogCancel className="cursor-pointer">Batal</AlertDialogCancel>
                            <AlertDialogAction className="cursor-pointer" onClick={handleDeleteConfirm}>
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