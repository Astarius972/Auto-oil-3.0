import Link from "next/link";
import { AutoOilLogo } from "../icons";
import { HEADER_NAV_LINKS, headerStyles } from "./header-navigation-data";

export function MainHeader() {
  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.container}>
        <Link href="/" aria-label="Auto Oil Home">
          <AutoOilLogo />
        </Link>
        <nav className={headerStyles.nav}>
          {HEADER_NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={headerStyles.link}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
