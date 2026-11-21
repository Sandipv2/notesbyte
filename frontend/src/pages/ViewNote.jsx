import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEdit, FaShareAlt } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import toast from "react-hot-toast";

import { useNoteStore } from "../store/noteStore";
import { useAuthStore } from "../store/authStore";

function ViewNote() {
  const { noteId } = useParams();
  const navigate = useNavigate();

  const { isLoading, getNote, deleteNote, updateNote } = useNoteStore();

  const [note, setNote] = useState(null);
  const [error, setError] = useState("");
  const [visibility, setVisibility] = useState("public");

  // Simple edit mode state
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [description, setDescription] = useState("");

  useEffect(() => {
    getNote(noteId)
      .then((data) => {
        setNote(data);
        setTitle(data.title || "");
        setDescription(data.description || "");
        setVisibility(data.isPrivate ? "private" : "public");
        setIsOwner(data.isOwner);
      })
      .catch((e) => {
        setError(e?.response?.data?.message || "Failed to load note");
      });
  }, [noteId, getNote]);

  // Copy note link
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Note link copied to clipboard!");
  };

  // Toggle Visibility
  const handleVisibility = async (newVisibility) => {
    if (visibility === newVisibility) return;
    setVisibility(newVisibility);
    try {
      await updateNote(noteId, {
        title: note.title,
        description: note.description,
        isPrivate: newVisibility === "private",
      });
      setNote((prev) => ({
        ...prev,
        isPrivate: newVisibility === "private",
      }));
      toast.success(`Note marked as ${newVisibility}`);
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to update visibility");
    }
  };

  // Delete note
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await deleteNote(noteId);
      toast.success("Note deleted successfully");
      navigate("/notes");
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to delete note");
    }
  };

  // Save edits
  const handleSave = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    try {
      await updateNote(noteId, {
        title: title.trim(),
        description: description.trim(),
        isPrivate: visibility === "private",
      });
      setNote((prev) => ({
        ...prev,
        title: title.trim(),
        description: description.trim(),
        isPrivate: visibility === "private",
      }));
      setIsEditing(false);
      toast.success("Note updated successfully!");
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to update note");
    }
  };

  // Cancel edits
  const handleCancel = () => {
    setTitle(note?.title || "");
    setDescription(note?.description || "");
    setIsEditing(false);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-black pt-32 flex flex-col items-center justify-center px-4">
        <p className="px-8 py-3 font-bold text-xl border border-red-500 rounded-lg text-red-500 bg-red-950/20 mb-5">
          {error}
        </p>
        <Link
          to="/notes"
          className="flex items-center gap-2 font-bold text-lg text-cyan-400 hover:underline"
        >
          <FaArrowLeft /> Back to Notes
        </Link>
      </div>
    );
  }

  if (isLoading && !note) {
    return (
      <div className="min-h-screen bg-black pt-32 text-center text-2xl font-bold text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 sm:pt-28 pb-16 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto">
        <Link
          to="/notes"
          className="inline-flex items-center gap-2 font-bold text-xl text-white hover:text-cyan-400 mb-8 cursor-pointer transition"
        >
          <FaArrowLeft /> Notes
        </Link>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Left Column */}
          <div className="flex-1 md:w-2/3">
            {note?.imageUrl && (
              <img
                src={note.imageUrl}
                alt={note.title}
                className="w-full max-h-105 object-cover rounded-md border border-slate-700 mb-6"
              />
            )}

            {isEditing ? (
              <form onSubmit={handleSave} className="flex flex-col gap-5">
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  className="border border-slate-700 p-3 rounded-lg outline-none bg-black text-white text-xl font-bold focus:border-cyan-400"
                />

                <textarea
                  rows={14}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                  className="border border-slate-700 outline-none rounded-lg p-3 bg-black text-white text-lg focus:border-cyan-400 leading-relaxed"
                />

                <div className="flex items-center gap-4 mt-2">
                  <button
                    type="submit"
                    className="bg-cyan-400 font-bold text-black px-6 py-2 rounded-full cursor-pointer hover:bg-cyan-300 transition text-lg"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="border-2 border-cyan-400 font-bold text-white px-6 py-2 rounded-full cursor-pointer hover:bg-cyan-400 hover:text-black transition text-lg"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
                    {note?.title}
                  </h1>
                  <span
                    className={`text-xs uppercase font-bold px-3 py-1 rounded-full border ${note?.isPrivate
                      ? "border-amber-400 text-amber-400"
                      : "border-cyan-400 text-cyan-400"
                      }`}
                  >
                    {note?.isPrivate ? "Private" : "Public"}
                  </span>
                </div>
                <p className="text-slate-300 mt-2">{new Date(note?.createdAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric"
                })}</p>

                <hr className="border-slate-700 mt-3" />
                <p className="text-lg mt-3 whitespace-pre-wrap wrap-anywhere leading-relaxed">
                  {note?.description || "No description provided."}
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Actions */}
          <div className="md:w-1/3 flex flex-col gap-6">
            {isOwner && (
              <>
                <div
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-3 cursor-pointer text-white hover:text-cyan-400 transition"
                >
                  <FaEdit size={22} />
                  <p className="font-bold text-2xl">
                    {isEditing ? "Cancel Edit" : "Edit"}
                  </p>
                </div>

                <div
                  onClick={handleDelete}
                  className="flex items-center gap-3 cursor-pointer text-red-500 hover:text-red-400 transition"
                >
                  <RiDeleteBin6Line size={22} />
                  <p className="font-bold text-2xl">Delete</p>
                </div>
              </>
            )}

            <div
              onClick={handleShare}
              className="flex items-center justify-center cursor-pointer gap-3 bg-cyan-400 hover:bg-cyan-300 transition p-2.5 rounded-full text-black font-bold text-xl w-full sm:w-3/4 md:w-full"
            >
              <FaShareAlt size={22} />
              <p>Share</p>
            </div>

            {isOwner && (
              <div className="pt-2">
                <p className="text-sm font-semibold text-slate-400 mb-2">
                  Visibility
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => handleVisibility("private")}
                    className={`cursor-pointer rounded-full px-5 py-2 font-bold border-2 border-cyan-400 transition ${visibility === "private"
                      ? "bg-cyan-400 text-black"
                      : "text-white hover:bg-cyan-400 hover:text-black"
                      }`}
                  >
                    Private
                  </button>

                  <button
                    type="button"
                    onClick={() => handleVisibility("public")}
                    className={`cursor-pointer rounded-full px-5 py-2 font-bold border-2 border-cyan-400 transition ${visibility === "public"
                      ? "bg-cyan-400 text-black"
                      : "text-white hover:bg-cyan-400 hover:text-black"
                      }`}
                  >
                    Public
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewNote;
