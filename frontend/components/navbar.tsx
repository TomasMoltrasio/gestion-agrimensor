import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import Link from "next/link";

import { ThemeSwitch } from "@components/theme-switch";
import BtnSesion from "./BtnSesion";

export const Navbar = () => {
  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-0 sm:basis-1/3">
        <Link className="text-xl md:text-2xl font-medium" href="/">
          Meridiano Agrimensura
        </Link>
      </NavbarContent>
      <NavbarContent
        className="hidden sm:flex basis-0 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2 ">
          <BtnSesion />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-0 pl-4" justify="end">
        <BtnSesion />
      </NavbarContent>
    </NextUINavbar>
  );
};
