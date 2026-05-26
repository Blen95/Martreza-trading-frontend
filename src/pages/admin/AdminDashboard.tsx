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

  const [requests, setRequests] =
    useState<QuoteRequest[]>([]);

  const [orders, setOrders] =
    useState<Order[]>([]);

  const [loading, setLoading] =
    useState(true);

  // ================= FETCH ================= //

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
const revenueStatuses = [
  "paid",
  "processing",
  "completed",
];

const totalRevenue =
  orders.reduce((sum, order) => {

    if (
      !revenueStatuses.includes(
        order.status
      )
    ) {
      return sum;
    }

    const quotedPrice = Number(
      order.quote_request
        ?.quoted_price || 0
    );

    return sum + quotedPrice;

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

  // ================= TOOLTIP ================= //

  const tooltipStyle = {
    backgroundColor: "#0F2438",
    border:
      "1px solid rgba(255,255,255,0.1)",
    borderRadius: "12px",
    color: "white",
  };

  // ================= LOADING ================= //

  if (loading) {

    return (

      <div className="flex justify-center items-center h-[60vh]">
        <Loader />
      </div>

    );
  }

  // ================= UI ================= //

  return (

    <div className="p-4 md:p-8 text-white">

      {/* ================= HEADER ================= */}

      <div className="mb-8">

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">

          Admin Dashboard

        </h1>

        <p className="text-gray-300 mt-2">

          Business overview and analytics

        </p>

        <div className="mt-6 h-px bg-white/10" />

      </div>

      {/* ================= STATS ================= */}

      <SimpleGrid
        cols={{
          base: 1,
          sm: 2,
          lg: 4,
        }}
        spacing="lg"
        mb="xl"
      >

        {/* TOTAL REQUESTS */}

        <Card
          padding="lg"
          radius="xl"
          className="bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl"
        >

          <Text
            size="sm"
            className="text-gray-300"
          >
            Total Requests
          </Text>

          <Text
            size="2.2rem"
            fw={800}
            className="text-white"
          >
            {requests.length}
          </Text>

        </Card>

        {/* TOTAL ORDERS */}

        <Card
          padding="lg"
          radius="xl"
          className="bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl"
        >

          <Text
            size="sm"
            className="text-gray-300"
          >
            Total Orders
          </Text>

          <Text
            size="2.2rem"
            fw={800}
            className="text-white"
          >
            {orders.length}
          </Text>

        </Card>

        {/* QUOTED REQUESTS */}

        <Card
          padding="lg"
          radius="xl"
          className="bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl"
        >

          <Text
            size="sm"
            className="text-gray-300"
          >
            Quoted Requests
          </Text>

          <Text
            size="2.2rem"
            fw={800}
            className="text-white"
          >
            {
              requests.filter(
                (r) =>
                  r.status === "quoted"
              ).length
            }
          </Text>

        </Card>

        {/* REVENUE */}

        <Card
          padding="lg"
          radius="xl"
          className="bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl"
        >

          <Text
  size="sm"
  className="text-gray-300"
>
  Revenue
</Text>

<Text
  fw={800}
  className="text-white text-2xl md:text-3xl break-words"
>

  ETB{" "}
  {Intl.NumberFormat(
    "en",
    {
      notation: "compact",
      maximumFractionDigits: 1,
    }
  ).format(
    Number(totalRevenue || 0)
  )}

</Text>

        </Card>

      </SimpleGrid>

      {/* ================= CHARTS ================= */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ================= REQUEST STATUS ================= */}

        <Card
          radius="xl"
          padding="lg"
          className="bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl"
        >

          <h2 className="text-xl md:text-2xl font-semibold mb-6 text-white">

            Request Status

          </h2>

          <ResponsiveContainer
            width="100%"
            height={320}
          >

            <PieChart>

              <Pie
                data={requestStatusData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label={{
                  fill: "#ffffff",
                  fontSize: 13,
                }}
              >

                {requestStatusData.map(
                  (_, index) => (

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

              <Tooltip
                contentStyle={
                  tooltipStyle
                }
              />

            </PieChart>

          </ResponsiveContainer>

        </Card>

        {/* ================= ORDER STATUS ================= */}

        <Card
          radius="xl"
          padding="lg"
          className="bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl"
        >

          <h2 className="text-xl md:text-2xl font-semibold mb-6 text-white">

            Order Status

          </h2>

          <ResponsiveContainer
            width="100%"
            height={320}
          >

            <BarChart
              data={orderStatusData}
            >

              <CartesianGrid
                stroke="rgba(255,255,255,0.08)"
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="name"
                tick={{
                  fill: "#d1d5db",
                  fontSize: 12,
                }}
              />

              <YAxis
                tick={{
                  fill: "#d1d5db",
                  fontSize: 12,
                }}
              />

              <Tooltip
                contentStyle={
                  tooltipStyle
                }
              />

              <Bar dataKey="value">

                {orderStatusData.map(
                  (_, index) => (

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