import { Container, Title, Button } from "@mantine/core";
import { useState } from "react";
import RequestFormModal from "../RequestFormModal";

export default function MaterialsCTA() {
  const [opened, setOpened] = useState(false);

  return (
    <section className="py-24 bg-gradient-to-br from-[#0B1C2D] via-[#0F2438] to-[#111827] text-white text-center">
      <Container size="md">
        <Title order={2} className="text-3xl font-bold mb-8">
          Need Project-Based International Procurement?
        </Title>

        <Button
          size="lg"
          radius="xl"
          className="bg-white text-black hover:bg-gray-200"
          onClick={() => setOpened(true)}
        >
          Submit Request
        </Button>

        <RequestFormModal
          opened={opened}
          onClose={() => setOpened(false)}
          type="procurement"
        />
      </Container>
    </section>
  );
}