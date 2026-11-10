import type { Metadata } from "next";
import "@/app/globals.css";

export function localeMetadata(locale: "en" | "zh"): Metadata {
  return {
    title: locale === "zh"
      ? "PlayBridge — 熟悉的车载界面，连接新的屏幕"
      : "PlayBridge — A familiar drive. A new connection.",
    description: locale === "zh"
      ? "了解 PlayBridge 实验性 Android 桥接应用：探索手机车载界面与无线 CarPlay 车机、兼容 Windows 接收端之间的视频、音频和触控转发方案，查看安装要求并下载 APK。"
      : "Meet PlayBridge, an experimental Android bridge for phone-based car interfaces, wireless CarPlay head units and compatible Windows receivers. Explore the concept, setup requirements and APK download.",
    robots: { index: false, follow: true },
    icons: { icon: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/icon.svg` },
  };
}

export default function LocaleLayout({ locale, children }: {
  locale: "en" | "zh";
  children: React.ReactNode;
}) {
  return <html lang={locale === "zh" ? "zh-CN" : "en"}><body>{children}</body></html>;
}
