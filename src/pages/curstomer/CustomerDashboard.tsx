import { useEffect, useState } from "react";

import {
  fetchQuoteRequests,
  fetchOrders
} from "../../services/api";
import type { QuoteRequest,Order } from "../../services/api";
import {
  Loader,
} from "@mantine/core";

export default function CustomerDashboard() {

  const [requests, setRequests] =
    useState<QuoteRequest[]>([]);

  const [orders, setOrders] =
    useState<Order[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchData = async () => {

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

    fetchData();

  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader />
      </div>
    );
  }

  const quoted =
    requests.filter(
      (r) => r.status === "quoted"
    ).length;

  return (
    <div className="px-8 py-6">

      {/* HEADER */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-400 mt-1">
          Track your requests and orders
        </p>

      </div>

      {/* STATS */}

      <div className="grid md:grid-cols-4 gap-5">

        <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
          <p className="text-gray-400 text-sm">
            Total Requests
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {requests.length}
          </h2>
        </div>

        <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
          <p className="text-gray-400 text-sm">
            Active Quotes
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {quoted}
          </h2>
        </div>

        <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
          <p className="text-gray-400 text-sm">
            Orders
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {orders.length}
          </h2>
        </div>

        <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
          <p className="text-gray-400 text-sm">
            Completed Orders
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {
              orders.filter(
                (o) =>
                  o.status === "completed"
              ).length
            }
          </h2>
        </div>

      </div>

      {/* RECENT REQUESTS */}

      <div className="mt-10">

        <h2 className="text-xl font-semibold mb-5">
          Recent Requests
        </h2>

        <div className="grid gap-5">

          {requests.slice(0, 3).map((req) => (

            <div
              key={req.id}
              className="rounded-3xl bg-white/5 border border-white/10 p-5"
            >

              <div className="flex justify-between">

                <div>

                  <h3 className="font-semibold text-lg">
                    {req.items?.[0]?.category}
                  </h3>

                  <p className="text-sm text-gray-400 mt-1">
                    Status: {req.status}
                  </p>

                </div>

                {req.quoted_price && (

                  <div className="text-right">

                    <p className="text-sm text-gray-400">
                      Quote
                    </p>

                    <p className="font-semibold">
                      ETB {req.quoted_price}
                    </p>

                  </div>

                )}

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}