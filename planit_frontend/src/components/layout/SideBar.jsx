import { Link, useNavigate } from "react-router-dom";
import { useTask } from "../../context/TaskContext";
import { ProgressCard } from "./ProgressCard";
import { Categories } from "./Categories";

const navItemClass =
  "flex items-center justify-between rounded-md px-4 py-1 cursor-pointer transition";

export const SideBar = ({ setView, view, isOpen, onClose = () => {} }) => {
  const { taskCount, pendingCount, completedCount, clearTasks } = useTask();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    clearTasks();
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  const getActiveClass = (v) =>
    view === v
      ? "bg-gray-100 text-gray-900 font-semibold"
      : "hover:bg-gray-50 text-gray-700";

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed lg:static top-0 left-0
          w-60 md:w-72 min-h-screen
          bg-white border-r border-gray-200
          px-4 py-5
          shadow-md flex flex-col
          z-50 overflow-y-auto
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <div className="lg:hidden flex justify-end">
          <button
            onClick={onClose}
            className="text-xl text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="space-y-9">
          <Link to="/home" onClick={onClose}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-500 rounded-2xl flex items-center justify-center text-white font-bold">
                ✓
              </div>
              <div>
                <h1 className="text-lg font-semibold">PlanIt</h1>
                <p className="text-xs text-gray-400">Stay organized</p>
              </div>
            </div>
          </Link>

          <ProgressCard />

          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              Tasks
            </h3>

            <div
              onClick={() => {
                setView("all");
                onClose();
              }}
              className={`${navItemClass} ${getActiveClass("all")}`}
            >
              <p className="text-sm font-medium">All Tasks</p>
              <span className="text-xs font-mono">{taskCount}</span>
            </div>

            <div
              onClick={() => {
                setView("pending");
                onClose();
              }}
              className={`${navItemClass} ${getActiveClass("pending")}`}
            >
              <p className="text-sm font-medium">Pending</p>
              <span className="text-xs font-mono">{pendingCount}</span>
            </div>

            <div
              onClick={() => {
                setView("completed");
                onClose();
              }}
              className={`${navItemClass} ${getActiveClass("completed")}`}
            >
              <p className="text-sm font-medium">Completed</p>
              <span className="text-xs font-mono">{completedCount}</span>
            </div>
          </div>

          <Categories onClose={onClose} />
        </div>

        {user && (
          <div
            onClick={handleLogout}
            className="
              flex items-center gap-3 mt-auto pt-4
              border-t border-gray-200 cursor-pointer
              hover:bg-gray-50 rounded-xl p-2 transition
            "
          >
            <img
              src={user.photo || "/avatar.png"}
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
