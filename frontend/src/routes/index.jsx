import Login from "@/pages/auth/Login"
import ProfileSetup from "@/pages/trash/ProfileSetup"
import Otp from "@/pages/trash/Otp"
import Success from "@/pages/trash/Success"
import VerifyOtp from "@/pages/trash/VerifyOtp"
import Community from "@/pages/community"
import Cooperation from "@/pages/cooperation"
import Seller from "@/pages/dashboard/Seller"
import Home from "@/pages/landing/Home"
import Cart from "@/pages/mart/Cart"
import Category from "@/pages/mart/Category"
import CreateStore from "@/pages/mart/CreateStore"
import ForYouRecom from "@/pages/mart/ForYouRecommendation"
import Mart from "@/pages/mart/Mart"
import Message from "@/pages/mart/Message"
import Notification from "@/pages/mart/Notification"
import PopularProducts from "@/pages/mart/PopularProduct"
import Product from "@/pages/mart/Product"
import Profile from "@/pages/mart/Profile"
import StoreDetail from "@/pages/mart/Store"
import StoreRecommendations from "@/pages/mart/StoreRecommendation"
import News from "@/pages/news"
import PriceMarket from "@/pages/priceMarket"
import FarmerSignup from "@/pages/auth/SignUp"
import DistributorSignup from "@/pages/trash/DistributorSignup"
import InvestorSignup from "@/pages/trash/InvestorSignup"
import BuyerSignup from "@/pages/trash/BuyerSignup"
import Farmer from "@/pages/dashboard/Farmer"
import Distributor from "@/pages/dashboard/Distributor"
import Investor from "@/pages/dashboard/Investor"
import AboutUs from "@/pages/aboutUs"
import AdminLogin from "@/pages/trash/AdminLogin"
import Admin from "@/pages/dashboard/Admin"
import { ErrorBoundary } from "@/pages/error"
import ProtectedRoute from "@/components/modules/auth/ProtectedRoute"
import RoleSelection from "@/pages/auth/RoleSelection"
import SignUp from "@/pages/auth/SignUp"

const routes = [
    { 
        path: "/", 
        element: <Home />,
        errorElement: <ErrorBoundary />,
    },
    { 
        path: "/about-us", 
        element: <AboutUs />,
        errorElement: <ErrorBoundary />,
    },
    { 
        path: "/price-market", 
        element: <PriceMarket />,
        errorElement: <ErrorBoundary />,
    },
    { 
        path: "/community", 
        element: <Community />,
        errorElement: <ErrorBoundary />,
    },
    { 
        path: "/cooperation", 
        element: <Cooperation />,
        errorElement: <ErrorBoundary />,
    },
    { 
        path: "/marketplace",
        element: <Mart />,
        errorElement: <ErrorBoundary />,
    },
    { 
        path: "/news", 
        element: <News />,
        errorElement: <ErrorBoundary />,
    },
    { 
        path: "/signup",
        element: <RoleSelection />,
        errorElement: <ErrorBoundary />,
    },
    {
        path: "/signup/:role",
        element: <SignUp />,
        errorElement: <ErrorBoundary />
    },
    { 
        path: "/login", 
        element: <Login />,
        errorElement: <ErrorBoundary />,
    },
    { 
        path: "/juki-admin", 
        element: <AdminLogin />,
        errorElement: <ErrorBoundary />,
    },
    // { 
    //     path: "/signup/farmer", 
    //     element: <FarmerSignup />,
    //     errorElement: <ErrorBoundary />,
    // },
    // { 
    //     path: "/signup/distributor", 
    //     element: <DistributorSignup />,
    //     errorElement: <ErrorBoundary />,
    // },
    // { 
    //     path: "/signup/investor", 
    //     element: <InvestorSignup />,
    //     errorElement: <ErrorBoundary />,
    // },
    // { 
    //     path: "/signup/buyer", 
    //     element: <BuyerSignup />,
    //     errorElement: <ErrorBoundary />,
    // },
    // { 
    //     path: "/signup/otp", 
    //     element: <Otp />,
    //     errorElement: <ErrorBoundary />,
    // },
    // { 
    //     path: "/signup/verify-otp", 
    //     element: <VerifyOtp />,
    //     errorElement: <ErrorBoundary />,
    // },
    // { 
    //     path: "/signup/profile-setup", 
    //     element: <ProfileSetup />,
    //     errorElement: <ErrorBoundary />,
    // },
    // { 
    //     path: "/signup/success", 
    //     element: <Success />,
    //     errorElement: <ErrorBoundary />,
    // },
    { 
        path: "/dashboard/admin", 
        element: <Admin />,
        errorElement: <ErrorBoundary />,
    },
    { 
        path: "/dashboard/farmer", 
        element:
            <ProtectedRoute>
                <Farmer />
            </ProtectedRoute>,
        errorElement: <ErrorBoundary />,
    },
    { 
        path: "/dashboard/distributor", 
        element: <Distributor />,
        errorElement: <ErrorBoundary />,
    },
    { 
        path: "/dashboard/investor", 
        element: <Investor />,
        errorElement: <ErrorBoundary />,
    },
    { 
        path: "/mart", 
        element: <Mart />,
        errorElement: <ErrorBoundary />,
    },
    { 
        path: "/mart/category", 
        element: <Category />,
        errorElement: <ErrorBoundary />,
    },
    { 
        path: "/mart/popular", 
        element: <PopularProducts />,
        errorElement: <ErrorBoundary />,
    },
    { 
        path: "/mart/category/:category", 
        element: <Category />,
        errorElement: <ErrorBoundary />,
    },
    { 
        path: "/mart/store", 
        element: <StoreRecommendations />,
        errorElement: <ErrorBoundary />,
    },
    { 
        path: "/mart/store/:toko", 
        element: <StoreDetail />,
        errorElement: <ErrorBoundary />,
    },
    { 
        path: "/mart/store/:toko/:produk", 
        element: <Product />,
        errorElement: <ErrorBoundary />,
    },
    { 
        path: "/mart/for-you", 
        element: <ForYouRecom />,
        errorElement: <ErrorBoundary />,
    },
    { 
        path: "/message", 
        element: <Message />,
        errorElement: <ErrorBoundary />,
    },
    { 
        path: "/notification", 
        element: <Notification />,
        errorElement: <ErrorBoundary />,
    },
    { 
        path: "/cart", 
        element: <Cart />,
        errorElement: <ErrorBoundary />,
    },
    { 
        path: "/profile", 
        element: <Profile />,
        errorElement: <ErrorBoundary />,
    },
    { 
        path: "/create/store", 
        element: <CreateStore />,
        errorElement: <ErrorBoundary />,
    },
    { 
        path: "/seller", 
        element: <Seller />,
        errorElement: <ErrorBoundary />,
    },
]

export default routes