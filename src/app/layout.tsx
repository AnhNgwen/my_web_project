import localFont from "next/font/local";
import "./globals.css";
const SVN = localFont({
  src: [
    {
      path: "../../public/fonts/SVN-Gilroy.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/SVN-Gilroy Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/SVN-GilroyMedium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/SVN-GilroySemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/SVN-GilroyBold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/SVN-Gilroy Bold Italic.otf",
      weight: "700",
      style: "italic",
    },
  ],
  display: "swap", // Tối ưu font loading
  preload: true, // Preload fonts quan trọng
  fallback: ["system-ui", "arial"], // Fallback fonts
  variable: "--font-svn", // CSS variable để sử dụng
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/fonts/SVN-Gilroy.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/SVN-GilroyMedium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/SVN-GilroyBold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className={SVN.className}>{children}</body>
    </html>
  );
}
