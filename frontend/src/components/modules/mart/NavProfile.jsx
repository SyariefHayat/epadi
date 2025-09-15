import React from 'react'

import { 
    LogOut, 
    Settings, 
    User 
} from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useNavigate } from 'react-router-dom';

const NavProfile = () => {
    const navigate = useNavigate();

    return (
        <div className="relative group flex items-center space-x-2">
            <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className="absolute right-0 top-full mt-2 w-80 bg-white shadow-lg rounded-lg p-2 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all z-20 border">
                <div className="flex flex-col items-center justify-center gap-3 py-3">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p className="font-bold">Zaid Bin Amar</p>
                </div>

                <div className="w-full h-full flex flex-col border-t p-3 gap-3">
                <div className="flex items-center gap-3 hover:text-gray-500 rounded cursor-pointer text-sm" onClick={() => navigate("/profile")}>
                        <User size={15} />
                        Profil Saya
                    </div>
                    <div className="flex items-center gap-3 hover:text-gray-500 rounded cursor-pointer text-sm">
                        <Settings size={15} />
                        Pengaturan
                    </div>
                </div>

                <div className="flex items-center gap-3 p-3 hover:text-gray-500 rounded cursor-pointer text-sm border-t">
                    <LogOut size={15} />
                    Keluar
                </div>
            </div>
        </div>
    )
}

export default NavProfile