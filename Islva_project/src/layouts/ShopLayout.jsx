import ShopNavbar from "../components/ShopNavbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const ShopLayout = () => {
  return (
    <div>
      <ShopNavbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default ShopLayout;
