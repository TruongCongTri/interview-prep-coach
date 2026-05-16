"use client";
import { useCustomCursor } from '@/hooks/useCustomCursor'
import React from 'react'

export function CustomCursor() {
  // Initialize the cursor logic
  useCustomCursor();

  return (
    <div 
      id="fluence-cursor" 
      className="pointer-events-none fixed left-0 top-0 z-[99999] hidden items-center justify-center rounded-full md:flex"
    ></div>
  );
}
