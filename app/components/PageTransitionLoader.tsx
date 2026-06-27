"use client";
import { useEffect, useState, useRef, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function TransitionLoaderInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(false);
  const prevPath = useRef(pathname + "");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const current = pathname + searchParams.toString();
    if (current === prevPath.current) return;
    prevPath.current = current;

    // Clear old timers
    if (timerRef.current) clearTimeout(timerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);

    // Start progress bar
    setActive(true);
    setProgress(10);

    let prog = 10;
    intervalRef.current = setInterval(() => {
      prog += Math.random() * 20 + 8;
      if (prog >= 90) {
        prog = 90;
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
      setProgress(prog);
    }, 100);

    // Complete after short delay
    timerRef.current = setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setProgress(100);
      setTimeout(() => {
        setActive(false);
        setProgress(0);
      }, 250);
    }, 400);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [pathname, searchParams]);

  if (!active && progress === 0) return null;

  return (
    /* ONLY a slim top progress bar — NO white overlay that causes blank page */
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0,
      height: 3,
      zIndex: 99999,
      pointerEvents: "none",
    }}>
      <div style={{
        height: "100%",
        width: `${progress}%`,
        background: "linear-gradient(90deg, #1a4d2e 0%, #4caf50 50%, #f4a228 100%)",
        borderRadius: "0 2px 2px 0",
        boxShadow: "0 0 8px rgba(76,175,80,0.5)",
        transition: progress === 100
          ? "width 0.2s ease, opacity 0.25s ease"
          : "width 0.12s ease",
        opacity: progress === 100 ? 0 : 1,
      }} />
    </div>
  );
}

export default function PageTransitionLoader() {
  return (
    <Suspense fallback={null}>
      <TransitionLoaderInner />
    </Suspense>
  );
}
