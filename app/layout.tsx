import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
// import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const montserrat = Montserrat({
    subsets: ["latin"],
    display: "swap",
});
// const geistSans = localFont({
//     src: "./fonts/GeistVF.woff",
//     variable: "--font-geist-sans",
//     weight: "100 900",
// });
// const geistMono = localFont({
//     src: "./fonts/GeistMonoVF.woff",
//     variable: "--font-geist-mono",
//     weight: "100 900",
// });

export const metadata: Metadata = {
    title: "Noterfine",
    description: "Work in progress",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={montserrat.className}>
            <body className={` antialiased dark`}>
                {children}
                <Toaster />
            </body>
        </html>
    );
}
