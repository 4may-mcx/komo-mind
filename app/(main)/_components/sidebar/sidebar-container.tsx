"use client";

import { cn } from "@/lib/utils";
import { ElementRef, ReactNode, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

const MIN_WIDTH = 50;
const MAX_WIDTH = 240;
const MIN_RESIZE_WIDTH = 80;
const MAX_RESIZE_WIDTH = 180;

export const SidebarContainer = ({ children }: { children: ReactNode }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const isResizingRef = useRef(false);
  const resizeStateRef = useRef({
    width: MAX_WIDTH,
    increasing: false,
    decreasing: true,
  });
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const [isResetting, setIsResetting] = useState(false);

  const handleResizingPeriod = () => {
    setIsResetting(true);
    setTimeout(() => setIsResetting(false), 300);
  };

  const updateResizeState = (newWidth: number) => {
    const { width } = resizeStateRef.current;
    const increasing = newWidth > width;
    const decreasing = newWidth < width;
    resizeStateRef.current = {
      width: newWidth,
      increasing,
      decreasing,
    };
  };

  const adjustWidth = (newWidth: number) => {
    const { increasing, decreasing } = resizeStateRef.current;

    if (newWidth < MIN_WIDTH) newWidth = MIN_WIDTH;
    if (newWidth > MAX_WIDTH) newWidth = MAX_WIDTH;

    if (newWidth < MAX_RESIZE_WIDTH && newWidth > MIN_RESIZE_WIDTH) {
      isResizingRef.current = false;
      if (decreasing) {
        newWidth = MIN_WIDTH;
      }
      if (increasing) {
        newWidth = MAX_WIDTH;
      }
      handleResizingPeriod();
    }

    return newWidth;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newWidth = e.clientX;

    updateResizeState(newWidth);

    if (sidebarRef.current) {
      sidebarRef.current.style.width = `${adjustWidth(newWidth)}px`;
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
      handleResizingPeriod();

      const currentWidth = sidebarRef.current.style.width;
      if (currentWidth === MIN_WIDTH + "px") {
        sidebarRef.current.style.width = MAX_WIDTH + "px";
      } else {
        sidebarRef.current.style.width = isMobile ? "100%" : `${MIN_WIDTH}px`;
      }
    }
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        style={{
          width: MAX_WIDTH + "px",
        }}
        className={cn(
          "h-full overflow-y-auto relative flex flex-col",
          isResetting && "transition-all ease-in-out duration-200",
          isMobile && "w-0"
        )}
      >
        <nav>{children}</nav>

        <div
          onClick={resetWidth}
          onMouseDown={handleMouseDown}
          className="flex items-center transition absolute h-full cursor-ew-resize w-2 border-r-[1px] border-neutral-300 right-0 top-0"
        >
          {/* 考虑往这里加个icon方便拖拽，然后去掉上面的w-2 */}
        </div>
      </aside>
    </>
  );
};
