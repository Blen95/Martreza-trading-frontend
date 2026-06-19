import { AppShell } from "@mantine/core";

import {
  NavLink,
  useNavigate,
  Outlet,
} from "react-router-dom";

import {
  Home,
  FileText,
  ShoppingBag,
  Package,
  LogOut,
  MessageSquare,
} from "lucide-react";

export function DashboardLayout() {

  const navigate = useNavigate();

  // ================= USER ================= //

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const role = user?.role;

  // ================= LOGOUT ================= //

  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/");
  };

  // ================= UI ================= //

  return (
    <AppShell
      navbar={{
        width: 260,
        breakpoint: "sm",
      }}
      padding="md"
    >

      {/* ================= SIDEBAR ================= */}

      <AppShell.Navbar className="bg-[#0F2438] border-r border-white/10">

        {/* HEADER */}

        <div className="p-4 text-white font-bold text-lg">

          {role === "admin"
            ? "Admin Panel"
            : role === "stock_manager"
            ? "Stock Manager"
            : "Dashboard"}

        </div>

        {/* ================= NAVIGATION ================= */}

        <div className="px-2 space-y-2">

          {/* ================= ADMIN LINKS ================= */}

          {role === "admin" && (
            <>

              {/* ADMIN DASHBOARD */}

              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                <Home size={18} />
                Dashboard
              </NavLink>

              {/* REQUESTS */}

              <NavLink
                to="/admin/requests"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                <FileText size={18} />
                Quote Requests
              </NavLink>
              

              {/* ORDERS */}

              <NavLink
                to="/admin/orders"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                <ShoppingBag size={18} />
                Orders
              </NavLink>
              <NavLink
  to="/admin/project-requests"
  className={({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
      isActive
        ? "bg-white/10 text-white"
        : "text-gray-400 hover:bg-white/5 hover:text-white"
    }`
  }
>
  <FileText size={18} />
  Requests
</NavLink>

<NavLink
  to="/admin/inquiries"
  className={({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
      isActive
        ? "bg-white/10 text-white"
        : "text-gray-400 hover:bg-white/5 hover:text-white"
    }`
  }
>
  <MessageSquare size={18} />
  Inquiries
</NavLink>
            </>
          )}

          {/* ================= STOCK MANAGER DASHBOARD ================= */}

          {role === "stock_manager" && (

            <NavLink
              to="/stock/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <Home size={18} />
              Dashboard
            </NavLink>

          )}

          {/* ================= INVENTORY ================= */}

          {(role === "admin" ||
  role === "stock_manager") && (

  <NavLink
    to={
      role === "admin"
        ? "/admin/inventory"
        : "/stock/inventory"
    }
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
        isActive
          ? "bg-white/10 text-white"
          : "text-gray-400 hover:bg-white/5 hover:text-white"
      }`
    }
  >

    <Package size={18} />

    Inventory

  </NavLink>

)}

        </div>

        {/* ================= LOGOUT ================= */}

        <div className="mt-auto p-4">

          <button
            onClick={logout}
            className="flex items-center gap-2 text-red-400 hover:text-red-300 transition"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </AppShell.Navbar>

      {/* ================= MAIN ================= */}

      <AppShell.Main className="bg-gradient-to-br from-[#0B1C2D] via-[#0F2438] to-[#111827] min-h-screen text-white">

        <Outlet />

      </AppShell.Main>

    </AppShell>
  );
}