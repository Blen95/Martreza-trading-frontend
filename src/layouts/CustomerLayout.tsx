import {
  AppShell,
  Burger,
} from "@mantine/core";

import {
  useDisclosure,
} from "@mantine/hooks";

import {
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";

import {
  Home,
  FileText,
  ShoppingBag,
  LogOut,
} from "lucide-react";

export default function CustomerLayout() {

  const navigate = useNavigate();

  const [
    opened,
    { toggle },
  ] = useDisclosure();

  // ================= USER ================= //

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  // ================= LOGOUT ================= //

  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/");
  };

  return (

    <AppShell
      header={{ height: 60 }}

      navbar={{
        width: 260,
        breakpoint: "md",

        collapsed: {
          mobile: !opened,
        },
      }}

      padding="md"
    >

      {/* ================= HEADER ================= */}

      <AppShell.Header className="bg-[#0F2438] border-b border-white/10 flex items-center px-4">

        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="md"
          size="sm"
          color="white"
        />

        <h1 className="text-white font-semibold ml-4">
          Customer Portal
        </h1>

      </AppShell.Header>

      {/* ================= SIDEBAR ================= */}

      <AppShell.Navbar className="bg-[#0F2438] border-r border-white/10 text-white flex flex-col">

        {/* PROFILE */}

        <div className="p-5 border-b border-white/10">

          <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-xl font-bold">

            {user?.name?.charAt(0)}

          </div>

          <h2 className="mt-3 font-semibold">
            {user?.name}
          </h2>

          <p className="text-sm text-gray-400">
            {user?.email}
          </p>

        </div>

        {/* NAVIGATION */}

        <div className="p-3 space-y-2">

          {/* DASHBOARD */}

          <NavLink
            to="/customer/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
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
            to="/customer/requests"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`
            }
          >

            <FileText size={18} />

            My Requests

          </NavLink>

          {/* ORDERS */}

          <NavLink
            to="/customer/orders"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`
            }
          >

            <ShoppingBag size={18} />

            My Orders

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

      {/* ================= MAIN ================= */}

      <AppShell.Main className="bg-gradient-to-br from-[#0B1C2D] via-[#0F2438] to-[#111827] min-h-screen text-white">

        <div className="w-full max-w-7xl mx-auto">

          <Outlet />

        </div>

      </AppShell.Main>

    </AppShell>
  );
}