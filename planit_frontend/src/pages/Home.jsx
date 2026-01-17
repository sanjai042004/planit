import { useEffect, useState } from "react";
import { SideBar } from "../components/layout/SideBar";
import { Header } from "../components/layout/Header";
import { TaskForm } from "../components/tasks/TaskForm";
import { TaskList } from "../components/tasks/TaskList";
import { EmptyState } from "../components/ui/EmptyState";
import { Loader } from "../components/ui/Loader";
import { useTask } from "../context/TaskContext";
import { useCategory } from "../context/CategoriesContext";

export const Home = () => {
  const { tasks, addTask, loading } = useTask();
  const { selectedCategory } = useCategory();

  const [showForm, setShowForm] = useState(false);
  const [view, setView] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setView("all");
  }, [selectedCategory]);

  const handleAdd = async (data) => {
    await addTask({
      ...data,
      category: selectedCategory, 
    });
    setShowForm(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      {/* Loader */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70">
          <Loader />
        </div>
      )}

      <SideBar
        setView={setView}
        view={view}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="flex-1 p-4 lg:p-6">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        {!showForm && !loading && (
          <button
            onClick={() => setShowForm(true)}
            className="w-full border-2 border-dashed rounded-xl p-4 mt-4
              text-left text-teal-600 hover:bg-teal-50 transition cursor-pointer"
          >
            + Add a New Task...
          </button>
        )}

        {showForm && (
          <div className="mt-4">
            <TaskForm
             category={selectedCategory} 
              onAdd={handleAdd}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        <div className="mt-6">
          {!loading && tasks.length === 0 && <EmptyState />}
          {!loading && tasks.length > 0 && <TaskList view={view} />}
        </div>
      </main>
    </div>
  );
};
