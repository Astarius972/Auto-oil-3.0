import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { NAVIGATION_CARDS, navigationStyles } from "./navigation-data";

export function NavigationHub() {
  return (
    <section className={navigationStyles.section}>
      <div className="container-page max-w-6xl">
        <div className={navigationStyles.grid}>
          {NAVIGATION_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.title}
                href={card.href}
                className={navigationStyles.link}
              >
                <div className={navigationStyles.iconWrapper}>
                  <Icon className={navigationStyles.icon} />
                </div>

                <span className={navigationStyles.label}>
                  {card.subtitle}
                  <ArrowUpRight className={navigationStyles.arrow} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
