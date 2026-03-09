import { Container, Title, Text } from "@mantine/core";
import { motion } from "framer-motion";

export default function MaterialsHero() {
  return (
    <section className="relative bg-gradient-to-br from-[#0B1C2D] via-[#0F2438] to-[#111827] text-white overflow-hidden">
      <Container size="lg" className="py-28 md:py-36">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <Title order={1} className="text-4xl md:text-5xl font-extrabold">
            Premium Imported Construction Materials
          </Title>

          <Text size="lg" className="mt-6 text-gray-300 leading-relaxed">
            We source and supply high-quality finishing, civil, and
            electro-mechanical materials tailored to support modern
            construction projects across Ethiopia.
          </Text>
        </motion.div>
      </Container>
    </section>
  );
}