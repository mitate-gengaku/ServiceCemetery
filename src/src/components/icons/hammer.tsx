import { HammerIcon } from "lucide-react";
import React from "react";

export const Hammer = ({ style, ...props }: React.ComponentProps<"svg">) => {
  return (
    <HammerIcon
      {...props}
      style={{
        ...style,
        animation: 'hammerStrikeFast 0.5s ease-in-out infinite',
        transformOrigin: '50% 100%',
        transform: 'scaleX(-1)',
      }}
    />
  );
}