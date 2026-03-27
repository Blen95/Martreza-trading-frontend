import { useState } from "react";
import {
  Burger,
  Drawer,
  ScrollArea,
  Menu,
  Accordion,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { NavLink } from "react-router-dom";
import { IconChevronDown } from "@tabler/icons-react";

import SignupModal from "./Authentication/SignUpForm";
import LoginModal from "./Authentication/LoginForm";

export default function Navbar() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [signupOpened, setSignupOpened] = useState(false);
  const [loginOpened, setLoginOpened] = useState(false);

  // 🔥 Shared nav link style (with animated underline)
  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition duration-200 relative ${
      isActive
        ? "text-black after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-black"
        : "text-gray-700 hover:text-black after:absolute after:-bottom-1 after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-black after:transition-all"
    }`;

  return (
    <>
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50 px-6 py-4 border-b border-gray-200">
        <div className="relative max-w-7xl mx-auto flex items-center">
          {/* Logo */}
          <NavLink
            to="/"
            className="text-xl font-bold text-black tracking-wide"
          >
            Martreza
          </NavLink>

          {/* Center Links */}
          <div className="hidden md:flex items-center space-x-10 absolute left-1/2 -translate-x-1/2">
            <NavLink to="/" className={linkClasses}>
              Home
            </NavLink>
            <NavLink to="/about" className={linkClasses}>
              About
            </NavLink>

            {/* Materials Dropdown */}
            <Menu trigger="hover" openDelay={100} closeDelay={200}>
              <Menu.Target>
                <div className="flex items-center gap-1 cursor-pointer text-sm font-medium text-gray-700 hover:text-black relative after:absolute after:-bottom-1 after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-black after:transition-all">
                  Materials <IconChevronDown size={14} />
                </div>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item component={NavLink} to="/materials/finishing">
                  Finishing Construction
                </Menu.Item>
                <Menu.Item component={NavLink} to="/materials/civil">
                  Civil Construction
                </Menu.Item>
                <Menu.Item component={NavLink} to="/materials/electro">
                  Electro-Mechanical
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>

            <NavLink to="/services" className={linkClasses}>
              Services
            </NavLink>
            <NavLink to="/contact" className={linkClasses}>
              Contact
            </NavLink>
          </div>

          {/* Auth Buttons */}
          <div className="ml-auto hidden md:flex items-center gap-6">
            <button
              onClick={() => setLoginOpened(true)}
              className="text-sm font-medium text-gray-700 hover:text-black transition relative after:absolute after:-bottom-1 after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-black after:transition-all"
            >
              Login
            </button>

            <button
  onClick={() => setSignupOpened(true)}
  className="text-sm font-medium text-gray-800 px-4 py-1.5 rounded-md
             bg-gradient-to-br from-gray-100/60 via-gray-200/40 to-gray-100/60
             backdrop-blur-md border border-gray-300/40
             hover:from-gray-200/70 hover:via-gray-300/50 hover:to-gray-200/70
             hover:shadow-sm hover:-translate-y-[1px]
             transition-all duration-200"
>
  Register
</button>
          </div>

          {/* Mobile Burger */}
          <div className="ml-auto md:hidden">
            <Burger opened={opened} onClick={toggle} size="sm" color="black" />
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <Drawer
        opened={opened}
        onClose={close}
        padding="md"
        size="75%"
        position="left"
        hiddenFrom="md"
      >
        <ScrollArea h="100%">
          <div className="flex flex-col gap-6 mt-6">
            <NavLink to="/" onClick={close} className={linkClasses}>
              Home
            </NavLink>
            <NavLink to="/about" onClick={close} className={linkClasses}>
              About
            </NavLink>

            {/* Accordion for Materials */}
            <Accordion variant="separated">
              <Accordion.Item value="materials">
                <Accordion.Control className="!px-0 py-0 text-sm font-medium text-gray-700 hover:text-black">
                  Materials
                </Accordion.Control>

                <Accordion.Panel className="ml-3 flex flex-col gap-4">
                  <NavLink
                    to="/materials/finishing"
                    onClick={close}
                    className={linkClasses}
                  >
                    Finishing Construction
                  </NavLink>
                  <NavLink
                    to="/materials/civil"
                    onClick={close}
                    className={linkClasses}
                  >
                    Civil Construction
                  </NavLink>
                  <NavLink
                    to="/materials/electro"
                    onClick={close}
                    className={linkClasses}
                  >
                    Electro-Mechanical
                  </NavLink>
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>

            <NavLink to="/services" onClick={close} className={linkClasses}>
              Services
            </NavLink>
            <NavLink to="/contact" onClick={close} className={linkClasses}>
              Contact
            </NavLink>

            {/* Mobile Auth */}
            <div className="flex flex-col gap-3 mt-4">
              <button
                onClick={() => {
                  setLoginOpened(true);
                  close();
                }}
                className="text-sm font-medium text-gray-700 text-left"
              >
                Login
              </button>

              <button
  onClick={() => {
    setSignupOpened(true);
    close();
  }}
  className="text-sm font-medium text-gray-800 px-4 py-2 rounded-md
             bg-gradient-to-br from-gray-100/70 via-gray-200/50 to-gray-100/70
             backdrop-blur-md border border-gray-300/40
             active:scale-[0.98]
             transition-all"
>
  Register
</button>
            </div>
          </div>
        </ScrollArea>
      </Drawer>

      {/* Modals */}
      <SignupModal
        opened={signupOpened}
        onClose={() => setSignupOpened(false)}
      />
      <LoginModal
        opened={loginOpened}
        onClose={() => setLoginOpened(false)}
      />
    </>
  );
}