import React from 'react';

export default function App() {
  const handleRedirect = () => {
    window.location.href = 'https://keyrif.me';
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <button
        onClick={handleRedirect}
        className="px-12 py-8 text-3xl md:text-5xl font-black text-white bg-blue-600 hover:bg-blue-700 rounded-3xl shadow-2xl transition-all hover:scale-105 active:scale-95 border-b-8 border-blue-800"
      >
        new domain keyrif.me
      </button>
    </div>
  );
}