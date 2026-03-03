import { Container, Text, Title, Anchor, Image } from '@mantine/core';
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitter,
  IconMapPin,
} from '@tabler/icons-react';
import logo from '../assets/leulumblack.png';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 py-3">
      <Container size="lg">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">

          {/* Left - Socials */}
          <div className="flex gap-4">
            <Anchor href="#" target="_blank" className="hover:text-white transition-colors">
              <IconBrandFacebook size={20} />
            </Anchor>
            <Anchor href="#" target="_blank" className="hover:text-white transition-colors">
              <IconBrandInstagram size={20} />
            </Anchor>
            <Anchor href="#" target="_blank" className="hover:text-white transition-colors">
              <IconBrandTwitter size={20} />
            </Anchor>
          </div>

          {/* Center - Company Info */}
          <div className="flex flex-col items-center text-center gap-2">
            <Title order={5} className="text-white">
              Martreza Trading plc.
            </Title>

            <Text className="text-gray-300">
              Email: info@martreza.com
            </Text>

            <Anchor
              href="https://www.google.com/maps/search/123+Main+St,+Addis+Ababa,+Ethiopia"
              target="_blank"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <IconMapPin size={18} />
              Addis Ababa, Ethiopia
            </Anchor>
          </div>

          {/* Right - Logo */}
          <div>
            <Image src={logo} alt="Logo" width={80} />
          </div>

        </div>

        {/* Bottom Note */}
        <div className="text-center text-gray-400 mt-10 text-sm border-t border-gray-700 pt-6">
          © {new Date().getFullYear()} Martreza Trading plc. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}