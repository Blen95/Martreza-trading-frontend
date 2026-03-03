import { Container, Title, Text, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative bg-gradient-to-br from-[#0B1C2D] via-[#0F2438] to-[#111827] text-white overflow-hidden">
      
      {/* Subtle background accents */}
      <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-120px] left-[-120px] w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl"></div>

      <Container size="lg" className="relative z-10 py-28 md:py-36">
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          {/* Headline */}
          <Title
            order={1}
            className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight"
          >
            Martreza Trading
          </Title>

          {/* Subheadline */}
          <Text
            size="3xl"
            className="mt-4 md:text-3xl font-bold text-gray-100 leading-snug"
          >
            Engineering Excellence
          </Text>

          {/* Description */}
          <Text
            size="lg"
            className="mt-6 text-gray-300 leading-relaxed"
          >
            Martreza Trading delivers premium imported construction materials,
            civil services, and electromechanical solutions.  
            From consultancy to full supply — we ensure your project is executed
            with confidence and precision.
          </Text>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              radius="xl"
              className="bg-white text-black font-bold hover:bg-gray-200 transition-all"
              onClick={() => navigate("/materials")}
            >
              Explore Materials
            </Button>

            <Button
              size="lg"
              radius="xl"
              variant="outline"
              className="border-gray-500 text-gray-100 hover:bg-gray-800 font-medium transition-all"
              onClick={() => navigate("/services")}
            >
              Our Services
            </Button>
          </div>

          {/* Footer Note */}
          <Text size="sm" className="mt-8 text-gray-400">
            Consultancy with supply integration • Advance project-based imports • 
            Excess construction material intake
          </Text>
        </motion.div>

      </Container>
    </section>
  );
}