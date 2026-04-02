"use client"

import { NextUIProvider } from "@nextui-org/react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return (
        <NextUIProvider>
            <NextThemesProvider {...props} defaultTheme="dark" forcedTheme="dark">
                {children}
            </NextThemesProvider>
        </NextUIProvider>
    )
}
