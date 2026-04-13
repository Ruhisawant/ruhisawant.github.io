import { useAtomValue } from "jotai";
import { pageAtom } from "./PageNavigation";

const bubblesConfig = {
  1: [
    {
      text: "Every pixel and interaction is intentional, designed to guide users toward clarity and engagement.",
      side: "left",
      position: "top",
    },
    {
      text: "I design marketing systems, product narratives, and portfolio experiences that feel clear and memorable.",
      side: "right",
      position: "center",
    },
  ],
  2: [
    {
      text: "Deep dives into campaign strategy, execution decisions, and measured impact.",
      side: "left",
      position: "center",
    },
    {
      text: "Data informs every decision, from campaign performance to user behavior and conversion optimization.",
      side: "right",
      position: "top",
    },
    {
      text: "Outcomes and learnings from real-world projects and experiments.",
      side: "right",
      position: "bottom",
    },
  ],
};

const positionMap = {
  top: "top-[20%]",
  center: "top-1/2 -translate-y-1/2",
  bottom: "bottom-[20%]",
};

const Bubble = ({ text, side, position }) => {
  const positionClass = positionMap[position] || positionMap.center;
  const sideClass = side === "left" ? "left-0" : "right-0";

  return (
    <div
      className={`pointer-events-none fixed ${sideClass} z-20 flex px-4 sm:px-6 lg:px-10 ${positionClass}`}
    >
      <div className="rounded-full border border-white/30 bg-black/30 px-6 py-4 text-white transition-all duration-300 animate-fade-in max-w-xs">
        <p className="text-sm leading-relaxed text-white/90">{text}</p>
      </div>
    </div>
  );
};

export const PageBubbles = () => {
  const page = useAtomValue(pageAtom);
  const bubbles = bubblesConfig[page];

  if (!bubbles) {
    return null;
  }

  return (
    <>
      {bubbles.map((bubble, index) => (
        <Bubble key={index} {...bubble} />
      ))}
    </>
  );
};