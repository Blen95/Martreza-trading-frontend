import { Container, Title, Button } from "@mantine/core";
import { useState } from "react";
import RequestFormModal from "../RequestFormModal";

export default function ServicesCTA() {
  const [opened, setOpened] = useState(false);

  return (
    <section className="py-24 bg-gray-50 text-center">
      <Container size="md">
        <Title order={2} className="text-3xl font-bold mb-8">
          Start Your Next Project With Martreza
        </Title>

        <Button
          size="lg"
          radius="xl"
          className="bg-gray-900 text-white hover:bg-gray-800"
          onClick={() => setOpened(true)}
        >
          Submit Inquiry
        </Button>

        <RequestFormModal
          opened={opened}
          onClose={() => setOpened(false)}
          type="service"
        />
      </Container>
    </section>
  );
}