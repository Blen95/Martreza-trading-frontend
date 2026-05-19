import { useEffect, useState } from "react";
import {
  Badge,
  Loader,
  Notification,
  Tabs,
  Button,
  Modal,
  Select,
} from "@mantine/core";

import {
  fetchOrders,
  updateOrderStatus,
  getUser,
} from "../../services/api";

import type { Order, OrderStatus, Receipt } from "../../services/api";
import { Image as ImageIcon } from "lucide-react";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filtered, setFiltered] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [role, setRole] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusModalOpened, setStatusModalOpened] = useState(false);
  const [status, setStatus] = useState<OrderStatus>("requested");

  // ✅ IMAGE MODAL
  const [imageOpened, setImageOpened] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openImage = (url: string) => {
    setSelectedImage(url);
    setImageOpened(true);
  };

  // ================= FETCH ================= //
  useEffect(() => {
    const load = async () => {
      try {
        const [ordersData, userData] = await Promise.all([
          fetchOrders(),
          getUser(),
        ]);

        setOrders(ordersData);
        setRole(userData.role);
      } catch (err) {
        console.error(err);
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // ================= FILTER ================= //
  useEffect(() => {
    if (activeTab === "all") {
      setFiltered(orders);
    } else {
      setFiltered(orders.filter((o) => o.status === activeTab));
    }
  }, [activeTab, orders]);

  // ================= HELPERS ================= //
  const getColor = (status: string) => {
    switch (status) {
      case "requested":
        return "yellow";
      case "reviewing":
        return "blue";
      case "paid":
        return "green";
      case "processing":
        return "violet";
      case "completed":
        return "teal";
      case "cancelled":
        return "red";
      default:
        return "gray";
    }
  };

  const formatDate = (date?: string) => {
    if (!date) return "—";
    return new Date(date).toLocaleString();
  };

  // ================= STATUS UPDATE ================= //
  const openStatusModal = (order: Order) => {
    setSelectedOrder(order);
    setStatus(order.status);
    setStatusModalOpened(true);
  };

  const handleUpdateStatus = async () => {
    if (!selectedOrder) return;

    try {
      const updated = await updateOrderStatus(selectedOrder.id, status);

      setOrders((prev) =>
  prev.map((o) =>
    o.id === updated.id
      ? { ...o, status: updated.status }
      : o
  )
);

      setStatusModalOpened(false);
    } catch (err) {
      console.error(err);
      setError("Failed to update order");
    }
  };

  // ================= LOADING ================= //
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="px-8 py-6 text-white">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Orders</h1>
        <p className="text-gray-400 mt-1">
          Manage customer orders and receipts
        </p>
      </div>

      {/* ERROR */}
      {error && (
        <Notification color="red" mb="lg" onClose={() => setError("")}>
          {error}
        </Notification>
      )}

      {/* FILTERS */}
      <Tabs value={activeTab} onChange={(v) => setActiveTab(v || "all")}>
        <Tabs.List>
          <Tabs.Tab value="all">All</Tabs.Tab>
          <Tabs.Tab value="requested">Requested</Tabs.Tab>
          <Tabs.Tab value="reviewing">Reviewing</Tabs.Tab>
          <Tabs.Tab value="paid">Paid</Tabs.Tab>
          <Tabs.Tab value="processing">Processing</Tabs.Tab>
          <Tabs.Tab value="completed">Completed</Tabs.Tab>
          <Tabs.Tab value="cancelled">Cancelled</Tabs.Tab>
        </Tabs.List>
      </Tabs>

      {/* ORDERS */}
      <div className="mt-6 grid gap-6">
        {filtered.map((order) => (
          <div
            key={order.id}
            className="rounded-3xl bg-white/5 border border-white/10 p-6"
          >
            {/* TOP */}
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">
                  Order #{order.id}
                </h2>
                <p className="text-gray-400 mt-2">
                  {order.quote_request?.phone}
                </p>
              </div>

              <Badge color={getColor(order.status)} size="lg" variant="light">
                {order.status}
              </Badge>
            </div>

            {/* QUOTE DETAILS */}
            {order.quote_request && (
              <div className="mt-6 rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
                <h3 className="font-semibold mb-4">Quote Details</h3>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Quoted Price</span>
                    <span>ETB {order.quote_request.quoted_price}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Initial Payment</span>
                    <span>ETB {order.quote_request.initial_payment}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Estimated Arrival</span>
                    <span>{order.quote_request.estimated_arrival}</span>
                  </div>
                </div>
              </div>
            )}

            {/* RECEIPTS */}
            <div className="mt-6">
              <h3 className="font-semibold mb-4">Uploaded Receipts</h3>

              {order.receipts && order.receipts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {order.receipts.map((receipt: Receipt) => (
                    <img
                      key={receipt.id}
                      src={receipt.url}
                      onClick={() => receipt.url && openImage(receipt.url)}
                      className="w-full h-40 object-cover rounded-xl border border-white/10 shadow-md cursor-pointer hover:opacity-80 transition"
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-white/10 h-52 flex items-center justify-center text-gray-500">
                  <ImageIcon />
                </div>
              )}
            </div>

            {/* FOOTER */}
            <div className="mt-6 flex justify-between items-center">
              <div className="text-xs text-gray-500">
                Created: {formatDate(order.created_at)}
              </div>

              {role === "admin" && (
                <Button onClick={() => openStatusModal(order)}>
                  Update Status
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* STATUS MODAL */}
      <Modal
        opened={statusModalOpened}
        onClose={() => setStatusModalOpened(false)}
        centered
        title="Update Order Status"
      >
        <div className="space-y-4">
          <Select
            value={status}
            onChange={(v) => setStatus((v as OrderStatus) || "requested")}
            data={[
              "requested",
              "reviewing",
              "paid",
              "processing",
              "completed",
              "cancelled",
            ]}
          />

          <Button fullWidth onClick={handleUpdateStatus}>
            Save Status
          </Button>
        </div>
      </Modal>

      {/* IMAGE MODAL */}
      <Modal
        opened={imageOpened}
        onClose={() => setImageOpened(false)}
        centered
        size="xl"
        overlayProps={{ blur: 4 }}
      >
        {selectedImage && (
          <img
            src={selectedImage}
            className="w-full max-h-[80vh] object-contain rounded-lg"
          />
        )}
      </Modal>
    </div>
  );
}