import { AppShell } from "@mantine/core";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { Home, FileText, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchQuoteRequests } from "../services/api";
import type { QuoteRequest } from "../services/api";

export default function DashboardLayout() {
  const navigate = useNavigate();

  const [requests, setRequests] = useState<QuoteRequest[]>([]);
  const [pendingCount, setPendingCount] = useState(0);

  // ================= FETCH QUOTES ================= //

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchQuoteRequests();

        setRequests(data || []);

        // 🔥 compute pending safely
        const pending = (data || []).filter(
          (r) => r.status === "pending"
        ).length;

        setPendingCount(pending);
      } catch (error) {
        console.error("Failed to fetch quote requests:", error);

        // 🔥 safe fallback so UI never breaks
        setRequests([]);
        setPendingCount(0);
      }
    };

    fetchData();

    // 🔁 polling every 5 seconds
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  // ================= LOGOUT ================= //

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // ================= UI ================= //

  return (
    <AppShell
      navbar={{ width: 260, breakpoint: "sm" }}
      padding="md"
    >
      {/* ================= SIDEBAR ================= */}
      <AppShell.Navbar className="bg-[#0F2438] border-r border-white/10 text-white flex flex-col">

        {/* HEADER */}
        <div className="p-4 font-bold text-lg">
          Admin Panel
        </div>

        {/* NAV LINKS */}
        <div className="px-2 space-y-2">

          {/* DASHBOARD */}
          <NavLink
            to="/dashboard"
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
            to="/requests"
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

            {/* 🔥 LIVE BADGE */}
            {pendingCount > 0 && (
              <span className="ml-auto text-xs bg-yellow-500 text-black px-2 py-0.5 rounded-full font-semibold">
                {pendingCount}
              </span>
            )}
          </NavLink>
         {/* ORDERS */}
<NavLink
  to="/orders"
  className={({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
      isActive
        ? "bg-white/10 text-white"
        : "text-gray-400 hover:bg-white/5 hover:text-white"
    }`
  }
>
  <FileText size={18} />
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

      {/* ================= MAIN CONTENT ================= */}
      <AppShell.Main className="bg-gradient-to-br from-[#0B1C2D] via-[#0F2438] to-[#111827] min-h-screen text-white">
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}