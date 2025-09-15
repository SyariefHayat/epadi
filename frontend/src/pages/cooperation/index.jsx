import React from 'react'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import NavBar from '../landing/NavBar'
import Footer from '../landing/Footer'
import DefaultLayout from '@/components/layouts/DefaultLayout'

const stakeholders = [
    {
        name: "Budi Santoso",
        role: "Petani",
        contribution: "Menyuplai 30 ton beras/season",
        status: "Aktif",
    },
    {
        name: "PT Beras Sejahtera",
        role: "Distributor",
        contribution: "Distribusi beras ke pasar regional",
        status: "Aktif",
    },
    {
        name: "Siti Aminah",
        role: "Investor",
        contribution: "Investasi modal Rp 1 miliar untuk perluasan sawah",
        status: "Pending",
    },
    {
        name: "PT Konsumen Pangan Nusantara",
        role: "PT Penyerap",
        contribution: "Membeli 100 ton beras/bulan",
        status: "Aktif",
    },
    {
        name: "Kelompok Tani Padi Makmur",
        role: "Petani",
        contribution: "Mengelola 25 hektar lahan padi",
        status: "Aktif",
    },
]

const Cooperation = () => {
    return (
        <DefaultLayout>
            <NavBar/>
            <div className="w-full h-screen p-10">
                <h1 className="text-2xl font-semibold mb-6">Kerja Sama Stakeholder Padi</h1>

                <Table>
                    <TableCaption>
                        Daftar kerja sama aktif antara petani, investor, distributor, dan PT penyerap beras.
                    </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Nama Stakeholder</TableHead>
                            <TableHead>Peran</TableHead>
                            <TableHead>Kontribusi</TableHead>
                            <TableHead className="text-right">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {stakeholders.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{item.name}</TableCell>
                                <TableCell>{item.role}</TableCell>
                                <TableCell>{item.contribution}</TableCell>
                                <TableCell className="text-right">{item.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3}>Total Stakeholder</TableCell>
                            <TableCell className="text-right">{stakeholders.length}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
            <Footer />
        </DefaultLayout>
    )
}

export default Cooperation