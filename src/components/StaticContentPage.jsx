const pageCopy = {
  resume: {
    title: "Resume",
    description: "A concise overview of my experience, core strengths, and project outcomes.",
  },
  "case-studies": {
    title: "Case Studies",
    description: "Deep dives into campaign strategy, execution decisions, and measured impact.",
  },
  blog: {
    title: "Blog",
    description: "Thoughts on marketing, growth experiments, and building digital products.",
  },
  contact: {
    title: "Contact",
    description: "Let us collaborate on a campaign, product launch, or growth roadmap.",
  },
};

function getPageData(route) {
  const key = route.replace(/^\//, "");
  return (
    pageCopy[key] || {
      title: "Page Not Found",
      description: "The page you requested does not exist in this portfolio yet.",
    }
  );
}

export const StaticContentPage = ({ route }) => {
  const page = getPageData(route);

  return (
    <section className="fixed inset-0 z-10 pointer-events-none flex items-center justify-center px-6">
      <article className="pointer-events-auto w-full max-w-2xl rounded-3xl border border-white/20 bg-black/55 backdrop-blur-md p-8 sm:p-10 text-white shadow-2xl">
        <p className="text-xs uppercase tracking-[0.25em] text-white/70 mb-3">Portfolio Page</p>
        <h1 className="text-4xl sm:text-5xl font-semibold mb-4">{page.title}</h1>
        <p className="text-white/80 leading-relaxed text-base sm:text-lg">{page.description}</p>

        <div className="mt-8">
          <a
            href="#/"
            className="inline-flex items-center justify-center rounded-full border border-transparent bg-white/90 text-black px-5 py-3 uppercase text-sm tracking-wide transition-colors hover:bg-white"
          >
            Back To Book
          </a>
        </div>
      </article>
    </section>
  );
};
