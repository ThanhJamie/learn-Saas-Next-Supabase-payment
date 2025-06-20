"use client";

import { useEffect, useState } from "react";

// Example component demonstrating how to handle client-side only logic
// to prevent hydration errors
const HydrationSafe = () => {
  const [isClient, setIsClient] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    setIsClient(true);
    setCurrentTime(new Date().toLocaleString());
  }, []);

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-semibold mb-2">Hydration Safe Component</h3>
      
      {/* Static content that's the same on server and client */}
      <p>This content is safe and renders consistently.</p>
      
      {/* Dynamic content that only renders on client */}
      {isClient && (
        <div className="mt-2 text-sm text-gray-600">
          <p>Client-side only content:</p>
          <p>Current time: {currentTime}</p>
          <p>Window available: {typeof window !== "undefined" ? "Yes" : "No"}</p>
        </div>
      )}
      
      {/* Loading state while hydrating */}
      {!isClient && (
        <div className="mt-2 text-sm text-gray-500">
          Loading client-side content...
        </div>
      )}
    </div>
  );
};

export default HydrationSafe;
