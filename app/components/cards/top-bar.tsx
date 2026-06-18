import { Globe } from "lucide-react";
import { TOP_BAR_CONTACTS, topBarStyles } from "./top-bar-data";

export function TopBar() {
  return (
    <div className={topBarStyles.bar}>
      <div className={topBarStyles.container}>
        <div className={topBarStyles.contacts}>
          {TOP_BAR_CONTACTS.map((contact) => {
            const Icon = contact.icon;
            return (
              <a
                key={contact.label}
                href={contact.href}
                className={topBarStyles.contactLink}
              >
                <Icon className={topBarStyles.icon} />
                <span>{contact.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
