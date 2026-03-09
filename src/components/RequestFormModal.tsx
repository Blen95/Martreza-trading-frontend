import { Modal, TextInput, Select, Button, Stack } from "@mantine/core";
import { useEffect, useState } from "react";

type RequestType =
  | "sell_excess"
  | "consultation"
  | "procurement";

interface Props {
  opened: boolean;
  onClose: () => void;
  type?: RequestType;
}

export default function RequestFormModal({
  opened,
  onClose,
  type,
}: Props) {
  const [requestType, setRequestType] = useState<RequestType | null>(null);

  useEffect(() => {
    if (type) {
      setRequestType(type);
    }
  }, [type]);

  const handleSubmit = () => {
    // You can connect this to backend later
    console.log("Submitted");
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      radius="lg"
      size="md"
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      styles={{
        content: {
          background: "linear-gradient(to bottom right, #0F2438, #111827)",
          color: "white",
        },
      }}
      title={<span className="text-white font-bold text-lg">Project Request</span>}
    >
      <Stack>
        <TextInput
          label="Full Name"
          placeholder="Enter your name"
          required
          styles={inputStyles}
        />

        <TextInput
          label="Company Name (Optional)"
          placeholder="Your company"
          styles={inputStyles}
        />

        <TextInput
          label="Email"
          placeholder="your@email.com"
          required
          styles={inputStyles}
        />

        <TextInput
          label="Phone Number"
          placeholder="+251..."
          required
          styles={inputStyles}
        />

        <Select
          label="Request Type"
          value={requestType}
          onChange={(value) =>
            setRequestType(value as RequestType)
          }
          data={[
            { value: "sell_excess", label: "Sell Excess Materials" },
            { value: "consultation", label: "Request Consultation" },
            { value: "procurement", label: "Request International Procurement" },
          ]}
          required
          styles={inputStyles}
        />

        <Button
          size="md"
          radius="xl"
          className="bg-white text-black font-bold hover:bg-gray-200 mt-4"
          onClick={handleSubmit}
        >
          Submit Request
        </Button>
      </Stack>
    </Modal>
  );
}

const inputStyles = {
  label: { color: "#E5E7EB", marginBottom: 4 },
  input: {
    backgroundColor: "#1F2937",
    color: "white",
    border: "1px solid #374151",
  },
};