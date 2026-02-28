import React from "react";

export const HoverCard: React.FC<React.PropsWithChildren<Record<string, unknown>>> = ({ children }) => (
  <div className="relative overflow-hidden rounded-xl shadow-lg group cursor-pointer">
    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 z-10"></div>

    <div className="group-hover:scale-110 transition-transform duration-700">{children}</div>

    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-xl">▶</div>
    </div>
  </div>
);