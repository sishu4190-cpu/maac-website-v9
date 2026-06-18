"use client";
import { motion } from "framer-motion";

const particles = [
  { id: 1, x: "7%",  y: "22%", size: 6, delay: 0,   dur: 7   },
  { id: 2, x: "16%", y: "68%", size: 4, delay: 1.5, dur: 9   },
  { id: 3, x: "26%", y: "42%", size: 7, delay: 0.8, dur: 6.5 },
  { id: 4, x: "73%", y: "26%", size: 5, delay: 2.1, dur: 8   },
  { id: 5, x: "84%", y: "58%", size: 7, delay: 0.4, dur: 10  },
  { id: 6, x: "58%", y: "74%", size: 4, delay: 1.2, dur: 7   },
  { id: 7, x: "91%", y: "18%", size: 5, delay: 3.0, dur: 9   },
  { id: 8, x: "44%", y: "84%", size: 4, delay: 0.6, dur: 8   },
  { id: 9, x: "36%", y: "12%", size: 3, delay: 1.8, dur: 11  },
  { id: 10, x: "79%", y: "42%", size: 4, delay: 2.5, dur: 7.5 },
];

export default function ChemicalParticles() {
  return (
    <div
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none", overflow: "hidden" }}
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            backgroundColor: "rgba(129,199,132,0.18)",
            border: "1px solid rgba(129,199,132,0.12)",
          }}
          animate={{ y: [0, -22, 0], opacity: [0.15, 0.22, 0.15] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
