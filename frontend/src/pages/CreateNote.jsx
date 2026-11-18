
import { useRef, useState } from "react";

import { IoMdCloseCircle } from "react-icons/io";

function CreateNote() {
    const imageInputRef = useRef(null);

    const [visibility, setVisibility] = useState("private");
    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");


    function handleSubmit(event) {
        event.preventDefault();
        alert('submit')
    }

    function removeImage() {
        setImage("")
        imageInputRef.current.value = ""
    }

    return (
        <div className="flex min-h-screen items-center justify-center px-4 py-8">
            <form onSubmit={handleSubmit} className="w-full md:w-1/2 flex flex-col gap-5">
                <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Title"
                    className="border border-slate-500 p-3 rounded-lg outline-none"
                />

                <textarea
                    name="description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    rows={15}
                    placeholder="Description"
                    className="border border-slate-500 outline-none rounded-lg p-3"
                ></textarea>

                <div className="flex items-center gap-3">
                    <label
                        htmlFor="image"
                        className="cursor-pointer rounded-lg border border-slate-500 px-4 py-2 text-white"
                    >
                        Choose Image
                    </label>

                    <input
                        type="file"
                        id="image"
                        name="image"
                        className="hidden"
                        accept="image/*"
                        ref={imageInputRef}
                        onChange={e => setImage(e.target.files[0] || "")}
                    />

                    {image && <div className="flex gap-3 items-center">
                        {image.name}

                        <div onClick={removeImage} className="cursor-pointer">
                            <IoMdCloseCircle size={20} />
                        </div>
                    </div>}
                </div>

                <div>
                    <button
                        type="button"
                        onClick={() => setVisibility("private")}
                        className={`cursor-pointer rounded-full px-4 py-2 font-bold border-2 border-cyan-400 ${visibility == 'private' ? 'bg-cyan-400 text-black' : ''}`}
                    >
                        Private
                    </button>

                    <button
                        type="button"
                        onClick={() => setVisibility("public")}
                        className={`cursor-pointer ml-3 rounded-full px-4 py-2 font-bold border-2 border-cyan-400 ${visibility == 'public' ? 'bg-cyan-400 text-black' : ''}`}
                    >
                        Public
                    </button>
                </div>

                <button type="submit" className="bg-cyan-400 font-bold text-black w-fit px-5 py-2 cursor-pointer mt-4 text-lg rounded-full">
                    Create Note
                </button>
            </form>
        </div>
    );
}

export default CreateNote;
