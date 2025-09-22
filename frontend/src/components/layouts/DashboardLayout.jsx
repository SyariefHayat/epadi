import React from 'react';

import { 
    SidebarInset, 
    SidebarProvider 
} from '@/components/ui/sidebar'

import { Toaster } from '@/components/ui/sonner';
import AppSidebar from '../modules/Dashboard/AppSidebar';
import SiteHeader from '../modules/Dashboard/SiteHeader';

const DashboardLayout = ({ children }) => {
    return (
        <SidebarProvider>
            <Toaster />
            <AppSidebar />
            <SidebarInset>
                <SiteHeader />
                { children }
            </SidebarInset>
        </SidebarProvider>
    )
}

export default DashboardLayout