import { Container, Text, Title } from "@mantine/core";
import { motion } from "framer-motion";

const solutions = [
  {
    title: "Finishing Materials",
    description:
      "Premium imported tiles, lighting, and fittings for high-quality finishes.",
    image: "https://source.unsplash.com/400x300/?construction,interior",
  },
  {
    title: "Civil Services",
    description:
      "Structural and civil work solutions with project-based material supply.",
    image: "https://source.unsplash.com/400x300/?construction,building",
  },
  {
    title: "Electromechanical Works",
    description:
      "Electrical and mechanical installations with integrated building solutions.",
    image: "https://source.unsplash.com/400x300/?engineering,mechanical",
  },
];

export default function CoreSolutions() {
  return (
    <section className="relative bg-gradient-to-br from-[#0B1C2D] via-[#0F2438] to-[#111827] text-white py-24">
      <Container size="lg" className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Title order={2} className="text-3xl md:text-4xl font-extrabold">
            Our Core Solutions
          </Title>
          <Text className="mt-4 text-gray-300 max-w-2xl mx-auto">
            Comprehensive construction solutions tailored for your project needs.
          </Text>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((solution, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.03 }}
              className="relative rounded-lg overflow-hidden shadow-lg cursor-pointer group"
            >
              {/* Card Image */}
              <img
                src={solution.image}
                alt={solution.title}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center p-6">
                <Title order={4} className="text-xl font-bold mb-2">
                  {solution.title}
                </Title>
                <Text className="text-gray-200">{solution.description}</Text>
              </div>

              {/* Card Title (visible initially) */}
              <div className="absolute bottom-4 left-4">
                <Title order={5} className="text-white font-bold">
                  {solution.title}
                </Title>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}