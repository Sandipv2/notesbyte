import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans">
      <nav className="w-full border-b border-gray-800 p-4 flex justify-between items-center">
        <div className="text-[#00CCFF] font-bold text-2xl tracking-wide">
          Notesbyte
        </div>
        <button
          onClick={() => navigate('/login')}
          className="px-6 py-1.5 rounded-full border-2 border-[#00CCFF] text-white hover:bg-[#00CCFF] hover:text-black transition-colors font-semibold text-sm"
        >
          Login
        </button>
      </nav>
      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-6xl md:text-7xl font-bold text-[#00CCFF] mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          Page not found
        </h2>
        <p className="text-gray-400 max-w-lg mb-10 text-lg">
          A personal space to save your thoughts, code snippets, and images.
          But this specific note or page seems to have been lost in the void.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-8 py-3 rounded-full border-2 border-gray-600 text-white hover:border-[#00CCFF] hover:text-[#00CCFF] transition-all font-semibold"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>

          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center px-8 py-3 rounded-full bg-[#00CCFF] text-black font-bold hover:bg-opacity-90 transition-all shadow-[0_0_15px_rgba(0,204,255,0.4)]"
          >
            Get Started
          </button>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
