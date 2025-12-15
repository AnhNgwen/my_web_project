import { redirect } from "next/navigation";

import { routing } from "@/libs/routing";

// This page only renders when the user visits the root URL
export default function RootPage() {
  // Redirect to the default locale public home page
  redirect(`/${routing.defaultLocale}/user`);
}
