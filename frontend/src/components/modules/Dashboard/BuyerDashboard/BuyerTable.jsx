import React from 'react';
import { User, ChevronLeft, ChevronRight } from 'lucide-react';

const BuyerTable = ({
    buyers,
    isLoading,
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    onPageChange,
    searchQuery
}) => {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const formatDate = (date) => {
        if (!date) return '-';
        return new Date(date).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };

    const getInitials = (name) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    if (isLoading) {
        return (
            <div className="flex h-64 items-center justify-center rounded-lg border bg-white">
                <div className="text-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent mx-auto"></div>
                    <p className="mt-4 text-gray-600">Memuat data pembeli...</p>
                </div>
            </div>
        );
    }

    if (!buyers || buyers.length === 0) {
        return (
            <div className="flex h-64 items-center justify-center rounded-lg border bg-white">
                <div className="text-center">
                    <User className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-4 text-lg font-semibold text-gray-900">
                        Tidak ada data pembeli
                    </p>
                    <p className="text-gray-600">
                        {searchQuery ? 'Coba ubah kata kunci pencarian' : 'Belum ada pembeli terdaftar'}
                    </p>
                </div>
            </div>
        );
    }

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    return (
        <div className="rounded-lg border bg-white">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="border-b bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                                Pembeli
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                                Kontak
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                                Lokasi
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                                Kapasitas Beli
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                                Tanggal Lahir
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {buyers.map((buyer) => (
                            <tr key={buyer._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        {buyer.profilePicture ? (
                                            <img
                                                src={buyer.profilePicture}
                                                alt={buyer.fullName}
                                                className="h-10 w-10 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">
                                                {getInitials(buyer.fullName)}
                                            </div>
                                        )}
                                        <div>
                                            <div className="font-medium text-gray-900">
                                                {buyer.fullName}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {buyer.gender || '-'}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-900">
                                        {buyer.phone || '-'}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-900">
                                        {buyer.ward && buyer.subDistrict ? (
                                            <>
                                                <div>{buyer.ward}, {buyer.subDistrict}</div>
                                                <div className="text-gray-500">
                                                    {buyer.city}, {buyer.province}
                                                </div>
                                            </>
                                        ) : (
                                            '-'
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-semibold text-green-600">
                                        {formatCurrency(buyer.purchasingCapacity)}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-900">
                                        {formatDate(buyer.dateOfBirth)}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t px-6 py-4">
                <div className="text-sm text-gray-700">
                    Menampilkan <span className="font-semibold">{startItem}</span> hingga{' '}
                    <span className="font-semibold">{endItem}</span> dari{' '}
                    <span className="font-semibold">{totalItems}</span> pembeli
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 bg-white hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>

                    <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                            .filter(page => {
                                if (totalPages <= 7) return true;
                                if (page === 1 || page === totalPages) return true;
                                if (page >= currentPage - 1 && page <= currentPage + 1) return true;
                                return false;
                            })
                            .map((page, index, array) => (
                                <React.Fragment key={page}>
                                    {index > 0 && array[index - 1] !== page - 1 && (
                                        <span className="px-2 text-gray-500">...</span>
                                    )}
                                    <button
                                        onClick={() => onPageChange(page)}
                                        className={`h-9 w-9 rounded-md text-sm font-medium ${
                                            currentPage === page
                                                ? 'bg-blue-600 text-white'
                                                : 'border border-gray-300 bg-white hover:bg-gray-50'
                                        }`}
                                    >
                                        {page}
                                    </button>
                                </React.Fragment>
                            ))}
                    </div>

                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 bg-white hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BuyerTable;