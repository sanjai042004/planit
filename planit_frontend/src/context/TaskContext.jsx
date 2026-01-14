import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../service/api";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchTasks();
  }, []);

  const clearTasks = () => {
    setTasks([]);
  };

  const addTask = async (taskData) => {
    if (!taskData.title.trim()) return;

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

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      console.error(err.response?.data?.message);
    }
  };
  const taskCount = tasks.length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = tasks.length - completedCount;
  const progress =
    tasks.length === 0 ? 0 : Math.round((completedCount / tasks.length) * 100);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        addTask,
        toggleTask,
        deleteTask,
        updateTask,
        taskCount,
        completedCount,
        pendingCount,
        progress,
        clearTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => useContext(TaskContext);
