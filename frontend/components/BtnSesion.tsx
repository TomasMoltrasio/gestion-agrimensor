"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
  Avatar,
} from "@nextui-org/react";
import { ThemeSwitch } from "./theme-switch";

export default function BtnSesion() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <Dropdown placement="bottom-start">
          <DropdownTrigger>
            <User
              as="button"
              avatarProps={{
                isBordered: true,
                src: session.user?.image as string,
              }}
              className="transition-transform md:inline-flex hidden"
              description={session.user?.email as string}
              name={session.user?.name as string}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="User Actions" variant="flat">
            <DropdownItem key="theme" className="w-full">
              <ThemeSwitch />
            </DropdownItem>
            <DropdownItem
              onClick={() => signOut()}
              key="logout"
              color="danger"
              className="text-danger"
            >
              Cerrar sesión
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown placement="bottom-start">
          <DropdownTrigger>
            <Avatar
              as="button"
              src={session.user?.image as string}
              isBordered
              className="transition-transform block md:hidden"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="User Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">{session.user?.name}</p>
              <p className="font-semibold">{session.user?.email}</p>
            </DropdownItem>
            <DropdownItem key="theme" className="w-full">
              <ThemeSwitch />
            </DropdownItem>
            <DropdownItem
              onClick={() => signOut()}
              key="logout"
              color="danger"
              className="text-danger"
            >
              Cerrar sesión
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </>
    );
  }

  return (
    <button onClick={() => signIn("google")}>Iniciar sesión con Google</button>
  );
}
