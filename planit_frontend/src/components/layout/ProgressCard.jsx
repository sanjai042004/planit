import React from "react";
import { useTask } from "../../context/TaskContext";

export const ProgressCard = () => {
  const { progress } = useTask();

  return (
    <div className="bg-teal-50 rounded-2xl p-4">
      <p className="text-sm text-teal-700">Progress Today</p>
      <h2 className="text-3xl font-bold mt-2">{progress}%</h2>

      <div className="w-full h-2 bg-teal-100 rounded-full mt-3">
        <div
          className="h-2 bg-teal-500 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
