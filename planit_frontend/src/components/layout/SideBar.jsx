import { Link, useNavigate } from "react-router-dom";
import { useTask } from "../../context/TaskContext";
import { ProgressCard } from "./ProgressCard";

export const SideBar = ({ setView, isOpen, onClose }) => {
  const { pendingCount, completedCount, clearTasks } = useTask();
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
        className={`
          fixed lg:static
          top-0 left-0
          w-60 md:w-72 lg:w-72
          h-full
          bg-white border-r border-gray-200
          px-4 py-5
          flex flex-col justify-between
          z-50
          overflow-y-auto
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:transform-none
        `}
      >
        <div className="lg:hidden flex justify-end mb-3">
          <button
            onClick={onClose}
            className="text-xl font-bold text-gray-600"
          >
            ✕
          </button>
        </div>

        <div>
          {/* Logo */}
          <Link to="/" onClick={onClose}>
            <div className=" lg:flex items-center gap-3 cursor-pointer">
              <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center text-white font-bold">
                ✓
              </div>
              <div>
                <h1 className="text-lg font-semibold">PlanIt</h1>
                <p className="text-xs text-gray-400">
                  Stay organized, stay focused
                </p>
              </div>
            </div>
          </Link>

          {/* Progress */}
          <div className="mt-6 space-y-5">
            <ProgressCard />

            {/* Pending / Completed */}
            <div className="grid grid-cols-2 gap-4">
              <div
                onClick={() => {
                  setView("pending");
                  onClose();
                }}
                className="border border-gray-200 rounded-xl p-4 text-center shadow cursor-pointer hover:bg-gray-50"
              >
                <p className="text-sm text-gray-400">Pending</p>
                <h2 className="text-2xl font-bold">{pendingCount}</h2>
              </div>

              <div
                onClick={() => {
                  setView("completed");
                  onClose();
                }}
                className="border border-gray-200 rounded-xl p-4 text-center shadow cursor-pointer hover:bg-gray-50"
              >
                <p className="text-sm text-gray-400">Completed</p>
                <h2 className="text-2xl font-bold">{completedCount}</h2>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="mt-8 pb-24">
            <p className="text-xs text-gray-400 uppercase mb-3">
              Categories
            </p>
            <ul className="space-y-3 text-gray-700">
              <li
                onClick={() => {
                  setView("all");
                  onClose();
                }}
                className="font-medium text-teal-600 cursor-pointer"
              >
                All Tasks
              </li>
              <li className="cursor-pointer hover:text-teal-600">Food</li>
              <li className="cursor-pointer hover:text-teal-600">Money</li>
              <li className="cursor-pointer hover:text-teal-600">Health</li>
            </ul>
          </div>
        </div>

        {/* User / Logout */}
        {user && (
          <div
            onClick={handleLogout}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 cursor-pointer"
          >
            <img
              src={user.photo}
              alt="profile"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">
                {user.name}
              </p>
              <p className="text-xs text-gray-400">Logout</p>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
