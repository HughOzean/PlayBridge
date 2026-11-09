import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PlayBridge — 熟悉的车载界面，连接新的屏幕",
  description: "了解 PlayBridge 实验性 Android 桥接应用：探索手机车载界面与无线 CarPlay 车机、兼容 Windows 接收端之间的视频、音频和触控转发方案，查看安装要求、测试状态并下载 APK。",
  robots: { index: false, follow: true },
  icons: { icon: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/icon.svg` },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
