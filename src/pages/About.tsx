import { Container, Title, Text, Grid, Card, Image } from "@mantine/core";
import { motion } from "framer-motion";

import founder1 from "../assets/founder1.jpeg";
import founder2 from "../assets/founder1.jpeg";
import officeImg from "../assets/herooption.jpeg";
import ceramicImg from "../assets/finishing.jpeg";
import electricalImg from "../assets/Electrical Energy Company.jpeg";
import sanitaryImg from "../assets/sanitary.jpeg";
import location from"../assets/location.svg";
import FloatingIcons from "../components/Floatingicons";
export default function AboutPage() {
  return (
    <div className="bg-white text-gray-900">

      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-gradient-to-br from-[#0B1C2D] via-[#0F2438] to-[#111827] text-white overflow-hidden">
        
        <div className="absolute inset-0 opacity-20">
          <img
            src={officeImg}
            alt="Company Background"
            className="w-full h-full object-cover"
          />
        </div>

        <Container size="lg" className="relative z-10 py-28 md:py-36">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <Title order={1} className="text-4xl md:text-5xl font-extrabold">
              About Martreza Trading PLC
            </Title>

            <Text size="lg" className="mt-6 text-gray-300 leading-relaxed">
              A licensed construction materials and equipment trading firm 
              based in Addis Ababa, Ethiopia, delivering premium imported 
              materials and professional solutions for residential, commercial, 
              and institutional projects.
            </Text>
          </motion.div>
        </Container>
      </section>

      {/* ================= VISION & MISSION ================= */}
      <section className="py-24 bg-gray-50">
        <Container size="lg">
          <Grid gutter={60}>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Title order={2} className="text-3xl font-bold mb-6">
                Our Vision
              </Title>
              <Text className="text-gray-700 leading-relaxed">
                To become one of Ethiopia’s most trusted construction 
                material trading companies through reliability, 
                international sourcing, and quality excellence.
              </Text>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <Title order={2} className="text-3xl font-bold mb-6">
                Our Mission
              </Title>
              <Text className="text-gray-700 leading-relaxed">
                To provide standardized, high-quality construction materials 
                with integrity, transparency, and long-term partnerships.
              </Text>
            </Grid.Col>
          </Grid>
        </Container>
      </section>

      {/* ================= LEADERSHIP ================= */}
      <section className="py-24 bg-white">
        <Container size="lg">
          <Title order={2} className="text-3xl font-bold text-center mb-16">
            Leadership
          </Title>

          <Grid gutter={40}>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Card shadow="lg" radius="lg" padding="lg" className="text-center">
               <Image
  src={founder1}
  w={240}
  h={240}
  radius="xl"
  mx="auto"
  className="object-cover mb-6"
/>
                <Title order={4}>Ato Yihenew Dachew</Title>
                <Text className="mt-3 text-gray-600">
                  Co-Founder guiding strategic growth and company expansion.
                </Text>
              </Card>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <Card shadow="lg" radius="lg" padding="lg" className="text-center">
               <Image
  src={founder2}
  w={240}
  h={240}
  radius="xl"
  mx="auto"
  className="object-cover mb-6"
/>
                <Title order={4}>W/ro Netsanet Seyoum</Title>
                <Text className="mt-3 text-gray-600">
                  General Manager with strong leadership and operational oversight.
                </Text>
              </Card>
            </Grid.Col>
          </Grid>
        </Container>
      </section>

      {/* ================= IMPORTED MATERIALS ================= */}
      <section className="py-24 bg-gradient-to-br from-[#0B1C2D] via-[#0F2438] to-[#111827] text-white">
        <Container size="lg">
          <Title order={2} className="text-3xl font-bold text-center mb-16">
            Imported Materials
          </Title>

          <Grid gutter={30}>
  {[ 
    { img: ceramicImg, label: "Ceramic & Finishing Materials" },
    { img: electricalImg, label: "Electrical & Mechanical Components" },
    { img: sanitaryImg, label: "Sanitary & Plumbing Accessories" },
  ].map((item, index) => (
    <Grid.Col key={index} span={{ base: 12, md: 4 }}>
      
      {/* Fixed Image Container */}
      <div className="w-full h-[260px] overflow-hidden rounded-lg shadow-md">
        <img
          src={item.img}
          alt={item.label}
          className="w-full h-full object-cover"
        />
      </div>

      <Text className="mt-4 text-gray-300 text-center">
        {item.label}
      </Text>
    </Grid.Col>
  ))}
</Grid>
        </Container>
      </section>

      {/* ================= OFFICE SECTION ================= */}
      <section className="py-24 bg-gray-50">
        <Container size="lg">
          <Grid gutter={60} align="center">
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Image
                src={location}
                radius="lg"
                height={350}
                className="object-cover"
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <Title order={2} className="text-3xl font-bold mb-6">
                Our Office
              </Title>
              <Text className="text-gray-700 leading-relaxed">
                Located at Dembel Building, 9th Floor, Room 910A,
                Africa Avenue, Addis Ababa, Ethiopia. Our office serves as
                the central coordination point for our trading operations
                and client engagements.
              </Text>
            </Grid.Col>
          </Grid>
        </Container>
      </section>
<FloatingIcons/>
    </div>
  );
}