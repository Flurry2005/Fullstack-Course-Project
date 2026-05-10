import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const start = window.scrollY;
    const duration = 300;

    let startTime: number | null = null;
    let animationFrame: number;

    let cancelled = false;

    const cancelScroll = () => {
      cancelled = true;
      cancelAnimationFrame(animationFrame);
    };

    window.addEventListener("wheel", cancelScroll);
    window.addEventListener("touchstart", cancelScroll);

    const animateScroll = (currentTime: number) => {
      if (cancelled) return;

      if (!startTime) startTime = currentTime;

      const progress = currentTime - startTime;

      const ease = 1 - Math.pow(1 - progress / duration, 3);

      window.scrollTo(0, start * (1 - ease));

      if (progress < duration) {
        animationFrame = requestAnimationFrame(animateScroll);
      }
    };

    animationFrame = requestAnimationFrame(animateScroll);

    return () => {
      cancelAnimationFrame(animationFrame);

      window.removeEventListener("wheel", cancelScroll);
      window.removeEventListener("touchstart", cancelScroll);
    };
  }, [pathname]);

  return null;
}
