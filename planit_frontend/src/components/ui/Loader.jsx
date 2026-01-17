export const Loader = () => {
  return (
    <div className="fixed flex items-center justify-center z-50">
      <div className="rounded-xl flex flex-col items-center">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-sm text-gray-600">Loading tasks...</p>
      </div>
    </div>
  );
};

