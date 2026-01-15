import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { api } from "../service/api";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch all tasks
  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err.response?.data?.message);

      // 🔐 Auto logout on unauthorized
      if (err.response?.status === 401) {
        clearTasks();
        localStorage.removeItem("token");
      }
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Initial load
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetchTasks();
    } else {
      setLoading(false);
    }
  }, []);

  // 🔹 Clear tasks (logout)
  const clearTasks = () => {
    setTasks([]);
  };

  // 🔹 Add task
  const addTask = async (taskData) => {
    if (!taskData.title?.trim()) return;

    try {
      const res = await api.post("/tasks", {
        title: taskData.title,
        description: taskData.description || "",
        category: taskData.category,
      });

      setTasks((prev) => [res.data, ...prev]);
    } catch (err) {
      console.error(err.response?.data?.message);
    }
  };

  // 🔹 Toggle completed
  const toggleTask = async (id) => {
    try {
      const res = await api.patch(`/tasks/${id}/completed`);
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? res.data : task))
      );
    } catch (err) {
      console.error(err.response?.data?.message);
    }
  };

  // 🔹 Update task
  const updateTask = async (id, updateData) => {
    try {
      const res = await api.put(`/tasks/${id}`, updateData);
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? res.data : task))
      );
    } catch (err) {
      console.error(err.response?.data?.message);
    }
  };

  // 🔹 Delete task
  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      console.error(err.response?.data?.message);
    }
  };

  // 🔹 Derived values (performance optimized)
  const taskCount = tasks.length;

  const completedCount = useMemo(
    () => tasks.filter((t) => t.completed).length,
    [tasks]
  );

  const pendingCount = taskCount - completedCount;

  const progress =
    taskCount === 0 ? 0 : Math.round((completedCount / taskCount) * 100);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        addTask,
        toggleTask,
        updateTask,
        deleteTask,
        clearTasks,
        taskCount,
        completedCount,
        pendingCount,
        progress,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => useContext(TaskContext);
