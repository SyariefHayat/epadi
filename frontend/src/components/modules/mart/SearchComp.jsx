import { Search } from 'lucide-react';
import React, { useState } from 'react';

import { Input } from '@/components/ui/input';

const SearchComp = () => {
    const [search, setSearch] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);

    const [history, setHistory] = useState([
        "Padi Pipil Kering",
        "Padi Manis Segar",
        "Padi Hibrida",
        "Padi Pakan Ternak",
        "Padi Bisi 18",
        "Padi Pioneer P32",
        "Padi Lokal",
        "Padi Organik",
        "Padi Kupas",
        "Padi Mentah",
        "Padi Siap Tanam",
        "Benih Padi Hibrida",
        "Benih Padi Bisi",
        "Benih Padi Manis",
        "Padi Premium Grade A",
        "Padi Biji Kering",
        "Padi Petani Lokal",
        "Padi Siap Panen",
    ]);

    const handleChange = (e) => {
        setSearch(e.target.value);
        setShowDropdown(true); 
    };

    const handleSearch = () => {
        if (search.trim() && !history.includes(search.trim())) setHistory([search.trim(), ...history]);

        setSearch("");
        setShowDropdown(false);
    };

    const handleSelectItem = (item) => {
        setSearch(item);
        setShowDropdown(false);
    };

    return (
        <div className="relative w-full">
            <Input
                value={search}
                onChange={handleChange}
                className="w-full h-11 rounded-full bg-gray-100 border-none pl-5 pr-10 hover:bg-white hover:ring-[3px] hover:ring-green-100 focus-visible:bg-white focus-visible:ring-green-100"
                placeholder="Masukkan nama merek atau produk..." 
            />

            <span 
                onClick={handleSearch}
                className="w-8 h-8 rounded-full bg-green-500 cursor-pointer absolute top-1/2 right-2 transform -translate-y-1/2 flex items-center justify-center"
            >
                <Search size="18" className="text-white" />
            </span>

            {search && showDropdown && (
                <div className="absolute p-2 mt-3 bg-white shadow-xl rounded-lg w-full max-h-60 z-10 border">
                    {history.length > 0 ? (
                        history
                            .filter(item => item.toLowerCase().includes(search.toLowerCase()))
                            .slice(0, 6)
                            .map((item, index) => (
                                <div 
                                    key={index}
                                    onClick={() => handleSelectItem(item)}
                                    className="p-2 hover:bg-gray-100 cursor-pointer text-sm rounded-sm"
                                >
                                    <Search size="16" className="inline mr-2 text-green-500" />
                                    {item}
                                </div>
                            ))
                    ) : (
                        <div className="px-4 py-2 text-sm text-gray-500">Tidak ada riwayat</div>
                    )}
                </div>
            )}
        </div>
    )
}

export default SearchComp;