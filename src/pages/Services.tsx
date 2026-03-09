import { Container, Title, Text } from "@mantine/core";
import { motion } from "framer-motion";
import ServiceSection from "../components/Service/Servicesection";
import ServicesCTA from "../components/Service/ServiceCTA";

import importImg from "../assets/import.jpeg";
import consultancyImg from "../assets/civil.jpeg";
import excessImg from "../assets/excess.jpeg";

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0B1C2D] via-[#0F2438] to-[#111827] text-white py-32">
        <Container size="lg">
          <Title order={1} className="text-4xl md:text-5xl font-bold">
            Our Services
          </Title>

          <Text size="lg" className="mt-6 text-gray-300 max-w-3xl">
            Martreza delivers specialized services supporting construction
            projects through international procurement, professional
            consultancy, and efficient material redistribution solutions.
          </Text>
        </Container>
      </section>

      {/* Services */}
      <ServiceSection
        title="International Material Import"
        description="We source and import high-quality construction materials from trusted global manufacturers, ensuring reliable supply for residential, commercial, and infrastructure developments."
        image={importImg}
      />

      <ServiceSection
        title="Construction Consultancy"
        description="Our consultancy services support developers and contractors with procurement strategy, material selection, cost optimization, and supplier coordination for complex projects."
        image={consultancyImg}
        dark
      />

      <ServiceSection
        title="Excess Material Marketplace"
        description="We help contractors and developers sell unused or excess construction materials, connecting them with buyers who can utilize these resources efficiently."
        image={excessImg}
      />

      <ServicesCTA />
    </>
  );
}