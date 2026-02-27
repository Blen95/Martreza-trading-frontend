import { Container, Title, Text, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { IconCheck } from "@tabler/icons-react";

const benefits = [
  "Direct Imported Materials",
  "Consultancy + Supply Integration",
  "Reliable Project-Based Service",
  "We Receive Excess Materials",
];

export default function WhyChooseUs() {
  const navigate = useNavigate();

  return (
    <section className="bg-white text-gray-900 py-24">
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
            Why Choose Martreza?
          </Title>
          <Text className="mt-4 text-gray-700 max-w-2xl mx-auto">
            We combine expertise, premium materials, and end-to-end support to ensure your project’s success.
          </Text>
        </motion.div>

        {/* Benefits List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {benefits.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="flex items-start gap-4"
            >
              <div className="flex-shrink-0 bg-gray-900 text-white rounded-full p-2 mt-1">
                <IconCheck size={20} />
              </div>
              <Text className="text-gray-900 font-medium">{item}</Text>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button
            size="lg"
            radius="xl"
            className="bg-gray-900 text-white font-bold hover:bg-gray-800 transition-all"
            onClick={() => navigate("/services")}
          >
            Start Your Project With Confidence
          </Button>
        </div>
      </Container>
    </section>
  );
}