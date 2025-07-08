'use client';

import { useCallback } from 'react';

interface SnapNavigationProps {
  currentSnap: number;
  snapCount: number;
  onSnapChange: (snapIndex: number) => void;
}

const snapTitles = [
  'Rotating Torus',
  'Pulsating Sphere', 
  'Dancing Cube',
  'Spiraling Dodecahedron'
];

const snapDescriptions = [
  'Classic rotating geometry with smooth animations',
  'Dynamic scaling sphere with floating movement',
  'Multi-axis rotating cube with position dancing',
  'Complex geometry with spiral motion patterns'
];

export default function SnapNavigation({ currentSnap, snapCount, onSnapChange }: SnapNavigationProps) {
  const handleSnapClick = useCallback((index: number) => {
    onSnapChange(index);
  }, [onSnapChange]);

  return (
    <>
      {/* Snap Indicators */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-20 space-y-4">
        {Array.from({ length: snapCount }, (_, index) => (
          <button
            key={index}
            onClick={() => handleSnapClick(index)}
            className={`w-4 h-4 rounded-full border-2 transition-all duration-300 hover:scale-125 ${
              index === currentSnap
                ? 'bg-white border-white'
                : 'bg-transparent border-white/50 hover:border-white/80'
            }`}
            aria-label={`Go to snap ${index + 1}`}
          />
        ))}
      </div>

      {/* Current Snap Info */}
      <div className="fixed left-8 bottom-8 z-20 text-white">
        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-white/20 max-w-sm">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm font-medium opacity-70">
              {currentSnap + 1} / {snapCount}
            </span>
            <span className="text-lg font-bold">
              {snapTitles[currentSnap]}
            </span>
          </div>
          <p className="text-sm opacity-80 leading-relaxed">
            {snapDescriptions[currentSnap]}
          </p>
        </div>
      </div>

      {/* Instructions */}
      <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-20 text-white text-center">
        <div className="bg-black/30 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
          <p className="text-sm opacity-80">
            Scroll, use arrow keys, or click the dots to navigate
          </p>
        </div>
      </div>
    </>
  );
}