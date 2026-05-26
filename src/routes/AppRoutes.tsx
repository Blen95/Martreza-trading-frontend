import { Routes, Route } from "react-router-dom";

// ================= LAYOUTS ================= //

import MainLayout from "../components/Mainlayount";

import {
  DashboardLayout,
} from "../layouts/DashboardLayout";

import CustomerLayout from "../layouts/CustomerLayout";

// ================= AUTH ================= //

import ProtectedRoute from "../components/Authentication/ProtectedRoute";

// ================= PUBLIC PAGES ================= //

import Home from "../pages/Home";

import About from "../pages/About";

import Materials from "../pages/Materials";

import FinishingPage from "../pages/Materials/Finishing";

import CivilPage from "../pages/Materials/civil";

import ElectroPage from "../pages/Materials/electromechanical";

import Services from "../pages/Services";

import Contact from "../pages/Contact";

import QuoteRequestPage from "../pages/QuoteRequestPage";

// ================= ADMIN PAGES ================= //

import AdminDashboard from "../pages/admin/AdminDashboard";

import RequestsPage from "../pages/admin/Requestspage";

import OrdersPage from "../pages/admin/Orderspage";

import InventoryPage from "../pages/admin/InventoryPage";

// ================= STOCK MANAGER ================= //

import StockManagerDashboard from "../pages/StockManagerDashboard";

// ================= CUSTOMER PAGES ================= //

import CustomerDashboard from "../pages/curstomer/CustomerDashboard";

import CustomerRequestsPage from "../pages/curstomer/CustomerRequestsPage";

import CustomerOrdersPage from "../pages/curstomer/CustomerOrdersPage";

export default function AppRoutes() {

  return (

    <Routes>

      {/* ================================================= */}
      {/* ================= PUBLIC ROUTES ================= */}
      {/* ================================================= */}

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

      {/* ================================================= */}
      {/* ================= ADMIN ROUTES ================= */}
      {/* ================================================= */}

      <Route
        element={
          <ProtectedRoute
            allowedRoles={[
              "admin",
            ]}
          />
        }
      >

        <Route
          element={<DashboardLayout />}
        >

          <Route
            path="/admin/dashboard"
            element={
              <AdminDashboard />
            }
          />

          <Route
            path="/admin/requests"
            element={
              <RequestsPage />
            }
          />

          <Route
            path="/admin/orders"
            element={
              <OrdersPage />
            }
          />

          <Route
            path="/admin/inventory"
            element={
              <InventoryPage />
            }
          />

        </Route>

      </Route>

      {/* ================================================= */}
      {/* ============= STOCK MANAGER ROUTES ============= */}
      {/* ================================================= */}

      <Route
        element={
          <ProtectedRoute
            allowedRoles={[
              "stock_manager",
            ]}
          />
        }
      >

        <Route
          element={<DashboardLayout />}
        >

          <Route
            path="/stock/dashboard"
            element={
              <StockManagerDashboard />
            }
          />

          <Route
            path="/stock/inventory"
            element={
              <InventoryPage />
            }
          />

        </Route>

      </Route>

      {/* ================================================= */}
      {/* ================= CUSTOMER ROUTES =============== */}
      {/* ================================================= */}

      <Route
  element={
    <ProtectedRoute
      allowedRoles={[
        "customer",
      ]}
    />
  }
>

  <Route
    path="/customer"
    element={<CustomerLayout />}
  >

    <Route
      path="dashboard"
      element={
        <CustomerDashboard />
      }
    />

    <Route
      path="requests"
      element={
        <CustomerRequestsPage />
      }
    />

    <Route
      path="orders"
      element={
        <CustomerOrdersPage />
      }
    />

  </Route>

</Route>

    </Routes>
  );
}