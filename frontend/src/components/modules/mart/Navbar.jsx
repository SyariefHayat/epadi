import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MapPin, Store, Menu, X, ChevronDown } from 'lucide-react'

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import NavCart from './NavCart'
import NavMessage from './NavMessage'
import SearchComp from './SearchComp'
import NavProfile from './NavProfile'
import { Button } from '@/components/ui/button'
import NavNotification from './NavNotification'
import { Separator } from "@/components/ui/separator"

const Navbar = () => {
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileSubMenus, setMobileSubMenus] = useState({});

    const toggleMobileSubMenu = (menu) => {
        setMobileSubMenus(prev => ({
            ...prev,
            [menu]: !prev[menu]
        }));
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
        setMobileSubMenus({});
    };

    return (
        <header className="flex flex-col mb-5 sticky top-0 z-50 bg-white shadow-sm">
            <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 border-b">
                <Link to="/mart" className="flex items-center space-x-2 hover:opacity-80 transition-all">
                    <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
                        <span className="hidden sm:inline">Ekosistem Padi Digital</span>
                        <span className="sm:hidden">Epadi</span>
                    </h1>
                </Link>

                <div className="hidden md:block flex-1 max-w-lg mx-4">
                    <SearchComp />
                </div>

                <div className="hidden lg:flex items-center h-8 gap-3 xl:gap-5">
                    <NavMessage />
                    <NavNotification />
                    <NavCart />
                    <Separator orientation="vertical" />
                    <NavProfile />
                    <Button 
                        className="bg-green-500 hover:bg-green-400 text-white flex items-center gap-2 text-sm" 
                        onClick={() => navigate("/create/store")}
                    >
                        <Store size={16} />
                        <span className="hidden xl:inline">Mulai Jualan</span>
                        <span className="xl:hidden">Jual</span>
                    </Button>
                </div>

                <div className="flex lg:hidden items-center gap-2">
                    <div className="flex items-center gap-2">
                        <NavMessage />
                        <NavNotification />
                        <NavCart />
                        <NavProfile />
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2"
                    >
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </Button>
                </div>
            </div>

            <div className="md:hidden px-4 py-2 border-b bg-gray-50">
                <SearchComp />
            </div>

            <div className="hidden lg:flex items-center justify-between px-8 py-2">
                <NavigationMenu viewport={false}>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link to="/">Beranda</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Produk Padi</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-[400px] gap-3 p-4">
                                    <li>
                                        <NavigationMenuLink asChild>
                                            <Link to="#products" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                                <div className="text-sm font-medium leading-none">Semua Produk</div>
                                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                    Jelajahi semua produk Padi yang tersedia
                                                </p>
                                            </Link>
                                        </NavigationMenuLink>
                                    </li>
                                    <li>
                                        <NavigationMenuLink asChild>
                                            <Link to="#products/konsumsi" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                                <div className="text-sm font-medium leading-none">Padi Konsumsi</div>
                                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                    Padi berkualitas tinggi untuk konsumsi sehari-hari
                                                </p>
                                            </Link>
                                        </NavigationMenuLink>
                                    </li>
                                    <li>
                                        <NavigationMenuLink asChild>
                                            <Link to="#products/pakan" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                                <div className="text-sm font-medium leading-none">Padi Pakan</div>
                                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                    Padi khusus untuk pakan ternak berkualitas
                                                </p>
                                            </Link>
                                        </NavigationMenuLink>
                                    </li>
                                    <li>
                                        <NavigationMenuLink asChild>
                                            <Link to="#products/pipilan" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                                <div className="text-sm font-medium leading-none">Padi Pipilan Kering</div>
                                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                    Padi pipilan kering dengan kadar air optimal
                                                </p>
                                            </Link>
                                        </NavigationMenuLink>
                                    </li>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Petani & Produsen</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-[400px] gap-3 p-4">
                                    <li>
                                        <NavigationMenuLink asChild>
                                            <Link to="#farmers" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                                <div className="text-sm font-medium leading-none">Direktori Petani</div>
                                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                    Temukan petani dan produsen terpercaya di seluruh Indonesia
                                                </p>
                                            </Link>
                                        </NavigationMenuLink>
                                    </li>
                                    <li>
                                        <NavigationMenuLink asChild>
                                            <Link to="#farmers/profile" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                                <div className="text-sm font-medium leading-none">Profil Petani</div>
                                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                    Informasi lengkap tentang latar belakang dan sertifikasi petani
                                                </p>
                                            </Link>
                                        </NavigationMenuLink>
                                    </li>
                                    <li>
                                        <NavigationMenuLink asChild>
                                            <Link to="#become-farmer" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                                <div className="text-sm font-medium leading-none">Bergabung Sebagai Petani</div>
                                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                    Daftarkan diri Anda sebagai petani mitra kami
                                                </p>
                                            </Link>
                                        </NavigationMenuLink>
                                    </li>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Pendanaan</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-[400px] gap-3 p-4">
                                    <li>
                                        <NavigationMenuLink asChild>
                                            <Link to="#funding/active" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                                <div className="text-sm font-medium leading-none">Proyek Pendanaan Aktif</div>
                                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                    Lihat dan dukung proyek-proyek pertanian yang sedang berjalan
                                                </p>
                                            </Link>
                                        </NavigationMenuLink>
                                    </li>
                                    <li>
                                        <NavigationMenuLink asChild>
                                            <Link to="#funding/impact" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                                <div className="text-sm font-medium leading-none">Laporan Dampak</div>
                                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                    Transparansi dampak positif dari program pendanaan kami
                                                </p>
                                            </Link>
                                        </NavigationMenuLink>
                                    </li>
                                    <li>
                                        <NavigationMenuLink asChild>
                                            <Link to="#funding/apply" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                                <div className="text-sm font-medium leading-none">Ajukan Pendanaan</div>
                                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                    Ajukan proposal pendanaan untuk proyek pertanian Anda
                                                </p>
                                            </Link>
                                        </NavigationMenuLink>
                                    </li>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link to="#articles">Artikel & Edukasi</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link to="#contact">Hubungi Kami</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                <div className="flex items-center justify-center gap-2">
                    <MapPin size="20" className="text-gray-500" />
                    <p className="text-sm font-medium hover:underline hover:text-blue-600 cursor-pointer">
                        Gresik, Jawa Timur, Indonesia
                    </p>
                </div>
            </div>

            {mobileMenuOpen && (
                <div className="lg:hidden bg-white border-b shadow-lg">
                    <div className="px-4 py-2 space-y-1">
                        <Link 
                            to="/" 
                            className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                            onClick={closeMobileMenu}
                        >
                            Beranda
                        </Link>

                        <div>
                            <button
                                onClick={() => toggleMobileSubMenu('products')}
                                className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                            >
                                Produk Padi
                                <ChevronDown 
                                    size={16} 
                                    className={`transition-transform ${mobileSubMenus.products ? 'rotate-180' : ''}`} 
                                />
                            </button>
                            {mobileSubMenus.products && (
                                <div className="ml-4 mt-1 space-y-1">
                                    <Link to="#products" className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md" onClick={closeMobileMenu}>
                                        Semua Produk
                                    </Link>
                                    <Link to="#products/konsumsi" className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md" onClick={closeMobileMenu}>
                                        Padi Konsumsi
                                    </Link>
                                    <Link to="#products/pakan" className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md" onClick={closeMobileMenu}>
                                        Padi Pakan
                                    </Link>
                                    <Link to="#products/pipilan" className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md" onClick={closeMobileMenu}>
                                        Padi Pipilan Kering
                                    </Link>
                                </div>
                            )}
                        </div>

                        <div>
                            <button
                                onClick={() => toggleMobileSubMenu('farmers')}
                                className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                            >
                                Petani & Produsen
                                <ChevronDown 
                                    size={16} 
                                    className={`transition-transform ${mobileSubMenus.farmers ? 'rotate-180' : ''}`} 
                                />
                            </button>
                            {mobileSubMenus.farmers && (
                                <div className="ml-4 mt-1 space-y-1">
                                    <Link to="#farmers" className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md" onClick={closeMobileMenu}>
                                        Direktori Petani
                                    </Link>
                                    <Link to="#farmers/profile" className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md" onClick={closeMobileMenu}>
                                        Profil Petani
                                    </Link>
                                    <Link to="#become-farmer" className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md" onClick={closeMobileMenu}>
                                        Bergabung Sebagai Petani
                                    </Link>
                                </div>
                            )}
                        </div>

                        <div>
                            <button
                                onClick={() => toggleMobileSubMenu('funding')}
                                className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                            >
                                Pendanaan
                                <ChevronDown 
                                    size={16} 
                                    className={`transition-transform ${mobileSubMenus.funding ? 'rotate-180' : ''}`} 
                                />
                            </button>
                            {mobileSubMenus.funding && (
                                <div className="ml-4 mt-1 space-y-1">
                                    <Link to="#funding/active" className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md" onClick={closeMobileMenu}>
                                        Proyek Pendanaan Aktif
                                    </Link>
                                    <Link to="#funding/impact" className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md" onClick={closeMobileMenu}>
                                        Laporan Dampak
                                    </Link>
                                    <Link to="#funding/apply" className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md" onClick={closeMobileMenu}>
                                        Ajukan Pendanaan
                                    </Link>
                                </div>
                            )}
                        </div>

                        <Link 
                            to="#articles" 
                            className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                            onClick={closeMobileMenu}
                        >
                            Artikel & Edukasi
                        </Link>
                        
                        <Link 
                            to="#contact" 
                            className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                            onClick={closeMobileMenu}
                        >
                            Hubungi Kami
                        </Link>

                        <div className="pt-3 border-t space-y-2">
                            <Button 
                                className="w-full bg-green-500 hover:bg-green-400 text-white flex items-center justify-center gap-2" 
                                onClick={() => {
                                    navigate("/create/store");
                                    closeMobileMenu();
                                }}
                            >
                                <Store size={16} />
                                Mulai Jualan
                            </Button>
                            
                            <div className="flex items-center justify-center gap-2 py-2">
                                <MapPin size="16" className="text-gray-500" />
                                <p className="text-xs font-medium text-gray-600">
                                    Gresik, Jawa Timur, Indonesia
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}

export default Navbar