import LocaleLayout, { localeMetadata } from "@/components/LocaleLayout";

export const metadata = localeMetadata("en");

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <LocaleLayout locale="en">{children}</LocaleLayout>;
}
