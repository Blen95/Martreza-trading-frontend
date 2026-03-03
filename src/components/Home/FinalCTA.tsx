import { Container, Title, Text, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import RequestFormModal from "../RequestFormModal";


export default function FinalCTA() {
  const navigate = useNavigate();
   const[opened,setOpened]=useState(false)
  return (
    <section className="bg-gradient-to-br from-[#0B1C2D] via-[#0F2438] to-[#111827] text-white py-24">
      <Container size="lg" className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Title order={2} className="text-3xl md:text-5xl font-extrabold mb-6">
            Build Smarter. Build With Martreza.
          </Title>
          <Text className="text-gray-300 mb-10 text-lg md:text-xl">
            Partner with us for premium imported materials, consultancy, and project-based services.
          </Text>
          <Button
            size="lg"
            radius="xl"
            className="bg-white text-black font-bold hover:bg-gray-200 transition-all"
            onClick={() => setOpened(true)}
          >
            Start Your Project With Confidence
          </Button>
            <RequestFormModal
                    opened={opened}
                    onClose={()=> setOpened(false)}
                    type="procurement"/>
        </motion.div>
      </Container>
    </section>
  );
}