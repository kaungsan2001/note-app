const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>

        <p className="text-white text-lg font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
