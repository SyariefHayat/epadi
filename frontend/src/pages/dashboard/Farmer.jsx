import React from 'react'

import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"

import AppSidebar from '@/components/modules/farmerDashboard/AppSidebar'
import SiteHeader from '@/components/modules/farmerDashboard/SiteHeader'

const Farmer = () => {
    return (
        <SidebarProvider
            style={
                {
                "--sidebar-width": "calc(var(--spacing) * 72)",
                "--header-height": "calc(var(--spacing) * 12)",
                }
            }
        >
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2 bg-green-50"></div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default Farmer