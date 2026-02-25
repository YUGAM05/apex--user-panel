import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIChatBox from "@/components/AIChatBox";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "E-Pharmacy & Blood Bank",
    description: "Next-Gen Healthcare Platform",
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
