import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { LogoMenuBar } from "./LogoMenuBar";

const pictures = [
  "about-me-cover",
  "about-me",
  "marketing-projects",
  "coding-projects",
  "skills",
  "contact-me",
];

export const pageAtom = atom(0);
export const pages = buildPagesArray(pictures);

function buildPagesArray(pictures) {
  const pagesArray = [
    {
      front: "book-cover",
      back: pictures[0],
    },
  ];

  // Pair consecutive pictures (front and back of each page)
  for (let i = 1; i < pictures.length - 1; i += 2) {
    pagesArray.push({
      front: pictures[i % pictures.length],
      back: pictures[(i + 1) % pictures.length],
    });
  }
  pagesArray.push({
    front: pictures[pictures.length - 1],
    back: "book-back",
  });

  return pagesArray;
}

// Navigation panel
export const PageNavigation = () => {
  const [page, setPage] = useAtom(pageAtom);

  // Play page flip sound effect when page changes
  useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.userActivation?.hasBeenActive) {
      return;
    }

    const audio = new Audio("/audios/page-flip.mp3");
    audio.play().catch((error) => {
      if (error?.name !== "NotAllowedError") {
        console.warn("Audio playback failed:", error.message);
      }
    });
  }, [page]);

  return (
    <main className="pointer-events-none select-none z-10 fixed inset-0 flex justify-between flex-col">
      {/* Logo */}
      <LogoMenuBar />

      {/* Page Navigation Buttons */}
      <div className="w-full overflow-auto pointer-events-auto flex justify-center">
        <div className="overflow-auto flex items-center gap-4 max-w-full p-10">
          {/* Render button for each page */}
          {pages.map((_, index) => (
            <NavButton
              key={index}
              index={index}
              isActive={index === page}
              onClick={() => setPage(index)}
              label={index === 0 ? "Cover" : `Page ${index}`}
            />
          ))}

          {/* Back Cover Button */}
          <NavButton
            isActive={page === pages.length}
            onClick={() => setPage(pages.length)}
            label="Back Cover"
          />
        </div>
      </div>
    </main>
  );
};

// Individual navigation button component
function NavButton({ isActive, onClick, label }) {
  const baseStyles = "border-transparent hover:border-white transition-all duration-300 px-4 py-3 rounded-full text-lg uppercase shrink-0 border";
  const activeStyles = isActive
    ? "bg-white/90 text-black"
    : "bg-black/30 text-white";

  return (
    <button
      className={`${baseStyles} ${activeStyles}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

// Export for backwards compatibility
export const UI = PageNavigation;