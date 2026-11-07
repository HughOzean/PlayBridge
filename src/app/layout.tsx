import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PlayBridge — A familiar drive. A new connection.",
  description: "Meet PlayBridge, an experimental Android bridge for phone-based car interfaces, wireless CarPlay head units and compatible Windows receivers. Explore the concept, setup and testing status.",
  robots: { index: false, follow: true },
  icons: { icon: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/icon.svg` },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
