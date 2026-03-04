import { Container, Title, Text, Button } from "@mantine/core";
import { motion } from "framer-motion";
import { useState } from "react";
import RequestFormModal from "../RequestFormModal";

interface Props {
  id: string;
  title: string;
  description: string;
  items: string[];
  image: string;
  dark?: boolean;
}

export default function MaterialSection({
  id,
  title,
  description,
  items,
  image,
  dark = false,
}: Props) {
  const [opened, setOpened] = useState(false);

  return (
    <section
      id={id}
      className={`py-24 ${dark
          ? "bg-gradient-to-br from-[#0B1C2D] via-[#0F2438] to-[#111827] text-white"
          : "bg-gray-50 text-gray-900"
        }`}
    >
      <Container size="lg">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full h-[350px] overflow-hidden rounded-lg"
          >
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Title order={2} className="text-3xl font-bold mb-6">
              {title}
            </Title>

            <Text className={`${dark ? "text-gray-300" : "text-gray-700"} mb-6`}>
              {description}
            </Text>

            <ul className={`space-y-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>
              {items.map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>

            <Button
              mt="xl"
              radius="xl"
              className={dark
                ? "bg-white text-black hover:bg-gray-200"
                : "bg-gray-900 text-white hover:bg-gray-800"}
              onClick={() => setOpened(true)}
            >
              Request Procurement
            </Button>

            <RequestFormModal
              opened={opened}
              onClose={() => setOpened(false)}
              type="procurement"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}