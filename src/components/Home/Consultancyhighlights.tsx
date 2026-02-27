import { Container, Title, Text, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function ConsultancyHighlight() {
  const navigate = useNavigate();

  return (
    <section className="relative bg-gray-50 text-gray-900 py-24">
      <Container size="lg" className="relative z-10">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12">

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <Title order={2} className="text-3xl md:text-4xl font-extrabold mb-4">
              Consultancy That Delivers
            </Title>

            <Text className="text-gray-700 mb-6 leading-relaxed">
              Not just advisory — we design, source, and supply.  
              Martreza Trading integrates consultancy with supply services to ensure
              your project is executed with precision and confidence.
            </Text>

            <Button
              size="lg"
              radius="xl"
              className="bg-gray-900 text-white font-bold hover:bg-gray-800 transition-all"
              onClick={() => navigate("/services")}
            >
              Start Your Project With Confidence
            </Button>
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
              src="https://source.unsplash.com/500x400/?construction,consultancy"
              alt="Consultancy"
              className="w-full rounded-lg shadow-lg object-cover"
            />
          </motion.div>

        </div>
      </Container>
    </section>
  );
}