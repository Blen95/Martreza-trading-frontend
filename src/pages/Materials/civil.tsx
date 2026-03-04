import { Container, Title, Text, Button } from "@mantine/core";
import { motion } from "framer-motion";
import RequestFormModal from "../../components/RequestFormModal";
import { useState } from "react";

import cementImg from "../../assets/cement.jpeg";
import steelImg from "../../assets/steel.jpeg";
import concreteImg from "../../assets/concrete.jpeg";
import waterproofImg from "../../assets/waterproof.jpeg";

export default function CivilPage() {
  const [opened, setOpened] = useState(false);

  const categories = [
    {
      title: "Cement & Aggregates",
      desc: "High-grade cement and construction aggregates meeting international structural standards.",
      img: cementImg,
    },
    {
      title: "Reinforcement Steel",
      desc: "Durable reinforcement bars and structural steel engineered for maximum load performance.",
      img: steelImg,
    },
    {
      title: "Concrete Solutions",
      desc: "Ready-mix and engineered concrete systems for large-scale developments.",
      img: concreteImg,
    },
    {
      title: "Waterproofing & Insulation",
      desc: "Advanced protection systems enhancing durability and structural longevity.",
      img: waterproofImg,
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0B1C2D] via-[#0F2438] to-[#111827] text-white py-32">
        <Container size="lg">
          <Title order={1} className="text-4xl md:text-5xl font-bold">
            Civil Construction Materials
          </Title>
          <Text size="lg" className="mt-6 text-gray-300 max-w-3xl">
            Structural-grade civil materials engineered to support durable,
            large-scale infrastructure and commercial developments.
          </Text>
        </Container>
      </section>

      {/* Categories */}
      <section className="py-24 bg-white">
        <Container size="lg">
          <div className="grid md:grid-cols-2 gap-12">
            {categories.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="group rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
              >
                <div className="h-[280px] overflow-hidden">
                  <img
                    src={cat.img}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>

                <div className="p-8">
                  <Title order={3} className="mb-4">
                    {cat.title}
                  </Title>
                  <Text className="text-gray-600">
                    {cat.desc}
                  </Text>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gray-50 text-center">
        <Container size="md">
          <Title order={2} className="mb-6">
            Source Reliable Structural Materials
          </Title>
          <Button
            size="lg"
            radius="xl"
            className="bg-gray-900 text-white hover:bg-gray-800"
            onClick={() => setOpened(true)}
          >
            Submit Project Inquiry
          </Button>
        </Container>
      </section>

      <RequestFormModal
        opened={opened}
        onClose={() => setOpened(false)}
        type="procurement"
      />
    </>
  );
}