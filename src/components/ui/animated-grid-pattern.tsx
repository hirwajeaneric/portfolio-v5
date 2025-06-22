"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface Square {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
}

interface AnimatedGridPatternProps {
  className?: string;
  squares?: number;
  duration?: number;
}

export default function AnimatedGridPattern({
  className = "",
  squares = 20,
  duration = 3000,
}: AnimatedGridPatternProps) {
  const [squaresList, setSquaresList] = useState<Square[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const generateSquares = useCallback(() => {
    const newSquares: Square[] = [];
    for (let i = 0; i < squares; i++) {
      newSquares.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 20 + 10,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }
    return newSquares;
  }, [squares]);

  useEffect(() => {
    setSquaresList(generateSquares());
  }, [generateSquares]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          } else {
            entry.target.classList.remove("animate");
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      setSquaresList(generateSquares());
    }, duration);

    return () => clearInterval(interval);
  }, [duration, generateSquares]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
    >
      {squaresList.map((square) => (
        <div
          key={square.id}
          className="absolute bg-current opacity-20 transition-all duration-1000 ease-in-out"
          style={{
            left: `${square.x}%`,
            top: `${square.y}%`,
            width: `${square.size}px`,
            height: `${square.size}px`,
            opacity: square.opacity,
          }}
        />
      ))}
    </div>
  );
}
