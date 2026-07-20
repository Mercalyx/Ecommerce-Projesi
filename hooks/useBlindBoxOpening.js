import { useEffect, useRef, useState } from "react";
import { selectWeightedFigure } from "../utils/weightedRandom";

const NORMAL_TIMING = { shake: 900, crack: 700, open: 500, settle: 600 };
const REDUCED_TIMING = { shake: 100, crack: 80, open: 0, settle: 100 };

// Drives the idle -> shaking -> cracking -> opening -> revealing -> completed
// animation sequence shared by every blind box collection. Timing shortens
// under reduced motion but the phase graph itself never changes shape.
export function useBlindBoxOpening({ reducedMotion = false } = {}) {
  const [phase, setPhase] = useState("idle");
  const [selectedFigure, setSelectedFigure] = useState(null);
  const timeoutsRef = useRef([]);

  function schedule(fn, delay) {
    timeoutsRef.current.push(setTimeout(fn, delay));
  }

  function clearAllTimeouts() {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }

  function start(figures) {
    clearAllTimeouts(); // makes rapid re-trigger ("Tekrar Dene") safe
    setSelectedFigure(null);
    setPhase("shaking");

    const t = reducedMotion ? REDUCED_TIMING : NORMAL_TIMING;
    schedule(() => setPhase("cracking"), t.shake);
    schedule(() => setPhase("opening"), t.shake + t.crack);
    schedule(() => {
      setSelectedFigure(selectWeightedFigure(figures));
      setPhase("revealing");
    }, t.shake + t.crack + t.open);
    schedule(() => setPhase("completed"), t.shake + t.crack + t.open + t.settle);
  }

  function reset() {
    clearAllTimeouts();
    setPhase("idle");
    setSelectedFigure(null);
  }

  useEffect(() => clearAllTimeouts, []);

  return { phase, selectedFigure, start, reset };
}
