import {
  Modal,
  TextInput,
  NumberInput,
  Textarea,
  Button,
  Stack,
  Group,
  Select,
} from "@mantine/core";
import { useState, useEffect } from "react";
import { submitQuoteRequest } from "../services/api";
import RegisterPromptModal from "./Authentication/RegisterPromptModal";

interface Props {
  opened: boolean;
  onClose: () => void;
  productId?: number | null;
  itemName?: string;
  onOpenSignup?: () => void; // ✅ NEW
}

export default function QuoteRequestModal({
  opened,
  onClose,
  productId = null,
  itemName = "",
  onOpenSignup,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showRegisterPrompt, setShowRegisterPrompt] = useState(false);

  const initialForm = {
    name: "",
    phone: "",
    email: "",
    company: "",
    item_name: itemName || "",
    unit: "",
    quantity: 1,
    message: "",
  };

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (opened) {
      setForm((prev) => ({
        ...prev,
        item_name: itemName || "",
      }));
    }
  }, [opened, itemName]);

  useEffect(() => {
    if (!opened) {
      setSuccess(false);
      setForm(initialForm);
    }
  }, [opened]);

  const itemOptions = [
    { value: "Ceramic & Porcelain Tiles", label: "Ceramic & Porcelain Tiles" },
    { value: "Sanitary Ware", label: "Sanitary Ware" },
    { value: "Lighting & Fixtures", label: "Lighting & Fixtures" },
    { value: "Paint & Surface Finishes", label: "Paint & Surface Finishes" },
  ];

  const unitOptions = [
    { value: "pcs", label: "pcs" },
    { value: "m²", label: "m²" },
    { value: "kg", label: "kg" },
  ];

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.item_name || !form.unit) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        name: form.name,
        phone: form.phone,
        email: form.email || null,
        company: form.company || null,
        product_id: productId,
        item_name: form.item_name,
        unit: form.unit,
        quantity: form.quantity,
        message: form.message || null,
      };

      await submitQuoteRequest(payload);

      setSuccess(true);

      // 🎯 show register prompt after short delay
      setTimeout(() => {
        setShowRegisterPrompt(true);
      }, 1500);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        centered
        size="lg"
        overlayProps={{ backgroundOpacity: 0.6, blur: 8 }}
        classNames={{
          content:
            "bg-gradient-to-br from-[#0B1C2D]/90 via-[#0F2438]/90 to-[#111827]/90 backdrop-blur-xl border border-white/10 rounded-xl text-white",
          body: "p-6",
        }}
      >
        {success ? (
          <Stack align="center" py="xl">
            <div className="text-green-400 text-3xl">✔</div>

            <div className="text-lg font-semibold text-center">
              Quote Request Submitted!
            </div>

            <div className="text-gray-300 text-center">
              Our team will contact you shortly.
            </div>

            <Button
              mt="md"
              onClick={() => {
                setSuccess(false);
                
              }}
            >
              Continue
            </Button>
          </Stack>
        ) : (
          <Stack>
            <Select
              label="Item Name"
              required
              data={itemOptions}
              value={form.item_name}
              onChange={(value) =>
                setForm((prev) => ({ ...prev, item_name: value || "" }))
              }
            />

            <TextInput
              label="Full Name"
              required
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.currentTarget.value })
              }
            />

            <TextInput
              label="Phone Number"
              required
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.currentTarget.value })
              }
            />

            <TextInput
              label="Email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.currentTarget.value })
              }
            />

            <TextInput
              label="Company"
              value={form.company}
              onChange={(e) =>
                setForm({ ...form, company: e.currentTarget.value })
              }
            />

            <NumberInput
              label="Quantity"
              required
              min={1}
              value={form.quantity}
              onChange={(value) =>
                setForm({
                  ...form,
                  quantity:
                    typeof value === "number" && !isNaN(value) ? value : 1,
                })
              }
            />

            <Select
              label="Unit"
              required
              data={unitOptions}
              value={form.unit}
              onChange={(value) =>
                setForm({ ...form, unit: value || "" })
              }
            />

            <Textarea
              label="Additional Details"
              minRows={3}
              value={form.message}
              onChange={(e) =>
                setForm({ ...form, message: e.currentTarget.value })
              }
            />

            <Group justify="flex-end" mt="md">
              <Button variant="default" onClick={onClose}>
                Cancel
              </Button>

              <Button loading={loading} onClick={handleSubmit}>
                Submit Request
              </Button>
            </Group>
          </Stack>
        )}
      </Modal>

      {/* 🔥 Register Prompt */}
      <RegisterPromptModal
        opened={showRegisterPrompt}
        onClose={() => setShowRegisterPrompt(false)}
        onRegister={() => {
          setShowRegisterPrompt(false);
          onClose();
          onOpenSignup?.();
        }}
      />
    </>
  );
}