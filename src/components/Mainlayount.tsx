import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 pt-24 px-6 max-w-7xl mx-auto w-full">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}