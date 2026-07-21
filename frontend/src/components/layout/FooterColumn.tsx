// A single column in the footer grid — heading + list of links or free-form content.
// Used by Footer.tsx to build the multi-column layout without repeating markup.

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumnProps {
  title: string;
  links?: FooterLink[];
  children?: React.ReactNode;
}

export default function FooterColumn({ title, links, children }: FooterColumnProps) {
  return (
    <div>
      <h3 className="text-xs font-semibold text-white uppercase tracking-widest mb-4">
        {title}
      </h3>

      {links ? (
        <ul className="space-y-2">
          {links.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm text-stone-400 hover:text-brand-secondary transition-colors duration-200"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-sm text-stone-400 space-y-2">{children}</div>
      )}
    </div>
  );
}
