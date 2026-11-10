import LocaleLayout, { localeMetadata } from "@/components/LocaleLayout";

export const metadata = localeMetadata("zh");

export default function ChineseLayout({ children }: { children: React.ReactNode }) {
  return <LocaleLayout locale="zh">{children}</LocaleLayout>;
}
