"use client";

import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

import { routing } from "@/libs/routing";
import "./LanguageSwitcher.scss";

const FlagIcon = ({
  code,
  size = 24,
}: {
  code: "vi" | "en";
  size?: number;
}) => {
  const width = size;
  const height = Math.round((size * 2) / 3); // 3:2 ratio
  if (code === "vi") {
    // Vietnam flag: red background with yellow star
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 16"
        aria-label="Vietnam"
        style={{ borderRadius: 2, display: "block" }}
      >
        <rect width="24" height="16" fill="#DA251D" />
        <polygon
          points="12,4 13.763,9.09 9,6.18 15,6.18 10.237,9.09"
          fill="#FFDF00"
          transform="translate(0,1)"
        />
      </svg>
    );
  }
  // English (use simplified UK-style flag icon)
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 16"
      aria-label="English"
      style={{ borderRadius: 2, display: "block" }}
    >
      <rect width="24" height="16" fill="#012169" />
      <path d="M0 0 L24 16 M24 0 L0 16" stroke="#FFFFFF" strokeWidth="3" />
      <path d="M0 0 L24 16 M24 0 L0 16" stroke="#C8102E" strokeWidth="1.5" />
      <rect x="10" width="4" height="16" fill="#FFFFFF" />
      <rect y="6" width="24" height="4" fill="#FFFFFF" />
      <rect x="11" width="2" height="16" fill="#C8102E" />
      <rect y="7" width="24" height="2" fill="#C8102E" />
    </svg>
  );
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    const pathnameWithoutLocale = pathname?.replace(`/${locale}`, "") || "";
    router.push(`/${newLocale}${pathnameWithoutLocale}`);
  };

  const localeNames: Record<string, string> = {
    vi: "Tiếng Việt",
    en: "English",
  };

  const menuItems: MenuProps["items"] = routing.locales.map((loc) => ({
    key: loc,
    label: (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <FlagIcon code={loc as "vi" | "en"} size={20} />
        <span>{localeNames[loc]}</span>
      </div>
    ),
    onClick: () => switchLocale(loc),
  }));

  return (
    <Dropdown
      menu={{ items: menuItems }}
      placement="bottomRight"
      trigger={["click"]}
    >
      <div
        className="language-switcher"
        style={{ display: "flex", alignItems: "center" }}
      >
        <FlagIcon code={locale as "vi" | "en"} />
      </div>
    </Dropdown>
  );
}
