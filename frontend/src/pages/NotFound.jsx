import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-5 pb-16 pt-24 text-center">
      <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-cyan-400">
        Notesbyte
      </p>
      <h1 className="text-7xl font-extrabold leading-none text-cyan-400 sm:text-9xl">
        404
      </h1>
      <h2 className="mt-6 text-3xl font-bold sm:text-4xl">Page not found</h2>
      <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-300 sm:text-xl">
        This page does not exist. Don't worry, you're still on the right server—just the wrong branch.
      </p>

      <div className="mt-9 flex w-full max-w-sm flex-col gap-3 sm:flex-row sm:max-w-none sm:justify-center">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-slate-600 px-7 py-3 font-bold transition-colors hover:border-cyan-400 hover:text-cyan-400"
        >
          <FaArrowLeft aria-hidden="true" />
          Go back
        </button>
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-7 py-3 font-extrabold text-black shadow-lg transition duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(57,222,247,0.55)]"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}

export default NotFound;
