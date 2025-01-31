import { AuthProvider } from "@/providers/AuthContextProvider";
import QueryProvider from "@/providers/QueryProvider";
import { ReceiverContextProvider } from "@/providers/ReceiverContextProvider";
import type { Metadata } from "next";
import { Albert_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SocketProvider } from "@/providers/SocketProvider";

const albertSans = Albert_Sans({
  variable: "--font-albert",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <ReceiverContextProvider>
          <QueryProvider>
            <SocketProvider>
              <body className={`${albertSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
            </SocketProvider>
          </QueryProvider>
        </ReceiverContextProvider>
      </AuthProvider>
    </html>
  );
}
