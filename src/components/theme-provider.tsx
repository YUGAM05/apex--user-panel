"use client";

import * as React from "react";
// Import the main provider and the types from the root of the package
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  );
}