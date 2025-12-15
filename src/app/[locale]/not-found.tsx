import NotFound from "@/components/NotFound";

export default function LocaleNotFound() {
  // Sử dụng default locale cho not-found page
  const locale = "vi";

  return <NotFound locale={locale} showBackButton={true} />;
}
