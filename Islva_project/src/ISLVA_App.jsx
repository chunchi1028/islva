import { Route, Routes } from "react-router-dom";
import NavBar from "./component/NavBar.jsx"
import Home from "./pages/Home.jsx"
import About from "./pages/About.jsx"
import Glossary from "./pages/Glossary.jsx" 
import Shop from "./pages/Shop.jsx";
import Member from "./pages/Member.jsx";

const ISLVA_App = () => {
  return (
    <div className="wrap">
    <NavBar/>
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </div>
  )
}

export default ISLVA_App