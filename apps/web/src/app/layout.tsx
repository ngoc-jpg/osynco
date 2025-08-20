import type { Metadata, Viewport } from "next"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"
import { NuqsAdapter } from "nuqs/adapters/next/app"

import { cn } from "@osynco/ui"
import { Toaster } from "@osynco/ui/sonner"
import { ThemeProvider, ThemeToggle } from "@osynco/ui/theme"

import { TRPCReactProvider } from "~/trpc/react"

import "~/app/globals.css"

import { env } from "~/env"

export const metadata: Metadata = {
    metadataBase: new URL(env.VERCEL_ENV === "production" ? env.NEXT_PUBLIC_PROD_URL : env.NEXT_PUBLIC_BASE_URL),
    title: "OSYNCO",
    description: "Description.",
    icons: {
        icon: "/icon-rounded-512.png"
    },
    openGraph: {
        title: "OSYNCO",
        description: "Description.",
        url: env.VERCEL_ENV === "production" ? env.NEXT_PUBLIC_PROD_URL : env.NEXT_PUBLIC_BASE_URL,
        siteName: "OSYNCO"
    },
    twitter: {
        card: "summary_large_image",
        site: "@osynco",
        creator: "@osynco"
    }
}

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "hsl(var(--background))" },
        { media: "(prefers-color-scheme: dark)", color: "hsl(var(--background))" }
    ],
    maximumScale: 1
}

export default function RootLayout(props: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={cn("bg-background font-sans text-foreground antialiased", GeistSans.variable, GeistMono.variable)}>
                <NuqsAdapter>
                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                        <TRPCReactProvider>{props.children}</TRPCReactProvider>
                        <div className="fixed bottom-4 right-4 z-10">
                            <ThemeToggle />
                        </div>

                        <Toaster />
                    </ThemeProvider>
                </NuqsAdapter>
            </body>
        </html>
    )
}
