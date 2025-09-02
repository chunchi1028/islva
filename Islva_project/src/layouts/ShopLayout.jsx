import ShopNavbar from "../component/ShopNavbar"
import Footer from "../component/Footer"
import { Outlet } from "react-router-dom";

const ShopLayout = () => {
    return (
            <div>
                <ShopNavbar />
                <main><Outlet /></main>
                <Footer />
            </div>
    
    )
}

export default ShopLayout