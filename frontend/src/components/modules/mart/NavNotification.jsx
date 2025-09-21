import React from 'react'
import { Bell } from 'lucide-react'

import EachUtils from '@/utils/EachUtils'
import { LIST_NOTIFICATIONS } from '@/constants/listNotifications'

const NavNotification = () => {
    return (
        <div className="relative group inline-block">
            <Bell size={23} className="cursor-pointer text-gray-700 hover:text-yellow-500 transition" />

            <div className="absolute right-0 mt-3 w-80 bg-white shadow-lg rounded-xl p-2 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all z-20 border border-gray-200">
                <div className="pb-2 mb-2 text-center border-b border-gray-200 font-semibold text-gray-800">
                    Notifikasi
                </div>
                <div>
                    <EachUtils 
                        of={LIST_NOTIFICATIONS.slice(0, 3)}
                        render={(item, index) => (
                            <div key={index} className="p-3 hover:bg-gray-100 rounded-md cursor-pointer text-sm transition flex flex-col gap-1">
                                <p className="font-medium text-gray-800">{item.message}</p>
                                <span className="text-xs text-gray-500">{item.time}</span>
                            </div>
                        )}
                    />
                </div>
                
                <div className="pt-2 mt-2 text-center border-t border-gray-200 font-semibold text-gray-800">
                    <a href="/notification" className="text-yellow-500 hover:underline text-sm font-medium">Lihat Semua</a>
                </div>
            </div>
        </div>
    )
}

export default NavNotification