export const Loader = () => {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white px-6 py-5 rounded-xl shadow-lg flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-sm text-gray-600">Loading tasks...</p>
      </div>
    </div>
  );
};

