"use client";

import { cn } from "@/lib/utils";
import { ElementRef, ReactNode, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

const MIN_WIDTH = 50;
const MAX_WIDTH = 240;

export const SidebarContainer = ({ children }: { children: ReactNode }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const [isResetting, setIsResetting] = useState(false);

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newWidth = e.clientX;

    if (newWidth < MIN_WIDTH) newWidth = MIN_WIDTH;
    if (newWidth > MAX_WIDTH) newWidth = MAX_WIDTH;

    if (sidebarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const resetWidth = () => {
    if (sidebarRef.current) {
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? "100%" : `${MIN_WIDTH}px`;
    }
    setTimeout(() => setIsResetting(false), 300);
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        style={{
          width: MAX_WIDTH + "px",
        }}
        className={cn(
          "h-full overflow-y-auto relative flex flex-col z-[99999]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <nav>{children}</nav>

        <div
          onClick={resetWidth}
          onMouseDown={handleMouseDown}
          className="transition cursor-ew-resize absolute h-full w-2 border-r-[1px] border-neutral-300 right-0 top-0"
        />
      </aside>
    </>
  );
};
