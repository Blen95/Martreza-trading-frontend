import { Container, Title, Text, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import RequestFormModal from "../RequestFormModal";

export default function ExcessMaterialsSection() {
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);

  return (
    <section className="bg-gray-50 text-gray-900 py-24">
      <Container size="lg" className="relative z-10 flex flex-col md:flex-row items-center gap-12">

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          <Title order={2} className="text-3xl md:text-4xl font-extrabold mb-4">
            Have Extra Construction Materials?
          </Title>

          <Text className="text-gray-700 mb-6 leading-relaxed">
            Martreza Trading evaluates and receives surplus materials from projects, 
            ensuring nothing goes to waste and providing you with a simple, trustworthy process.
          </Text>

          <Button
  size="lg"
  radius="xl"
  className="bg-gray-900 text-white font-bold hover:bg-gray-800 transition-all"
  onClick={() => setOpened(true)}
>
  Sell Excess Materials
</Button>

<RequestFormModal
  opened={opened}
  onClose={() => setOpened(false)}
  type="sell_excess"
/>
        </motion.div>

        {/* Image / Illustration */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          <img
            src="src/assets/excess.jpeg"
            alt="Excess Materials"
            className="w-full rounded-lg shadow-lg object-cover"
          />
        </motion.div>

      </Container>
    </section>
  );
}