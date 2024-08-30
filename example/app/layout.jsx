"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { AdProvider } from "adbase-package";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AdProvider
          region={"na-3"}
          dev_wallet_address={"0x91ada5d0a2165a50233ab8db09f7308309d51fad"}
        >
          {children}
        </AdProvider>
      </body>
    </html>
  );
}
