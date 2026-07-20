import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Scrolls to the element matching the current route's #hash. Extracted from
// HelpPage's original FAQ-anchor behavior so HomePage can reuse it for the
// "Nasıl Çalışır?" nav anchor without duplicating the effect.
export function useHashScroll() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [hash]);
}
