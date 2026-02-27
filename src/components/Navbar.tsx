import { useState } from "react";
import { Group, Burger, Drawer, ScrollArea, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { NavLink } from "react-router-dom";
import { IconChevronDown } from "@tabler/icons-react";

export default function Navbar() {
  const [opened, { toggle, close }] = useDisclosure(false);

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium transition duration-200 ${
    isActive
           ? "text-black relative after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-black"      : "text-gray-700 hover:text-black"
  }`;

  return (
    <>
      {/* Top Navbar */}
<nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-50 px-6 py-4 border-b border-gray-200">
  <div className="relative max-w-7xl mx-auto flex items-center">

    {/* Logo */}
    <NavLink
      to="/"
      className="text-xl font-bold text-black tracking-wide"
    >
      Martreza
    </NavLink>

    {/* Desktop Navigation (Centered) */}
    <div className="hidden md:flex items-center space-x-10 absolute left-1/2 -translate-x-1/2">
      <NavLink to="/" className={linkClasses}>
        Home
      </NavLink>

      <NavLink to="/about" className={linkClasses}>
        About
      </NavLink>

      <Menu trigger="hover" openDelay={100} closeDelay={200}>
        <Menu.Target>
          <div className="flex items-center gap-1 cursor-pointer text-sm font-medium text-gray-700 hover:text-black">
            Materials <IconChevronDown size={14} />
          </div>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item component={NavLink} to="/materials#finishing">
            Finishing Construction
          </Menu.Item>
          <Menu.Item component={NavLink} to="/materials#civil">
            Civil Construction
          </Menu.Item>
          <Menu.Item component={NavLink} to="/materials#electro">
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

    {/* Burger (Right Side) */}
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

            <NavLink to="/materials" onClick={close} className={linkClasses}>
              Materials
            </NavLink>

            <NavLink to="/services" onClick={close} className={linkClasses}>
              Services
            </NavLink>

            <NavLink to="/contact" onClick={close} className={linkClasses}>
              Contact
            </NavLink>

          </div>
        </ScrollArea>
      </Drawer>
    </>
  );
}