import { Container, Title, Text } from "@mantine/core";
import { motion } from "framer-motion";
import { IconClipboardCheck, IconBuildingStore, IconCash, IconTruckDelivery } from "@tabler/icons-react";

const steps = [
  {
    title: "Consultation & Requirement Review",
    description: "We understand your project needs and suggest the best solutions.",
    icon: <IconClipboardCheck size={32} />,
  },
  {
    title: "Material Selection & Quotation",
    description: "Choose from imported materials and receive a detailed quote.",
    icon: <IconBuildingStore size={32} />,
  },
  {
    title: "Advance Payment Confirmation",
    description: "Confirm advance payment and secure your materials and services.",
    icon: <IconCash size={32} />,
  },
  {
    title: "Delivery & Project Support",
    description: "Receive materials and support for smooth execution of your project.",
    icon: <IconTruckDelivery size={32} />,
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-gray-50 text-gray-900 py-24">
      <Container size="lg" className="relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Title order={2} className="text-3xl md:text-4xl font-extrabold">
            How It Works
          </Title>
          <Text className="mt-4 text-gray-700 max-w-2xl mx-auto">
            A simple, transparent process to get your project done efficiently.
          </Text>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow"
            >
              <div className="bg-gray-900 text-white rounded-full p-4 mb-4">
                {step.icon}
              </div>
              <Title order={4} className="font-bold mb-2">
                {step.title}
              </Title>
              <Text className="text-gray-700 text-sm">
                {step.description}
              </Text>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}