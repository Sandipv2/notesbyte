import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

import { useAuthStore } from "../store/authStore";

function Settings() {
  const navigate = useNavigate();
  const { user, deleteAccount, isAccountDeleting } = useAuthStore();

  // Formatting the dates
  const createdDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "N/A";

  const lastLoginDate = (user?.lastLogin || user?.lastlogin)
    ? new Date(user.lastLogin || user.lastlogin).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "N/A";

  // Account deletion
  const handleDeleteAccount = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone and all your notes will be permanently deleted."
    );

    if (!isConfirmed) return;

    try {
      await deleteAccount();
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-black pt-24 sm:pt-28 pb-16 px-4 sm:px-8 text-white">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/notes"
          className="inline-flex items-center gap-2 font-bold text-xl text-white hover:text-cyan-400 mb-8 cursor-pointer transition"
        >
          <FaArrowLeft /> Notes
        </Link>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Settings</h1>

        <div className="border border-slate-700 rounded-xl p-6 sm:p-8 bg-zinc-950/40 my-8">
          <div className="flex items-center gap-4 pb-6 border-b border-slate-800">
            <div className="w-16 h-16 rounded-full bg-cyan-400 text-black font-extrabold text-2xl flex items-center justify-center shrink-0">
              {user?.name ? user.name[0].toUpperCase() : "U"}
            </div>
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-2xl font-bold text-white">{user?.name}</h2>
                <span
                  className={`text-xs uppercase font-bold px-3 py-1 rounded-full border ${
                    user?.isAccountVerified
                      ? "border-cyan-400 text-cyan-400"
                      : "border-amber-400 text-amber-400"
                  }`}
                >
                  {user?.isAccountVerified ? "Verified" : "Unverified"}
                </span>
              </div>
              <p className="text-slate-400 text-sm mt-1">{user?.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
            <div className="flex flex-col gap-1 border border-slate-800 bg-black p-4 rounded-lg">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Username
              </span>
              <span className="text-lg font-bold text-white truncate">
                {user?.name || "N/A"}
              </span>
            </div>

            <div className="flex flex-col gap-1 border border-slate-800 bg-black p-4 rounded-lg">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Email
              </span>
              <span className="text-lg font-bold text-white truncate">
                {user?.email || "N/A"}
              </span>
            </div>

            <div className="flex flex-col gap-1 border border-slate-800 bg-black p-4 rounded-lg">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Account Created
              </span>
              <span className="text-lg font-bold text-white">{createdDate}</span>
            </div>

            <div className="flex flex-col gap-1 border border-slate-800 bg-black p-4 rounded-lg">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Last Login
              </span>
              <span className="text-lg font-bold text-white">{lastLoginDate}</span>
            </div>
          </div>
        </div>

        <div className="border border-red-900/60 rounded-xl p-6 sm:p-8 bg-red-950/10">
          <h3 className="text-xl font-bold text-red-500">Danger Zone</h3>
          <p className="text-slate-300 text-sm mt-2 leading-relaxed">
            Deleting your account is permanent. All your notes, uploaded images, and profile
            data will be completely removed.
          </p>

          <button
            type="button"
            disabled={isAccountDeleting}
            onClick={handleDeleteAccount}
            className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-red-500 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white px-6 py-2.5 font-bold transition cursor-pointer disabled:opacity-50"
          >
            <RiDeleteBin6Line size={20} />
            <span>{isAccountDeleting ? "Deleting..." : "Delete Account"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
