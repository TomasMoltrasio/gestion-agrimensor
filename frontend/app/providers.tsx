"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { FormProvider } from "@context/FormContext";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { SessionProvider } from "next-auth/react";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>
        <SessionProvider>
          <FormProvider>{children}</FormProvider>
        </SessionProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
