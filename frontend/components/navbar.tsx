import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import Link from "next/link";

import { ThemeSwitch } from "@components/theme-switch";

export const Navbar = () => {
  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-0 sm:basis-1/3">
        <Link className="text-xl md:text-2xl font-medium" href="/">
          Sistema de gestión
        </Link>
      </NavbarContent>
      <NavbarContent
        className="hidden sm:flex basis-0 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-0 pl-4" justify="end">
        <ThemeSwitch />
      </NavbarContent>
    </NextUINavbar>
  );
};
