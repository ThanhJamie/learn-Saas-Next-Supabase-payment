// components/HydrationSafe.tsx

"use client";

import { useEffect, useState } from "react";

// Example component demonstrating how to handle client-side only logic
// to prevent hydration errors
const HydrationSafe = () => {
  const [isClient, setIsClient] = useState(false);
  const [currentTime, setCurrentTime] = useState<string | null>(null);
  const [randomValue, setRandomValue] = useState<number | null>(null);
  const [windowAvailable, setWindowAvailable] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
    setCurrentTime(new Date().toLocaleString()); // Locale formatting only on client
    setRandomValue(Math.random()); // Random value only on client
    setWindowAvailable(typeof window !== "undefined" ? "Yes" : "No");
  }, []);

  // Only render dynamic content after client-side hydration
  if (!isClient) {
    return (
      <div className="p-4 border rounded-lg">
        <h3 className="font-semibold mb-2">Hydration Safe Component</h3>
        <p>This content is safe and renders consistently.</p>
        <div className="mt-2 text-sm text-gray-500">
          Loading client-side content...
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-semibold mb-2">Hydration Safe Component</h3>
      <p>This content is safe and renders consistently.</p>
      <div className="mt-2 text-sm text-gray-600">
        <p>Client-side only content:</p>
        <p>Current time: {currentTime}</p>
        <p>Random value: {randomValue}</p>
        <p>Window available: {windowAvailable}</p>
      </div>
    </div>
  );
};

export default HydrationSafe;