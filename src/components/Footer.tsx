import { Container, Text, Title, Anchor, Image } from '@mantine/core';
import { IconBrandFacebook, IconBrandInstagram, IconBrandTwitter, IconMapPin } from '@tabler/icons-react';
import logo from '../assets/leulumblack.png'; // replace with your logo path

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 py-6 md:py-8 relative">
      <Container className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center relative">

        {/* Social Media Icons - bottom left */}
        <div className="flex gap-4 absolute left-0 bottom-0 mb-4 md:mb-0">
          <Anchor href="#" target="_blank" className="hover:text-white transition-colors"><IconBrandFacebook size={20} /></Anchor>
          <Anchor href="#" target="_blank" className="hover:text-white transition-colors"><IconBrandInstagram size={20} /></Anchor>
          <Anchor href="#" target="_blank" className="hover:text-white transition-colors"><IconBrandTwitter size={20} /></Anchor>
        </div>

        {/* Company Info - center */}
        <div className="flex flex-col items-center text-center gap-2">
          <Title order={5} className="text-white">Martreza Trading plc.</Title>
          <Text className="text-gray-300">Email: info@martreza.com</Text>

          {/* Map Link */}
          <Anchor
            href="https://www.google.com/maps/search/123+Main+St,+Addis+Ababa,+Ethiopia"
            target="_blank"
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors mt-1"
          >
            <IconMapPin size={18} />
            123 Main St, Addis Ababa
          </Anchor>
        </div>

        {/* Logo - bottom right */}
        <div className="absolute right-0 bottom-0 mb-4 md:mb-0">
          <Image src={logo} alt="Logo" width={20} />
        </div>

      </Container>

      {/* Bottom Note */}
      <div className="text-center text-gray-400 mt-4 text-sm md:text-base">
        © {new Date().getFullYear()} Martreza Trading plc. All rights reserved.
      </div>
    </footer>
  );
}