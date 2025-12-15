import { redirect } from "next/navigation";

import { routing } from "@/libs/routing";

export default function LocalePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as "vi" | "en")) {
    redirect(`/${routing.defaultLocale}/login`);
  }

  // Redirect to public home page
  redirect(`/${locale}/login`);
}
