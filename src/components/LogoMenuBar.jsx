import { useState } from "react";

const defaultMenuItems = [
  { label: "Home", href: "#/", shortLabel: "H" },
  { label: "Resume", href: "#/resume", shortLabel: "R" },
  { label: "Case Studies", href: "#/case-studies", shortLabel: "C" },
  { label: "Blog", href: "#/blog", shortLabel: "B" },
  { label: "Contact", href: "#/contact", shortLabel: "@" },
];

export const LogoMenuBar = ({
  logoSrc = "/background/logo.png",
  logoAlt = "Logo",
  menuItems = defaultMenuItems,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="pointer-events-auto mt-10 ml-10 relative w-fit">
      <button
        className="group w-20 h-20 overflow-hidden transition-transform duration-300 hover:scale-105"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label="Toggle menu"
      >
        <img className="w-full h-full object-cover" src={logoSrc} alt={logoAlt} />
      </button>

      <div className="absolute left-1/2 -translate-x-1/2 top-24 flex flex-col items-center gap-3">
        {menuItems.map((item, index) => (
          <a
            key={item.label}
            href={item.href}
            onClick={() => setIsOpen(false)}
            className={`h-11 w-11 flex items-center justify-center rounded-full text-sm uppercase border transition-all duration-300 ${
              isOpen
                ? "opacity-100 translate-y-0 scale-100 bg-white/90 text-black border-transparent"
                : "opacity-0 -translate-y-2 scale-75 bg-black/30 text-white border-white/30 pointer-events-none"
            }`}
            style={{ transitionDelay: `${isOpen ? index * 60 : 0}ms` }}
            title={item.label}
            aria-label={item.label}
          >
            <span>{item.shortLabel ?? item.label[0]}</span>
          </a>
        ))}
      </div>
    </div>
  );
};
