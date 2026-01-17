import React, { useEffect, useState } from "react";

export const Header = ({ onMenuClick }) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div className="flex items-center gap-3 mb-4">
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 border border-gray-300 rounded-md text-gray-400"
      >
        ☰
      </button>

      <h1 className="text-xl font-semibold">My Tasks</h1>
    </div>
  );
};
