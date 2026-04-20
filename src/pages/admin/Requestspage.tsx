import { useEffect, useState } from "react";
import {
  Loader,
  Tabs,
  Badge,
  Modal,
  Button,
  Radio,
  Group,
} from "@mantine/core";
import {
  fetchQuoteRequests,
  updateQuoteStatus,
 
} from "../../services/api";
import type { QuoteRequest,Status } from "../../services/api";
import { Phone, Mail, Pencil } from "lucide-react";

export default function RequestsPage() {
  const [requests, setRequests] = useState<QuoteRequest[]>([]);
  const [filtered, setFiltered] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<string>("all");

  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState<QuoteRequest | null>(null);
  const [status, setStatus] = useState<Status>("pending");

  // 🔁 Fetch + auto refresh
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchQuoteRequests();
        setRequests(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  // 🔍 Filter
  useEffect(() => {
    if (activeTab === "all") {
      setFiltered(requests);
    } else {
      setFiltered(
        requests.filter((r) => r.status === activeTab)
      );
    }
  }, [activeTab, requests]);

  const getStatusColor = (status: Status) => {
    switch (status) {
      case "pending": return "yellow";
      case "contacted": return "blue";
      case "quoted": return "green";
      case "closed": return "gray";
      default: return "dark";
    }
  };

  const handleUpdateStatus = async () => {
    if (!selected) return;

    const updated = await updateQuoteStatus(
      selected.id,
      status
    );

    setRequests((prev) =>
      prev.map((r) =>
        r.id === updated.id ? updated : r
      )
    );

    setOpened(false);
  };

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
        <h1 className="text-2xl font-bold">
          Quote Requests
        </h1>
        <p className="text-gray-400 text-sm">
          Manage and respond to customer requests
        </p>
      </div>

      {/* TABS */}
      <Tabs
        value={activeTab}
        onChange={(v) => setActiveTab(v || "all")}
        variant="pills"
      >
        <Tabs.List>
          <Tabs.Tab value="all">All</Tabs.Tab>
          <Tabs.Tab value="pending">Pending</Tabs.Tab>
          <Tabs.Tab value="contacted">Contacted</Tabs.Tab>
          <Tabs.Tab value="quoted">Quoted</Tabs.Tab>
          <Tabs.Tab value="closed">Closed</Tabs.Tab>
        </Tabs.List>
      </Tabs>

      {/* LIST */}
      <div className="mt-6 grid gap-4">

        {filtered.length === 0 ? (
          <p className="text-gray-400">
            No requests found.
          </p>
        ) : (
          filtered.map((req) => (
            <div
              key={req.id}
              className="
                p-6 rounded-2xl 
                bg-white/5 backdrop-blur-md 
                border border-white/10 
                hover:bg-white/10 hover:shadow-xl 
                transition
              "
            >

              {/* TOP */}
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">
                  {req.item_name}
                </h3>

                <Badge
                  color={getStatusColor(req.status)}
                  variant="light"
                >
                  {req.status}
                </Badge>
              </div>

              {/* DETAILS */}
              <p className="text-sm text-gray-300 mt-2">
                {req.quantity} {req.unit}
              </p>

              <p className="text-sm text-gray-400 mt-1">
                {req.message || "No message provided"}
              </p>

              {/* CONTACT */}
              <div className="mt-4 text-sm text-gray-300 flex flex-wrap gap-4">
                <span>{req.name}</span>
                <span>{req.phone}</span>
                {req.email && <span>{req.email}</span>}
              </div>

              {/* ACTIONS */}
              <div className="flex gap-5 mt-5 items-center">

                <a href={`tel:${req.phone}`}>
                  <Phone className="text-green-400 hover:scale-110 transition" size={18} />
                </a>

                {req.email && (
                  <a href={`mailto:${req.email}`}>
                    <Mail className="text-blue-400 hover:scale-110 transition" size={18} />
                  </a>
                )}

                <button
                  onClick={() => {
                    setSelected(req);
                    setStatus(req.status);
                    setOpened(true);
                  }}
                >
                  <Pencil className="text-yellow-400 hover:scale-110 transition" size={18} />
                </button>

              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Update Status"
        centered
      >
        <Radio.Group
          value={status}
          onChange={(value) =>
            setStatus(value as Status)
          }
        >
          <Group mt="md">
            <Radio value="pending" label="Pending" />
            <Radio value="contacted" label="Contacted" />
            <Radio value="quoted" label="Quoted" />
            <Radio value="closed" label="Closed" />
          </Group>
        </Radio.Group>

        <Button fullWidth mt="lg" onClick={handleUpdateStatus}>
          Save Changes
        </Button>
      </Modal>

    </div>
  );
}