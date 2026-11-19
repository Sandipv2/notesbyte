import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { useNoteStore } from "../store/noteStore"

function ViewNote() {
  const {noteId} = useParams();
  const { isLoading, getNote } = useNoteStore();

  const [error, setError] = useState('')
  const [note, setNote] = useState(null)

  useEffect(() => {
    getNote(noteId)
    .then(data => setNote(data))
    .catch(e => {
      setError(e.response.data.message);
    })
  }, [])

  return (
    <div className="min-h-screen flex justify-center items-center">
      {error && <p className="px-10 font-bold text-2xl border p-2 rounded-lg border-red-500 bg-red-300 text-red-700">{error}</p>}

      {isLoading && <h1 className="font-bold text-2xl">Loading...</h1>}



      <h1>{note?.title}</h1>
    </div>
  )
}

export default ViewNote