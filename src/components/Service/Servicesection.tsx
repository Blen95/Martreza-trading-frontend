import { Container, Title, Text, Button } from "@mantine/core";
import { motion } from "framer-motion";
import { useState } from "react";
import RequestFormModal from "../RequestFormModal";

interface Props {
  title: string;
  description: string;
  image: string;
  dark?: boolean;
}

export default function ServiceSection({
  title,
  description,
  image,
  dark = false,
}: Props) {
  const [opened, setOpened] = useState(false);

  return (
    <section
      className={`py-24 ${
        dark
          ? "bg-gradient-to-br from-[#0B1C2D] via-[#0F2438] to-[#111827] text-white"
          : "bg-white text-gray-900"
      }`}
    >
      <Container size="lg">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="h-[350px] overflow-hidden rounded-xl"
          >
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Title order={2} className="text-3xl font-bold mb-6">
              {title}
            </Title>

            <Text
              className={`mb-6 ${
                dark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {description}
            </Text>

            <Button
              radius="xl"
              className={
                dark
                  ? "bg-white text-black hover:bg-gray-200"
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }
              onClick={() => setOpened(true)}
            >
              Request Service
            </Button>

            <RequestFormModal
              opened={opened}
              onClose={() => setOpened(false)}
              type="service"
            />
          </motion.div>

        </div>
      </Container>
    </section>
  );
}