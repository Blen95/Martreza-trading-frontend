import { Button } from "@mantine/core";
import { useState } from "react";
import QuoteRequestModal from "./QuoteRequestForm";

interface Props {
  label?: string;
  productId?: number | null;
  itemName?: string; // ✅ NEW
}

export default function QuoteButton({
  label = "Request Quote",
  productId = null,
  itemName,
}: Props) {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Button
        radius="xl"
        size="sm"
        onClick={() => setOpened(true)}
        className="bg-gray-900 text-white hover:bg-gray-800 hover:scale-105 transition-all duration-300"
      >
        {label}
      </Button>

      <QuoteRequestModal
  opened={opened}
  onClose={() => setOpened(false)}
  productId={productId}
  itemName={itemName} // ✅ PASS HERE
/>
    </>
  );
}