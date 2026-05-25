import { Routes, Route } from "react-router-dom";

import MainLayout from "../components/Mainlayount";

import Home from "../pages/Home";
import About from "../pages/About";
import Materials from "../pages/Materials";
import FinishingPage from "../pages/Materials/Finishing";
import CivilPage from "../pages/Materials/civil";
import ElectroPage from "../pages/Materials/electromechanical";
import Services from "../pages/Services";
import Contact from "../pages/Contact";

import Dashboard from "../pages/Dashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import StockManagerDashboard from "../pages/StockManagerDashboard";
import InventoryPage from "../pages/admin/InventoryPage";
import RequestsPage from "../pages/admin/Requestspage";

import OrdersPage from "../pages/admin/Orderspage";
import QuoteRequestPage from "../pages/QuoteRequestPage";

import { DashboardLayout } from "../layouts/DashboardLayout";

export default function AppRoutes() {
  return (
    <Routes>

      {/* PUBLIC ROUTES */}

      <Route element={<MainLayout />}>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/materials"
          element={<Materials />}
        />

        <Route
          path="/materials/finishing"
          element={<FinishingPage />}
        />

        <Route
          path="/materials/civil"
          element={<CivilPage />}
        />

        <Route
          path="/materials/electro"
          element={<ElectroPage />}
        />

        <Route
          path="/services"
          element={<Services />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/quote-request"
          element={<QuoteRequestPage />}
        />
      </Route>

      {/* DASHBOARD ROUTES */}

      <Route element={<DashboardLayout />}>

         <Route
          path="/dashboard"
          element={<Dashboard />}
        />

<Route
  path="/admin/dashboard"
  element={<AdminDashboard />}
/>
        <Route
          path="/requests"
          element={<RequestsPage />}
        />

        <Route
          path="/orders"
          element={<OrdersPage />}
        />
<Route
  path="/inventory"
  element={<InventoryPage />}
/>
<Route
  path="/stock/dashboard"
  element={<StockManagerDashboard />}
/>
      </Route>
      
    </Routes>
  );
}