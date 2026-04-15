import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIChatBox from "@/components/AIChatBox";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Pillora",
    description: "Next-Gen Healthcare Platform",
    icons: {
        icon: "/favicon-96x96.png",
        shortcut: "/favicon.ico",
        apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Navbar />
                    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
                        {children}
                    </div>
                    <Footer />
                    <AIChatBox />
                </ThemeProvider>
            </body>
        </html>
    );
}
