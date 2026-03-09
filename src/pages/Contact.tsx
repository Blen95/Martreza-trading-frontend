import { Container, Title, Text, Grid, Card } from "@mantine/core";
import ContactForm from "../components/Contactus/Contactform";
import { IconPhone, IconMail, IconMapPin } from "@tabler/icons-react";

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0B1C2D] via-[#0F2438] to-[#111827] text-white py-32">
        <Container size="lg">
          <Title order={1} className="text-4xl md:text-5xl font-bold">
            Contact Us
          </Title>

          <Text size="lg" className="mt-6 text-gray-300 max-w-2xl">
            Reach out to Martreza for project inquiries, procurement
            partnerships, or consultancy services. Our team is ready to
            support your next development project.
          </Text>
        </Container>
      </section>

      {/* Contact Info */}
      <section className="py-24 bg-white">
        <Container size="lg">
          <Grid>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <Card shadow="sm" padding="lg" radius="md">
                <IconPhone size={28} />
                <Title order={4} mt="md">
                  Phone
                </Title>
                <Text c="dimmed">+251 9XX XXX XXX</Text>
              </Card>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <Card shadow="sm" padding="lg" radius="md">
                <IconMail size={28} />
                <Title order={4} mt="md">
                  Email
                </Title>
                <Text c="dimmed">info@martreza.com</Text>
              </Card>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <Card shadow="sm" padding="lg" radius="md">
                <IconMapPin size={28} />
                <Title order={4} mt="md">
                  Office
                </Title>
                <Text c="dimmed">
                  Addis Ababa, Ethiopia
                </Text>
              </Card>
            </Grid.Col>

          </Grid>
        </Container>
      </section>

      {/* Contact Form */}
      <ContactForm />
<section className="py-24 bg-white">
  <Container size="lg">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.643147081241!2d38.76237238885497!3d9.0049456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85b039c25bc1%3A0x941677a8f60160fe!2sDembel%20City%20Center!5e0!3m2!1sen!2set!4v1773054083946!5m2!1sen!2set"
      className="w-full h-[400px] rounded-lg border-0"
      loading="lazy"
    />
  </Container>
</section>
    </>
  );
}