import React from 'react';

import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from "@/components/ui/table";

import FarmerRow from './FarmerRow';
import EachUtils from '@/utils/EachUtils';
import UserTablePagination from './TablePagination';

const UserTable = ({ 
    farmers, 
    isLoading, 
    currentPage, 
    totalPages, 
    totalItems, 
    itemsPerPage,
    onPageChange,
    searchQuery = ''
}) => {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nama</TableHead>
                        <TableHead>NIK</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Luas Lahan</TableHead>
                        <TableHead>Provinsi</TableHead>
                        <TableHead>Kota</TableHead>
                        <TableHead>Kecamatan</TableHead>
                        <TableHead>Desa</TableHead>
                        <TableHead>Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        <TableRow>
                            <TableCell colSpan={9} className="text-center py-6">
                                Memuat data...
                            </TableCell>
                        </TableRow>
                    ) : farmers && farmers.length > 0 ? (
                        <EachUtils
                            of={farmers}
                            render={(item, index) => (
                                <FarmerRow key={item._id || index} farmer={item} />
                            )}
                        />
                    ) : (
                        <TableRow>
                            <TableCell colSpan={9} className="text-center py-6 text-muted-foreground">
                                {searchQuery ? 'Tidak ada hasil pencarian.' : 'Tidak ada pengguna ditemukan.'}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {totalItems > 0 && (
                <UserTablePagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    itemsPerPage={itemsPerPage}
                    totalItems={totalItems}
                    onPageChange={onPageChange}
                />
            )}
        </div>
    );
};

export default UserTable;