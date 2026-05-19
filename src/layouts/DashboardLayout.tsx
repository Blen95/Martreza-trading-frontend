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
  LogOut,
} from "lucide-react";

export function DashboardLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <AppShell
      navbar={{
        width: 260,
        breakpoint: "sm",
      }}
      padding="md"
    >
      {/* SIDEBAR */}

      <AppShell.Navbar className="bg-[#0F2438] border-r border-white/10">
        <div className="p-4 text-white font-bold text-lg">
          Admin Panel
        </div>

        {/* NAVIGATION */}

        <div className="px-2 space-y-2">

          {/* DASHBOARD */}

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-gray-400 hover:bg-white/5"
              }`
            }
          >
            <Home size={18} />
            Dashboard
          </NavLink>

          {/* REQUESTS */}

          <NavLink
            to="/requests"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-gray-400 hover:bg-white/5"
              }`
            }
          >
            <FileText size={18} />
            Requests
          </NavLink>

          {/* ORDERS */}

          <NavLink
            to="/orders"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-gray-400 hover:bg-white/5"
              }`
            }
          >
            <ShoppingBag size={18} />
            Orders
          </NavLink>
        </div>

        {/* LOGOUT */}

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

      {/* MAIN */}

      <AppShell.Main className="bg-gradient-to-br from-[#0B1C2D] via-[#0F2438] to-[#111827] min-h-screen text-white">
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}