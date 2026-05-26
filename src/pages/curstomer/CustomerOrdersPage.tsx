import { useEffect, useState } from "react";

import {
  fetchOrders
} from "../../services/api";
import type { Order } from "../../services/api";
import {
  Loader,
} from "@mantine/core";

import OrderCard from "../../components/customer/OrderCard";

export default function CustomerOrdersPage() {

  const [orders, setOrders] =
    useState<Order[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchData = async () => {

      try {

        const data =
          await fetchOrders();

        setOrders(data);

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

  return (
    <div className="px-8 py-6">

      {/* HEADER */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          My Orders
        </h1>

        <p className="text-gray-400 mt-1">
          Track your placed orders
        </p>

      </div>

      {/* ORDERS */}

      {orders.length === 0 ? (

        <div className="rounded-3xl bg-white/5 border border-white/10 p-8 text-center text-gray-400">
          No orders found.
        </div>

      ) : (

        <div className="grid gap-6">

          {orders.map((order) => (

            <OrderCard
              key={order.id}
              order={order}
            />

          ))}

        </div>

      )}

    </div>
  );
}