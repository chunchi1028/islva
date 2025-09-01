import { Route, Routes } from "react-router-dom";
import NavBar from "./component/NavBar.jsx"
import Home from "./pages/Home.jsx"
import About from "./pages/About.jsx"
import Glossary from "./pages/Glossary.jsx"
import Shop from "./pages/Shop.jsx";
import Member from "./pages/Member.jsx";
import Collections from "./pages/Collections.jsx";
import Footer from "./component/Footer.jsx"
import Form from "./pages/Form.jsx";
import Lumen from "./pages/Lumen.jsx";
import Core from "./pages/Core.jsx";
import Care from "./pages/Care.jsx";
import Material from "./pages/Material.jsx";
import Craft from "./pages/Craft.jsx";
import Finish from "./pages/Finish.jsx";


const ISLVA_App = () => {
  return (
    <div className="wrap">
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/About" element={<About/>}></Route>
        <Route path="/Glossary" element={<Glossary/>}></Route>
        <Route path="/Shop" element={<Shop/>}></Route>
        <Route path="/Member" element={<Member/>}></Route>
        <Route path="/Collections" element={<Collections/>}></Route>
        <Route path="/Form" element={<Form/>}></Route>
        <Route path="/Lumen" element={<Lumen/>}></Route>
        <Route path="/Core" element={<Core/>}></Route>
        <Route path="/Care" element={<Care/>}></Route>
        <Route path="/Material" element={<Material/>}></Route>
        <Route path="/Craft" element={<Craft/>}></Route>
        <Route path="/Finish" element={<Finish/>}></Route>
      </Routes>
      <Footer/>
    </div>
  )
}

export default ISLVA_App