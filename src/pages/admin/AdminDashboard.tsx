import { useEffect, useMemo, useState } from "react";

import {
  Card,
  Text,
  SimpleGrid,
  Loader,
} from "@mantine/core";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import {
  fetchQuoteRequests,
  fetchOrders,
} from "../../services/api";

import type {
  QuoteRequest,
  Order,
} from "../../services/api";

export default function AdminDashboard() {
  const [requests, setRequests] = useState<
    QuoteRequest[]
  >([]);

  const [orders, setOrders] = useState<
    Order[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [
          requestsData,
          ordersData,
        ] = await Promise.all([
          fetchQuoteRequests(),
          fetchOrders(),
        ]);

        setRequests(requestsData);

        setOrders(ordersData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // ================= REQUEST STATUS ================= //

  const requestStatusData =
    useMemo(() => {
      const counts = {
        pending: 0,
        contacted: 0,
        quoted: 0,
        closed: 0,
      };

      requests.forEach((r) => {
        counts[r.status]++;
      });

      return Object.entries(counts).map(
        ([name, value]) => ({
          name,
          value,
        })
      );
    }, [requests]);

  // ================= ORDER STATUS ================= //

  const orderStatusData =
    useMemo(() => {
      const counts = {
        requested: 0,
        reviewing: 0,
        awaiting_payment: 0,
        paid: 0,
        processing: 0,
        completed: 0,
        cancelled: 0,
      };

      orders.forEach((o) => {
        counts[o.status]++;
      });

      return Object.entries(counts).map(
        ([name, value]) => ({
          name,
          value,
        })
      );
    }, [orders]);

  // ================= REVENUE ================= //

  const totalRevenue =
    requests.reduce((sum, r) => {
      return (
        sum + (r.quoted_price || 0)
      );
    }, 0);

  // ================= COLORS ================= //

  const COLORS = [
    "#3b82f6",
    "#22c55e",
    "#eab308",
    "#ef4444",
    "#8b5cf6",
    "#14b8a6",
    "#f97316",
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-8 text-white">
      {/* HEADER */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Admin Dashboard
        </h1>

        <p className="text-gray-400">
          Business overview and analytics
        </p>
      </div>

      {/* STATS */}

      <SimpleGrid
        cols={{ base: 1, md: 2, lg: 4 }}
        mb="xl"
      >
        <Card
          padding="lg"
          radius="xl"
          className="bg-white/5 border border-white/10"
        >
          <Text size="sm" c="dimmed">
            Total Requests
          </Text>

          <Text
            size="2rem"
            fw={700}
          >
            {requests.length}
          </Text>
        </Card>

        <Card
          padding="lg"
          radius="xl"
          className="bg-white/5 border border-white/10"
        >
          <Text size="sm" c="dimmed">
            Total Orders
          </Text>

          <Text
            size="2rem"
            fw={700}
          >
            {orders.length}
          </Text>
        </Card>

        <Card
          padding="lg"
          radius="xl"
          className="bg-white/5 border border-white/10"
        >
          <Text size="sm" c="dimmed">
            Quoted Requests
          </Text>

          <Text
            size="2rem"
            fw={700}
          >
            {
              requests.filter(
                (r) =>
                  r.status === "quoted"
              ).length
            }
          </Text>
        </Card>

        <Card
          padding="lg"
          radius="xl"
          className="bg-white/5 border border-white/10"
        >
          <Text size="sm" c="dimmed">
            Revenue
          </Text>

          <Text
            size="2rem"
            fw={700}
          >
            ETB{" "}
            {totalRevenue.toLocaleString()}
          </Text>
        </Card>
      </SimpleGrid>

      {/* CHARTS */}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* REQUEST PIE */}

        <Card
          radius="xl"
          padding="lg"
          className="bg-white/5 border border-white/10"
        >
          <h2 className="text-xl font-semibold mb-6">
            Request Status
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <PieChart>
              <Pie
                data={
                  requestStatusData
                }
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {requestStatusData.map(
                  (
                    _,
                    index
                  ) => (
                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index %
                            COLORS.length
                        ]
                      }
                    />
                  )
                )}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* ORDER BAR */}

        <Card
          radius="xl"
          padding="lg"
          className="bg-white/5 border border-white/10"
        >
          <h2 className="text-xl font-semibold mb-6">
            Order Status
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <BarChart
              data={orderStatusData}
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="value">
                {orderStatusData.map(
                  (
                    _,
                    index
                  ) => (
                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index %
                            COLORS.length
                        ]
                      }
                    />
                  )
                )}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}