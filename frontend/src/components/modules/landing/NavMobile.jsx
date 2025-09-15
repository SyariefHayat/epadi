import React from 'react'

import { 
    Menu, 
} from 'lucide-react'

import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import EachUtils from '@/utils/EachUtils'
import { Button } from '@/components/ui/button'
import { LIST_NAVBAR } from '@/constants/listNavbar'

const AccountMobile = () => {
    return (
        <div className="flex lg:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="bg-transparent">
                        <Menu />
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>
                            <a href="/" className="-m-1.5 p-1.5">
                                <span className="sr-only">Rantai Pasok Distribusi</span>
                                <span>Rantai Pasok Distribusi</span>
                            </a>
                        </SheetTitle>
                    </SheetHeader>
                    <div className="space-y-2 px-5">
                        <EachUtils
                            of={LIST_NAVBAR}
                            render={(item, index) =>
                                item.subMenu ? (
                                    <Accordion type="single" collapsible>
                                        <AccordionItem value="item-1">
                                            <AccordionTrigger className="flex items-center h-10">
                                                <span className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">{item.title}</span>
                                            </AccordionTrigger>
                                            <AccordionContent className="p-0">
                                                <EachUtils
                                                    of={item.subMenu}
                                                    render={(subItem, subIndex) => (
                                                        <a
                                                            key={subIndex}
                                                            href={subItem.url} 
                                                            className="flex items-center text-sm/6 font-medium text-gray-900 gap-3 my-3"
                                                        >
                                                            <div className="flex items-center justify-center w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200">
                                                                <subItem.icon size={18} />
                                                            </div>
                                                            <span className="font-medium">
                                                                {subItem.title}
                                                            </span>
                                                        </a>
                                                    )}
                                                />
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                ) : (
                                    <a
                                        key={index}
                                        href={item.url}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                    >
                                        {item.title}
                                    </a>
                                )
                            }
                        />
                    </div>
                    <SheetFooter>
                        <a
                            href="/sign-in"
                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                        >
                            Log in
                        </a>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default AccountMobile