"use client";
import { useEffect } from "react";

export const useCustomCursor = () => {
  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = document.getElementById("fluence-cursor");
    if (!cursor) return;

    let animationFrameId: number;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const updateCursor = () => {
      cursor.style.transform = `translate3d(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%), 0)`;
      animationFrameId = requestAnimationFrame(updateCursor);
    };
    updateCursor();

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Elements that trigger the cursor state
    const interactiveSelectors = "a, button, .cursor-interact, .cursor-start, .cursor-view, .cursor-select, .cursor-play, .cursor-pause, .cursor-return";

    const onMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(interactiveSelectors);

      if (target) {
        cursor.classList.add("active");
        let text = "";

        // Determine context-specific text
        if (target.closest(".cursor-start")) text = "START";
        else if (target.closest(".cursor-view")) text = "VIEW";
        else if (target.closest(".cursor-select")) text = "SELECT";
        else if (target.closest(".cursor-think")) text = "THINK";
        else if (target.closest(".cursor-pause")) text = "PAUSE";
        else if (target.closest(".cursor-back")) text = "RETURN";
          else if (target.closest(".cursor-skip")) text = "SKIP";
          else if (target.closest(".cursor-mute")) text = "MUTE";
          else if (target.closest(".cursor-forward")) text = "NEXT";
          else if (target.closest(".cursor-backward")) text = "BACK";
          else if (target.closest(".cursor-goto")) text = "GOTO";
          else if (target.closest(".cursor-answer")) text = "ANSWER";
          else if (target.closest(".cursor-search")) text = "SEARCH";
        
        if (text) {
          cursor.setAttribute("data-text", text);
        } else {
          cursor.removeAttribute("data-text"); // Clean hover circle for generic links
        }
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(interactiveSelectors);
      if (target) {
        cursor.classList.remove("active");
        cursor.removeAttribute("data-text");
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, []);
};