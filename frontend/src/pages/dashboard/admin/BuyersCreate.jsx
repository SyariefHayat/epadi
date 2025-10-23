import React from 'react'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import BuyerBiodataForm from '@/components/modules/buyerDashboard/BuyerBiodataForm'

const BuyersCreate = () => {
    return (
        <DashboardLayout>
            <BuyerBiodataForm />
        </DashboardLayout>
    )
}

export default BuyersCreate