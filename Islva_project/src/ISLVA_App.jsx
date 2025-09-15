import { Route, Routes } from "react-router-dom";

import Layout from "./layouts/Layout.jsx";
import ShopLayout from "./layouts/ShopLayout.jsx";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Glossary from "./pages/Glossary.jsx";
import Collections from "./pages/Collections.jsx";

import Member from "./pages/Member.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ForgetPassword from "./pages/ForgetPassword.jsx";

import Form from "./pages/Form.jsx";
import Lumen from "./pages/Lumen.jsx";
import Core from "./pages/Core.jsx";

import AnimalSeries from "./components/AnimalSeries.jsx"
import ScrollGallery from "./components/ScrollGallery.jsx"

// import Care from "./pages/Care.jsx";
// import Material from "./pages/Material.jsx";
// import Craft from "./pages/Craft.jsx";
// import Finish from "./pages/Finish.jsx";

// shop
import Shop from "./pages/Shop/Shop.jsx";
import ShopNew from "./pages/Shop/ShopNew.jsx";
import ShopSale from "./pages/Shop/ShopSale.jsx";
import ShopCollections from "./pages/Shop/ShopCollections.jsx";

const ISLVA_App = () => {
  return (
    <div className="wrap">
      <Routes>
        {/* 主站頁面：全部用 Layout 包 */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/glossary" element={<Glossary />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/member" element={<Member />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/animalSeries" element={<AnimalSeries />} />
           <Route path="/scrollGallery" element={<ScrollGallery />} />
          {/* Collection 子頁 */}
          <Route path="/form" element={<Form />} />
          <Route path="/lumen" element={<Lumen />} />
          <Route path="/core" element={<Core />} />
          {/* Glossary 子頁 */}
          {/* <Route path="material" element={<Material />} />
          <Route path="craft" element={<Craft />} />
          <Route path="finish" element={<Finish />} />
          <Route path="care" element={<Care />} /> */}
        </Route>

        {/* Shop 獨立結構 */}
        <Route path="/shop" element={<ShopLayout />}>
          <Route index element={<Shop />} />
          <Route path="new" element={<ShopNew />} />
          <Route path="sale" element={<ShopSale />} />
          <Route path="collections" element={<ShopCollections />} />
        </Route>

        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </div>
  );
};

export default ISLVA_App;
