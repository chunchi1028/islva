import Navbar from "../component/NavBar"
import Footer from "../component/Footer"
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div>
            <Navbar />
            <main><Outlet /></main>
            <Footer />
        </div>
    )
}

export default Layout