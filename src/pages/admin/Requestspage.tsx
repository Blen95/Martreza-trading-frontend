import { useEffect, useState } from "react";

import {
  Loader,
  Tabs,
  Badge,
  Modal,
  Button,
  Radio,
  Group,
  TextInput,
  ScrollArea,
  Notification,
} from "@mantine/core";

import {
  fetchQuoteRequests,
  updateQuote,
  getUser,
} from "../../services/api";

import type {
  QuoteRequest,
  Status,
  QuoteRequestItem,
} from "../../services/api";

import {
  Phone,
 Mail,
  Pencil,
  Image as ImageIcon,
} from "lucide-react";

import PlaceOrderModal from "../../components/orders/PlaceOrderModal";

export default function RequestsPage() {
  const [requests, setRequests] =
    useState<QuoteRequest[]>([]);

  const [filtered, setFiltered] =
    useState<QuoteRequest[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [activeTab, setActiveTab] =
    useState<string>("all");

  const [opened, setOpened] =
    useState(false);

  const [selected, setSelected] =
    useState<QuoteRequest | null>(
      null
    );

  const [role, setRole] =
    useState("");

  const [error, setError] =
    useState("");

  // ================= ORDER MODAL ================= //

  const [
    orderModalOpened,
    setOrderModalOpened,
  ] = useState(false);

  const [
    selectedOrderRequest,
    setSelectedOrderRequest,
  ] = useState<QuoteRequest | null>(
    null
  );

  // ================= UPDATE FORM ================= //

  const [form, setForm] = useState({
    status: "pending" as Status,

    quoted_price: "",

    initial_payment: "",

    estimated_arrival: "",
  });

  // ================= FETCH ================= //

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          requestsData,
          userData,
        ] = await Promise.all([
          fetchQuoteRequests(),
          getUser(),
        ]);

        setRequests(requestsData);

        setRole(userData.role);
      } catch (err) {
        console.error(err);

        setError(
          "Failed to load requests"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const interval = setInterval(
      fetchData,
      5000
    );

    return () =>
      clearInterval(interval);
  }, []);

  // ================= FILTER ================= //

  useEffect(() => {
    if (activeTab === "all") {
      setFiltered(requests);
    } else {
      setFiltered(
        requests.filter(
          (r) =>
            r.status === activeTab
        )
      );
    }
  }, [activeTab, requests]);

  // ================= HELPERS ================= //

  const getStatusColor = (
    status: Status
  ) => {
    switch (status) {
      case "pending":
        return "yellow";

      case "contacted":
        return "blue";

      case "quoted":
        return "green";

      case "closed":
        return "gray";

      default:
        return "dark";
    }
  };

  const formatDate = (
    date?: string | null
  ) => {
    if (!date) return "—";

    return new Date(
      date
    ).toLocaleString();
  };

  // ================= UPDATE MODAL ================= //

  const openModal = (
    req: QuoteRequest
  ) => {
    setSelected(req);

    setForm({
      status: req.status,

      quoted_price:
        req.quoted_price?.toString() ||
        "",

      initial_payment:
        req.initial_payment?.toString() ||
        "",

      estimated_arrival:
        req.estimated_arrival || "",
    });

    setOpened(true);
  };

  // ================= PLACE ORDER ================= //

  const openOrderModal = (
    req: QuoteRequest
  ) => {
    setSelectedOrderRequest(req);

    setOrderModalOpened(true);
  };

  // ================= SAVE ================= //

  const handleSave = async () => {
    if (!selected) return;

    try {
      const updated =
        await updateQuote(
          selected.id,
          {
            status: form.status,

            quoted_price:
              form.quoted_price
                ? Number(
                    form.quoted_price
                  )
                : undefined,

            initial_payment:
              form.initial_payment
                ? Number(
                    form.initial_payment
                  )
                : undefined,

            estimated_arrival:
              form.estimated_arrival,
          }
        );

      setRequests((prev) =>
        prev.map((r) =>
          r.id === updated.id
            ? updated
            : r
        )
      );

      setOpened(false);
    } catch (err) {
      console.error(err);

      setError(
        "Failed to update quote"
      );
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

  // ================= UI ================= //

  return (
    <div className="px-8 py-6 text-white">
      {/* HEADER */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Quote Requests
        </h1>

        <p className="text-gray-400 mt-1">
          Manage customer requests
          and quotations
        </p>
      </div>

      {/* ERROR */}

      {error && (
        <Notification
          color="red"
          mb="lg"
          onClose={() =>
            setError("")
          }
        >
          {error}
        </Notification>
      )}

      {/* TABS */}

      <Tabs
        value={activeTab}
        onChange={(v) =>
          setActiveTab(v || "all")
        }
        variant="pills"
      >
        <Tabs.List>
          <Tabs.Tab value="all">
            All
          </Tabs.Tab>

          <Tabs.Tab value="pending">
            Pending
          </Tabs.Tab>

          <Tabs.Tab value="contacted">
            Contacted
          </Tabs.Tab>

          <Tabs.Tab value="quoted">
            Quoted
          </Tabs.Tab>

          <Tabs.Tab value="closed">
            Closed
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>

      {/* REQUESTS */}

      <div className="mt-6 grid gap-6">
        {filtered.length === 0 ? (
          <div className="text-gray-400">
            No requests found.
          </div>
        ) : (
          filtered.map((req) => (
            <div
              key={req.id}
              className="rounded-3xl bg-white/5 border border-white/10 p-6 backdrop-blur-xl"
            >
              {/* TOP */}

              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold">
                    {req.name}
                  </h2>

                  <div className="flex gap-4 text-sm text-gray-400 mt-2 flex-wrap">
                    <span>
                      {req.phone}
                    </span>

                    {req.email && (
                      <span>
                        {req.email}
                      </span>
                    )}
                  </div>
                </div>

                <Badge
                  color={getStatusColor(
                    req.status
                  )}
                  size="lg"
                  variant="light"
                >
                  {req.status}
                </Badge>
              </div>

              {/* COMPANY */}

              {req.company && (
                <div className="mt-3 text-sm text-gray-300">
                  Company:{" "}
                  {req.company}
                </div>
              )}

              {/* ITEMS */}

              <div className="mt-6 grid md:grid-cols-2 gap-5">
                {req.items?.map(
                  (
                    item: QuoteRequestItem,
                    index
                  ) => (
                    <div
                      key={index}
                      className="rounded-2xl border border-white/10 bg-black/20 overflow-hidden"
                    >
                      {/* IMAGES */}

                      <div className="grid grid-cols-2 gap-1 bg-black/30">
                        {/* FIRST IMAGE */}

                        <div className="h-56">
                          {item.design_url ? (
                            <img
                              src={
                                item.design_url
                              }
                              alt={
                                item.category
                              }
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="h-full flex items-center justify-center text-gray-500">
                              <ImageIcon />
                            </div>
                          )}
                        </div>

                        {/* SECOND IMAGE */}

                        <div className="h-56">
                          {item.design2_url ? (
                            <img
                              src={
                                item.design2_url
                              }
                              alt={`${item.category} second`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="h-full flex items-center justify-center text-gray-500">
                              <ImageIcon />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* CONTENT */}

                      <div className="p-5 space-y-2">
                        <h3 className="font-semibold text-lg">
                          {
                            item.category
                          }
                        </h3>

                        {item.brand && (
                          <p className="text-sm text-gray-300">
                            Brand:{" "}
                            {
                              item.brand
                            }
                          </p>
                        )}

                        {item.size && (
                          <p className="text-sm text-gray-300">
                            Size:{" "}
                            {item.size}
                          </p>
                        )}

                        <p className="text-sm text-gray-300">
                          Quantity:{" "}
                          {
                            item.quantity
                          }{" "}
                          {item.unit}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>

              {/* QUOTE DETAILS */}

              {req.status ===
                "quoted" && (
                <div className="mt-6 rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
                  <h3 className="font-semibold mb-4 text-lg">
                    Quote Details
                  </h3>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">
                        Quoted Price
                      </span>

                      <span className="font-semibold">
                        ETB{" "}
                        {
                          req.quoted_price
                        }
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400">
                        Initial Payment
                      </span>

                      <span className="font-semibold">
                        ETB{" "}
                        {
                          req.initial_payment
                        }
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400">
                        Estimated Arrival
                      </span>

                      <span className="font-semibold">
                        {
                          req.estimated_arrival
                        }
                      </span>
                    </div>

                    <div className="pt-3 border-t border-white/10 text-xs text-gray-400">
                      Quoted At:{" "}
                      {formatDate(
                        req.quoted_at
                      )}
                    </div>

                    {/* PLACE ORDER BUTTON */}

                   {!req.order ? (
  <Button
    mt="lg"
    fullWidth
    color="green"
    size="md"
    onClick={() =>
      openOrderModal(req)
    }
  >
    Place Order
  </Button>
) : (
  <div className="mt-4 rounded-xl bg-blue-500/10 border border-blue-500/20 p-4 text-sm">
    <p className="font-semibold text-blue-300">
      Order Already Placed
    </p>

    <p className="text-gray-400 mt-1">
      This quote request already has an
      order attached.
    </p>
  </div>
)}
                  </div>
                </div>
              )}

              {/* FOOTER */}

              <div className="mt-6 flex justify-between items-center">
                <div className="text-xs text-gray-500 space-y-1">
                  <p>
                    Created:{" "}
                    {formatDate(
                      req.created_at
                    )}
                  </p>

                  <p>
                    Updated:{" "}
                    {formatDate(
                      req.status_updated_at
                    )}
                  </p>
                </div>

                {role === "admin" && (
                  <div className="flex gap-5 items-center">
                    <a
                      href={`tel:${req.phone}`}
                    >
                      <Phone
                        size={18}
                        className="text-green-400"
                      />
                    </a>

                    {req.email && (
                      <a
                        href={`mailto:${req.email}`}
                      >
                        <Mail
                          size={18}
                          className="text-blue-400"
                        />
                      </a>
                    )}

                    <button
                      onClick={() =>
                        openModal(req)
                      }
                    >
                      <Pencil
                        size={18}
                        className="text-yellow-400"
                      />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* UPDATE MODAL */}

      <Modal
        opened={opened}
        onClose={() =>
          setOpened(false)
        }
        centered
        size="lg"
        title="Update Quote"
      >
        <ScrollArea.Autosize mah={500}>
          <div className="space-y-4">
            <Radio.Group
              value={form.status}
              onChange={(value) =>
                setForm({
                  ...form,
                  status:
                    value as Status,
                })
              }
            >
              <Group>
                <Radio
                  value="pending"
                  label="Pending"
                />

                <Radio
                  value="contacted"
                  label="Contacted"
                />

                <Radio
                  value="quoted"
                  label="Quoted"
                />

                <Radio
                  value="closed"
                  label="Closed"
                />
              </Group>
            </Radio.Group>

            <TextInput
              label="Quoted Price"
              placeholder="Enter price"
              value={
                form.quoted_price
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  quoted_price:
                    e.target.value,
                })
              }
            />

            <TextInput
              label="Initial Payment"
              placeholder="Enter amount"
              value={
                form.initial_payment
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  initial_payment:
                    e.target.value,
                })
              }
            />

            <TextInput
              label="Estimated Arrival"
              placeholder="e.g 20-30 days"
              value={
                form.estimated_arrival
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  estimated_arrival:
                    e.target.value,
                })
              }
            />

            <Button
              fullWidth
              mt="md"
              onClick={handleSave}
            >
              Save Quote
            </Button>
          </div>
        </ScrollArea.Autosize>
      </Modal>

      {/* PLACE ORDER MODAL */}

      <PlaceOrderModal
        opened={orderModalOpened}
        onClose={() =>
          setOrderModalOpened(
            false
          )
        }
        request={
          selectedOrderRequest
        }
      />
    </div>
  );
}