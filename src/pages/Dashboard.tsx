import { useEffect, useState } from "react";
import { getUser } from "../services/api";
import {
  Container,
  Text,
  Loader,
  Group,
  Grid,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/");

    getUser(token)
      .then(setUser)
      .catch(() => navigate("/"))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <Container className="py-24 flex justify-center">
        <Loader />
      </Container>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1C2D] via-[#0F2438] to-[#111827] py-16 text-white">
      <Container size="lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-bold text-white">
  Welcome, {user?.name}
</h1>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
            className="text-sm text-gray-400 hover:text-white transition"
          >
            Logout
          </button>
        </div>

        {/* Cards */}
        <Grid>
          {[
            {
              title: "Orders",
              desc: "Track your active and past orders",
            },
            {
              title: "Profile",
              desc: user?.email,
            },
            {
              title: "Requests",
              desc: "Manage your project requests",
            },
          ].map((item, i) => (
            <Grid.Col span={12} md={4} key={i}>
              <div className="p-6 rounded-xl 
                bg-white/5 backdrop-blur-md 
                border border-white/10 
                hover:bg-white/10 hover:shadow-lg 
                transition">
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{item.desc}</p>
              </div>
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </div>
  );
}