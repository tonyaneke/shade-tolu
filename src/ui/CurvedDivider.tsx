"use client";

import { FC } from "react";

interface CurvedDividerProps {
  flip?: boolean;
  color?: string;
  className?: string;
}

export const CurvedDivider: FC<CurvedDividerProps> = ({
  flip = false,
  color = "fill-white",
  className = "",
}) => {
  return (
    <div className={`w-full ${flip ? "rotate-180" : ""} ${className}`}>
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
        preserveAspectRatio="none"
      >
        <path
          d="M0 0C240 40 480 80 720 80C960 80 1200 40 1440 0V120H0V0Z"
          className={color}
        />
      </svg>
    </div>
  );
};

export const WaveDivider: FC<CurvedDividerProps> = ({
  flip = false,
  color = "fill-white",
  className = "",
}) => {
  return (
    <div className={`w-full ${flip ? "rotate-180" : ""} ${className}`}>
      <svg
        viewBox="0 0 1440 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
        preserveAspectRatio="none"
      >
        <path
          d="M0 50C120 20 240 0 360 0C480 0 600 20 720 20C840 20 960 0 1080 0C1200 0 1320 20 1440 50V100H0V50Z"
          className={color}
        />
      </svg>
    </div>
  );
};

export const BlobDivider: FC<CurvedDividerProps> = ({
  flip = false,
  color = "fill-white",
  className = "",
}) => {
  return (
    <div className={`w-full ${flip ? "rotate-180" : ""} ${className}`}>
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
        preserveAspectRatio="none"
      >
        <path
          d="M0 0C120 60 360 100 600 80C840 60 1080 20 1320 40C1360 45 1400 50 1440 55V120H0V0Z"
          className={color}
        />
      </svg>
    </div>
  );
};
