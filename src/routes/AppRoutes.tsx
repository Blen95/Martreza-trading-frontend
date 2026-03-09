import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/Mainlayount";
import Home from "../pages/Home";
import About from "../pages/About";
import Materials from "../pages/Materials";
import FinishingPage from "../pages/Materials/Finishing";
import Services from "../pages/Services";
import Contact from "../pages/Contact";
import CivilPage from "../pages/Materials/civil";
import ElectroPage from "../pages/Materials/electromechanical";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/materials" element={<Materials />} />
        <Route path="/materials/finishing" element={<FinishingPage/>}/>
        <Route path="/materials/civil" element={<CivilPage/>}/>
        <Route path="/materials/electro" element={<ElectroPage/>}/>
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}