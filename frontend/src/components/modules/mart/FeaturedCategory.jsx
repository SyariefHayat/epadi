import React from "react";
import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import EachUtils from "@/utils/EachUtils";
import { Button } from "@/components/ui/button";
import { LIST_FEATURED_CATEGORY } from "@/constants/listFeaturedCategory";

const FeaturedCategory = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full h-full">
            <div className="flex items-center justify-between gap-3 mb-5">
                <p className="text-lg sm:text-xl font-semibold text-gray-800">
                Kategori Unggulan
                </p>

                <Link to="/mart/category">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center space-x-1 text-green-600 hover:bg-green-100"
                    >
                        <span className="text-sm sm:text-base">Lihat Semua</span>
                        <ArrowRight size={16} />
                    </Button>
                </Link>
            </div>

            <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                <EachUtils
                    of={LIST_FEATURED_CATEGORY}
                    render={(item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg flex flex-col cursor-pointer transition hover:shadow-md p-2 sm:p-3"
                            onClick={() => navigate(`/mart/category/${item.url}`)}
                        >
                            <div className="relative">
                                <img
                                    src={item.image}
                                    alt={`Kategori ${item.name}`}
                                    loading="lazy"
                                    className="w-full h-24 sm:h-32 md:h-40 object-cover rounded-md mb-2 sm:mb-3"
                                />
                            </div>

                            <div className="flex flex-col justify-between flex-grow text-center">
                                <p className="font-semibold text-gray-800 text-xs sm:text-sm line-clamp-2">
                                    {item.name}
                                </p>
                                <span className="text-xs text-gray-500 mt-1">
                                    {item.totalItem} produk
                                </span>
                            </div>
                        </div>
                    )}
                />
            </div>
        </div>
    );
};

export default FeaturedCategory;