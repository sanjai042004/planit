import { Link, useNavigate } from "react-router-dom";
import { useTask } from "../../context/TaskContext";
import { ProgressCard } from "./ProgressCard";

export const SideBar = ({ setView, isOpen, onClose }) => {
  const { taskCount, pendingCount, completedCount, clearTasks } = useTask();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    clearTasks();
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0
        w-60 md:w-72 min-h-screen
        bg-white border-r border-gray-200
        px-4 py-5 lg:py-5
        shadow-md flex flex-col justify-start
        z-50 overflow-y-auto
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
      >
        {/* Mobile Close */}
        <div className="lg:hidden flex justify-end">
          <button onClick={onClose} className="text-xl text-gray-500">
            ✕
          </button>
        </div>

        {/* Top Content */}
        <div className="space-y-9">
          {/* Logo */}
          <Link to="/" onClick={onClose}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-500 rounded-2xl flex items-center justify-center text-white font-bold">
                ✓
              </div>
              <div>
                <h1 className="text-lg font-semibold leading-none">PlanIt</h1>
                <p className="text-xs text-gray-400">Stay organized</p>
              </div>
            </div>
          </Link>

          <div className="mt-6">
            <ProgressCard />
          </div>
          {/* Tasks */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              Tasks
            </h3>

            {/* All Tasks */}
            <div
              onClick={() => {
                setView("all");
                onClose();
              }}
              className="flex items-center justify-between rounded-md px-4 py-1
              cursor-pointer hover:bg-gray-50 transition"
            >
              <p className="text-sm font-medium text-gray-600">All Tasks</p>
              <span className="text-xs font-mono text-gray-400">
                {taskCount}
              </span>
            </div>

            {/* Pending */}
            <div
              onClick={() => {
                setView("pending");
                onClose();
              }}
              className="flex items-center justify-between rounded-md px-4 py-1
              cursor-pointer hover:bg-gray-50 transition"
            >
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <span className="text-xs font-mono text-gray-400">
                {pendingCount}
              </span>
            </div>

            {/* Completed */}
            <div
              onClick={() => {
                setView("completed");
                onClose();
              }}
              className="flex items-center justify-between rounded-md px-4 py-1
              cursor-pointer hover:bg-gray-50 transition"
            >
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <span className="text-xs font-mono text-gray-400">
                {completedCount}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        {user && (
          <div
            onClick={handleLogout}
            className="flex items-center gap-3 mt-64 pt-4
            border-t border-gray-200 cursor-pointer
            hover:bg-gray-50 rounded-xl p-2 transition"
          >
            <img
              src={user.photo}
              alt="profile"
              className="w-9 h-9 rounded-full"
            />
            <div>
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-gray-400">Logout</p>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
