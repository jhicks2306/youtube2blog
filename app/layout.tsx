import type { Metadata } from "next";
import { Inter as FontSans} from "next/font/google";
import "/styles/globals.css";
import Sidebar from "@/components/sidebar"

import { cn } from "@/lib/utils"
 
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

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
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>
        <div className="flex w-full flex-col bg-muted/40">
          <Sidebar/>
          {children}
        </div>
      </body>
    </html>
  );
}
