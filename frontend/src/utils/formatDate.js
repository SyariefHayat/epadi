export const formatTanggalIndo = (date = new Date()) => {
    const hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const bulan = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    const namaHari = hari[date.getDay()];
    const tanggal = date.getDate().toString().padStart(2, '0');
    const namaBulan = bulan[date.getMonth()];
    const tahun = date.getFullYear();

    return `${namaHari}, ${tanggal} ${namaBulan} ${tahun}`;
};