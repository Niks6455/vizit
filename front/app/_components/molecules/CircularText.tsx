"use client";

import React, { useEffect } from "react";
import {
  motion,
  useAnimation,
  useMotionValue,
  MotionValue,
  Transition,
} from "motion/react";

type CircularTextHover = "slowDown" | "speedUp" | "pause" | "goBonkers";

interface CircularTextProps {
  text: string;
  spinDuration?: number;
  onHover?: CircularTextHover | "";
  className?: string;
  size?: number;
  letterClassName?: string;
}

const getRotationTransition = (
  duration: number,
  from: number,
  loop: boolean = true,
) => ({
  from,
  to: from + 360,
  ease: "linear" as const,
  duration,
  type: "tween" as const,
  repeat: loop ? Infinity : 0,
});

const getTransition = (duration: number, from: number) => ({
  rotate: getRotationTransition(duration, from),
  scale: {
    type: "spring" as const,
    damping: 20,
    stiffness: 300,
  },
});

const CircularText: React.FC<CircularTextProps> = ({
  text,
  spinDuration = 20,
  onHover,
  className = "",
  size = 220,
  letterClassName = "",
}) => {
  const letters = Array.from(text);
  const controls = useAnimation();
  const rotation: MotionValue<number> = useMotionValue(0);

  useEffect(() => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start),
    });
  }, [spinDuration, text, onHover, controls]);

  const handleHoverStart = () => {
    const start = rotation.get();

    if (!onHover) return;

    let transitionConfig: ReturnType<typeof getTransition> | Transition;
    let scaleVal = 1;

    switch (onHover) {
      case "slowDown":
        transitionConfig = getTransition(spinDuration * 2, start);
        break;
      case "speedUp":
        transitionConfig = getTransition(spinDuration / 4, start);
        break;
      case "pause":
        transitionConfig = {
          rotate: { type: "spring", damping: 20, stiffness: 300 },
          scale: { type: "spring", damping: 20, stiffness: 300 },
        };
        break;
      case "goBonkers":
        transitionConfig = getTransition(spinDuration / 20, start);
        scaleVal = 0.8;
        break;
      default:
        transitionConfig = getTransition(spinDuration, start);
    }

    controls.start({
      rotate: start + 360,
      scale: scaleVal,
      transition: transitionConfig,
    });
  };

  const handleHoverEnd = () => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start),
    });
  };

  return (
    <motion.div
      className={[
        "m-0 rounded-full relative text-center cursor-pointer origin-center select-none",
        className,
      ].join(" ")}
      style={{ rotate: rotation, width: size, height: size }}
      initial={{ rotate: 0 }}
      animate={controls}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      {letters.map((letter, i) => {
        const rotationDeg = (360 / letters.length) * i;
        const factor = Math.PI / letters.length;
        const x = factor * i;
        const y = factor * i;
        const transform = `rotateZ(${rotationDeg}deg) translate3d(${x}px, ${y}px, 0)`;

        return (
          <span
            key={i}
            className={[
              "absolute inset-0 inline-block font-semibold tracking-[0.24em]",
              "text-[16px] text-(--muted-2)",
              "transition-all duration-500 ease-[cubic-bezier(0,0,0,1)]",
              letterClassName,
            ].join(" ")}
            style={{ transform, WebkitTransform: transform }}
          >
            {letter}
          </span>
        );
      })}
    </motion.div>
  );
};

export default CircularText;
