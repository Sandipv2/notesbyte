import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaLock, FaGlobe, FaRegFileAlt } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";

const sampleNotes = [
  {
    id: "sample-1",
    title: "A day in a software engineer life",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut accumsan risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut accumsan risus.",
    isPrivate: true,
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "sample-2",
    title: "A day in a software engineer life",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut accumsan risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut accumsan risus.",
    isPrivate: false,
    image: null,
  },
];

function Notes() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const visibleNotes = useMemo(() => sampleNotes.filter((note) => {
    const matchesFilter = filter === "All" ||
      (filter === "Public" ? !note.isPrivate : note.isPrivate);
    const query = search.trim().toLowerCase();
    return matchesFilter && (!query || `${note.title} ${note.description}`.toLowerCase().includes(query));
  }), [filter, search]);

  return (
    <div className="min-h-screen bg-black px-4 pb-12 pt-24 sm:px-8 lg:px-16">
      <div className="flex flex-col gap-6 pt-8">
        <div className="flex flex-wrap gap-3 sm:gap-5">
          {["All", "Public", "Private"].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`min-w-24 rounded-full border-2 border-cyan-400 px-5 py-1.5 font-bold transition sm:min-w-28 sm:px-6 ${filter === item ? "bg-cyan-400 text-black" : "text-white hover:bg-cyan-400 cursor-pointer hover:text-black"}`}
            >
              {item}
            </button>
          ))}
          <Link
            to="/notes/new"
            className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-2.5 text-lg font-bold text-black transition sm:gap-3 sm:px-8 sm:py-3"
          >
            <FiPlus size={24} />
            <FaRegFileAlt size={22} />
            Note
          </Link>
        </div>

        <div className="max-w-150">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search here"
            className="w-full rounded-lg border border-slate-600 bg-black px-3 py-2 text-lg text-white outline-none placeholder:text-slate-500 focus:border-cyan-400 sm:text-xl"
          />
        </div>

      </div>
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visibleNotes.map((note) => (
          <button
            key={note.id}
            type="button"
            onClick={() => navigate(`/notes/${note.id}`)}
            className="group relative flex min-h-75 flex-col overflow-hidden rounded-lg border border-slate-500 text-left transition hover:border-cyan-400 cursor-pointer"
          >
            {note.image && (
              <img src={note.image} alt="Woodland path" className="h-40 w-full object-cover" />
            )}
            <span className="absolute right-4 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400 text-black">
              {note.isPrivate ? <FaLock size={17} /> : <FaGlobe size={19} />}
            </span>
            <span className="flex flex-1 flex-col p-3">
              <span className="text-xl font-bold leading-tight sm:text-2xl">{note.title}</span>
              <span className="mt-2 line-clamp-4 text-base leading-snug text-slate-100">{note.description}</span>
            </span>
          </button>
        ))}

        {visibleNotes.length === 0 && (
          <p className="col-span-full py-10 text-center text-slate-400">No notes match your search.</p>
        )}
      </div>
    </div>
  );
}

export default Notes;
