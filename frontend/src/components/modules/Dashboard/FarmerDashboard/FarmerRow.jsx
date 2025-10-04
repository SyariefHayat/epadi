import React from 'react';

import { 
    MoreHorizontal, 
    ShieldCheck, 
    UserX 
} from 'lucide-react';

import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

import EachUtils from '@/utils/EachUtils';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";

const FarmerRow = ({ farmer }) => {
    const farmerDetail = farmer?.farmerDetail || {};
    const lands = farmerDetail?.lands || [];
    const province = farmerDetail?.province || '-';
    const city = farmerDetail?.city || '-';
    const subDistrict = farmerDetail?.subDistrict || '-';
    const ward = farmerDetail?.ward || '-';

    return (
        <TableRow>
            <TableCell className="font-medium">{farmer?.fullName || '-'}</TableCell>
            <TableCell>{farmer?.NIK || '-'}</TableCell>
            <TableCell>
                <Badge variant="outline" className="capitalize">
                    {farmer?.role || 'N/A'}
                </Badge>
            </TableCell>
            <TableCell>
                {lands.length > 0 ? (
                    <EachUtils 
                        of={lands}
                        render={(item, index) => (
                            <p key={index}>{item?.landArea || '-'} m²</p>
                        )}
                    />
                ) : (
                    <span className="text-muted-foreground">-</span>
                )}
            </TableCell>
            <TableCell>{province}</TableCell>
            <TableCell>{city}</TableCell>
            <TableCell>{subDistrict}</TableCell>
            <TableCell>{ward}</TableCell>
            <TableCell>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="cursor-pointer">
                            <MoreHorizontal size={16} />
                        </Button>
                    </DropdownMenuTrigger>
                    
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem 
                            className="flex items-center gap-2 cursor-pointer"
                        >
                            <ShieldCheck size={14} />
                            <span>Edit</span>
                        </DropdownMenuItem>

                        <DropdownMenuItem 
                            className="flex items-center gap-2 cursor-pointer text-destructive"
                        >
                            <UserX size={14} />
                            <span>Hapus</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    );
};

export default FarmerRow;