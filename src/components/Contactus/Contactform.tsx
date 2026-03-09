import { Container, TextInput, Textarea, Button, Title } from "@mantine/core";

export default function ContactForm() {
  return (
    <section className="py-24 bg-gray-50">
      <Container size="sm">

        <Title order={2} className="text-center mb-10">
          Send Us a Message
        </Title>

        <form className="space-y-6">

          <TextInput
            label="Full Name"
            placeholder="Your name"
            required
          />

          <TextInput
            label="Email"
            placeholder="your@email.com"
            required
          />

          <TextInput
            label="Phone Number"
            placeholder="+251..."
          />

          <Textarea
            label="Message"
            placeholder="Tell us about your project or inquiry"
            minRows={4}
          />

          <Button
            fullWidth
            radius="xl"
            className="bg-gray-900 text-white hover:bg-gray-800"
          >
            Send Message
          </Button>

        </form>

      </Container>
    </section>
  );
}